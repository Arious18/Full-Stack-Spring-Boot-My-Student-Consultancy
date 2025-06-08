package tmtalyp.backend.jobs;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import tmtalyp.backend.universities.StorageService;
import tmtalyp.backend.Auth.user.User;
import tmtalyp.backend.Auth.user.UserService;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
public class JobApplicationService {

    private final JobApplicationRepository applicationRepository;
    private final JobService jobService;
    private final UserService userService;
    private final StorageService storageService;
    private final Validator validator;
    private final String baseUrl = "https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/";

    @Autowired
    public JobApplicationService(JobApplicationRepository applicationRepository,
                                 JobService jobService,
                                 UserService userService,
                                 StorageService storageService,
                                 Validator validator) {
        this.applicationRepository = applicationRepository;
        this.jobService = jobService;
        this.userService = userService;
        this.storageService = storageService;
        this.validator = validator;
    }

    // Application Submission
    public JobApplication submitApplication(String jobId, JobApplication application,
                                            MultipartFile resume, String userId,
                                            HttpServletRequest request) throws Exception {
        log.info("Submitting application for job: {} by user: {}", jobId, userId);

        // Get job details
        Job job = jobService.getJobById(jobId);

        // Check if application already exists
        if (userId != null && applicationRepository.existsByJobIdAndUserId(jobId, userId)) {
            throw new ApplicationAlreadyExistsException("You have already applied for this position");
        }

        if (applicationRepository.existsByJobIdAndEmail(jobId, application.getEmail())) {
            throw new ApplicationAlreadyExistsException("An application with this email already exists for this position");
        }

        // Populate job information
        application.setJobId(jobId);
        application.setJobTitle(job.getTitle());
        application.setCompanyName(job.getCompany());
        application.setUserId(userId);

        // Set metadata from request
        if (request != null) {
            application.setIpAddress(getClientIpAddress(request));
            application.setUserAgent(request.getHeader("User-Agent"));
        }

        // Handle resume upload
        if (resume != null && !resume.isEmpty()) {
            try {
                StorageService.UploadResult result = storageService.uploadFile(resume);
                application.setResumeFileName(result.getFileName());
                application.setResumeUrl(baseUrl + "my-data/" + result.getFileName());
            } catch (Exception e) {
                log.error("Failed to upload resume", e);
                throw new ApplicationValidationException("Failed to upload resume: " + e.getMessage());
            }
        }

        // Validate application
        validateApplication(application);

        // Set timestamps
        application.prePersist();

        // Save application
        JobApplication savedApplication = applicationRepository.save(application);

        // Increment job application count
        try {
            jobService.incrementApplicationCount(jobId);
        } catch (Exception e) {
            log.warn("Failed to increment application count for job: {}", jobId, e);
        }

        log.info("Successfully submitted application with id: {}", savedApplication.getId());
        return savedApplication;
    }

    // Quick Apply for logged-in users
    public JobApplication quickApply(String jobId, String userId, String coverLetter,
                                     MultipartFile resume, HttpServletRequest request) throws Exception {
        log.info("Quick apply for job: {} by user: {}", jobId, userId);

        // Get user details
        User user = userService.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        // Create application from user data
        JobApplication application = createApplicationFromUser(user);
        application.setCoverLetter(coverLetter);

        return submitApplication(jobId, application, resume, userId, request);
    }

    // Get user application data for pre-filling
    public ApplicationUserData getUserApplicationData(String userId) throws UserNotFoundException {
        log.info("Fetching user application data for user: {}", userId);

        User user = userService.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        return ApplicationUserData.builder()
                .fullName(user.getName() + (user.getSurname() != null ? " " + user.getSurname() : ""))
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

    // CRUD Operations
    public List<JobApplication> getAllApplications() {
        log.info("Fetching all applications");
        return applicationRepository.findAll(Sort.by(Sort.Direction.DESC, "appliedAt"));
    }

    public Page<JobApplication> getAllApplicationsPaginated(int page, int size, String sortBy, String sortDir) {
        log.info("Fetching applications with pagination: page={}, size={}, sortBy={}, sortDir={}",
                page, size, sortBy, sortDir);

        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ?
                Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        return applicationRepository.findAll(pageable);
    }

    public JobApplication getApplicationById(String id) throws ApplicationNotFoundException {
        log.info("Fetching application by id: {}", id);
        JobApplication application = applicationRepository.findById(id)
                .orElseThrow(() -> new ApplicationNotFoundException("Application not found with id: " + id));

        // Increment view count
        application.incrementViewCount();
        applicationRepository.save(application);

        return application;
    }

    public List<JobApplication> getApplicationsByJobId(String jobId) {
        log.info("Fetching applications for job: {}", jobId);
        return applicationRepository.findByJobId(jobId);
    }

    public Page<JobApplication> getApplicationsByJobIdPaginated(String jobId, int page, int size) {
        log.info("Fetching applications for job: {} with pagination", jobId);
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "appliedAt"));
        return applicationRepository.findByJobIdOrderByAppliedAtDesc(jobId, pageable);
    }

    public List<JobApplication> getUserApplications(String userId) {
        log.info("Fetching applications for user: {}", userId);
        return applicationRepository.findByUserId(userId);
    }

    public Page<JobApplication> getUserApplicationsPaginated(String userId, int page, int size) {
        log.info("Fetching user applications with pagination for user: {}", userId);
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "appliedAt"));
        return applicationRepository.findByUserIdOrderByAppliedAtDesc(userId, pageable);
    }

    // Application Management
    public JobApplication updateApplicationStatus(String id, String status, String updatedBy)
            throws ApplicationNotFoundException, ApplicationValidationException {
        log.info("Updating application status: {} to {}", id, status);

        if (!Arrays.asList("pending", "reviewed", "shortlisted", "interviewed", "offered", "rejected", "withdrawn")
                .contains(status)) {
            throw new ApplicationValidationException("Invalid status: " + status);
        }

        JobApplication application = getApplicationById(id);
        application.updateStatus(status, updatedBy);

        return applicationRepository.save(application);
    }

    public JobApplication addHRNotes(String id, String notes, String updatedBy)
            throws ApplicationNotFoundException {
        log.info("Adding HR notes to application: {}", id);

        JobApplication application = getApplicationById(id);
        application.setHrNotes(notes);
        application.setStatusUpdatedBy(updatedBy);
        application.setUpdatedAt(LocalDateTime.now());

        return applicationRepository.save(application);
    }

    public JobApplication scheduleInterview(String id, LocalDateTime interviewDate, String notes)
            throws ApplicationNotFoundException {
        log.info("Scheduling interview for application: {}", id);

        JobApplication application = getApplicationById(id);
        application.setInterviewDate(interviewDate);
        application.setInterviewSchedule(notes);
        application.updateStatus("interviewed", "system");

        return applicationRepository.save(application);
    }

    // Search and Filter
    public Page<JobApplication> searchApplications(String query, int page, int size) {
        log.info("Searching applications with query: {}", query);
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "appliedAt"));

        if (query == null || query.trim().isEmpty()) {
            return applicationRepository.findAll(pageable);
        }

        return applicationRepository.searchApplications(query.trim(), pageable);
    }

    public Page<JobApplication> getApplicationsWithFilters(ApplicationFilterCriteria criteria, int page, int size) {
        log.info("Fetching applications with filters: {}", criteria);
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "appliedAt"));

        return applicationRepository.findApplicationsWithFilters(
                criteria.getStatus(),
                criteria.getCompany(),
                criteria.getFromDate(),
                criteria.getToDate(),
                pageable
        );
    }

    // Statistics
    public ApplicationStatistics getApplicationStatistics() {
        log.info("Generating application statistics");

        long totalApplications = applicationRepository.count();
        long pendingApplications = applicationRepository.countPendingApplications();
        long recentApplications = applicationRepository.countApplicationsAfterDate(
                LocalDateTime.now().minus(7, ChronoUnit.DAYS));

        List<JobApplicationRepository.ApplicationStatusCount> statusCounts =
                applicationRepository.getApplicationCountByStatus();
        List<JobApplicationRepository.CompanyApplicationCount> companyCounts =
                applicationRepository.getTopCompaniesByApplications();

        return ApplicationStatistics.builder()
                .totalApplications(totalApplications)
                .pendingApplications(pendingApplications)
                .recentApplications(recentApplications)
                .statusCounts(statusCounts)
                .companyCounts(companyCounts)
                .build();
    }

    public List<JobApplication> getRecentApplications(int limit) {
        log.info("Fetching recent applications with limit: {}", limit);
        return applicationRepository.findTop10ByOrderByAppliedAtDesc()
                .stream()
                .limit(limit)
                .collect(Collectors.toList());
    }

    // Helper Methods
    private JobApplication createApplicationFromUser(User user) {
        JobApplication application = new JobApplication();
        application.setFullName(user.getName() + (user.getSurname() != null ? " " + user.getSurname() : ""));
        application.setEmail(user.getEmail());
        application.setPhoneNumber(user.getPhoneNumber());
        // Add more user fields as needed
        return application;
    }

    private void validateApplication(JobApplication application) throws ApplicationValidationException {
        Set<ConstraintViolation<JobApplication>> violations = validator.validate(application);

        if (!violations.isEmpty()) {
            String errorMessage = violations.stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(", "));
            throw new ApplicationValidationException("Application validation failed: " + errorMessage);
        }

        // Additional business logic validation
        if (application.getExpectedSalary() != null && application.getExpectedSalary() < 0) {
            throw new ApplicationValidationException("Expected salary cannot be negative");
        }

        if (application.getYearsOfExperience() != null && application.getYearsOfExperience() < 0) {
            throw new ApplicationValidationException("Years of experience cannot be negative");
        }
    }

    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedForHeader = request.getHeader("X-Forwarded-For");
        if (xForwardedForHeader == null) {
            return request.getRemoteAddr();
        } else {
            return xForwardedForHeader.split(",")[0];
        }
    }

    // Custom Exceptions
    public static class ApplicationNotFoundException extends Exception {
        public ApplicationNotFoundException(String message) {
            super(message);
        }
    }

    public static class ApplicationValidationException extends Exception {
        public ApplicationValidationException(String message) {
            super(message);
        }
    }

    public static class ApplicationAlreadyExistsException extends Exception {
        public ApplicationAlreadyExistsException(String message) {
            super(message);
        }
    }

    public static class UserNotFoundException extends Exception {
        public UserNotFoundException(String message) {
            super(message);
        }
    }

    // DTOs
    @lombok.Builder
    @lombok.Data
    public static class ApplicationUserData {
        private String fullName;
        private String email;
        private String phoneNumber;
        private String currentPosition;
        private String currentCompany;
        private Integer yearsOfExperience;
    }

    @lombok.Data
    public static class ApplicationFilterCriteria {
        private String status;
        private String company;
        private LocalDateTime fromDate;
        private LocalDateTime toDate;
        private Integer minExperience;
        private Integer maxExperience;
    }

    @lombok.Builder
    @lombok.Data
    public static class ApplicationStatistics {
        private long totalApplications;
        private long pendingApplications;
        private long recentApplications;
        private List<JobApplicationRepository.ApplicationStatusCount> statusCounts;
        private List<JobApplicationRepository.CompanyApplicationCount> companyCounts;
    }
}