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

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
public class JobService {

    private final JobRepository jobRepository;
    private final StorageService storageService;
    private final Validator validator;
    private final String baseUrl = "https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/";

    @Autowired
    public JobService(JobRepository jobRepository,
                      StorageService storageService,
                      Validator validator) {
        this.jobRepository = jobRepository;
        this.storageService = storageService;
        this.validator = validator;
    }

    // Basic CRUD Operations
    public List<Job> getAllJobs() {
        log.info("Fetching all jobs");
        return jobRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public List<Job> getAllActiveJobs() {
        log.info("Fetching all active jobs");
        return jobRepository.findActiveJobsWithValidDeadlines(LocalDateTime.now());
    }

    public Page<Job> getAllJobsPaginated(int page, int size, String sortBy, String sortDir) {
        log.info("Fetching jobs with pagination: page={}, size={}, sortBy={}, sortDir={}",
                page, size, sortBy, sortDir);

        Sort.Direction direction = sortDir.equalsIgnoreCase("desc") ?
                Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        return jobRepository.findAll(pageable);
    }

    public Job getJobById(String id) throws JobNotFoundException {
        log.info("Fetching job by id: {}", id);
        return jobRepository.findById(id)
                .orElseThrow(() -> new JobNotFoundException("Job not found with id: " + id));
    }

    public Job getJobBySlug(String slug) throws JobNotFoundException {
        log.info("Fetching job by slug: {}", slug);
        return jobRepository.findBySlug(slug)
                .orElseThrow(() -> new JobNotFoundException("Job not found with slug: " + slug));
    }

    public Job createJob(Job job, MultipartFile companyLogo) throws JobValidationException {
        log.info("Creating new job: {}", job.getTitle());

        // Validate job
        validateJob(job);

        // Handle company logo upload
        if (companyLogo != null && !companyLogo.isEmpty()) {
            try {
                StorageService.UploadResult result = storageService.uploadFile(companyLogo);
                job.setCompanyLogo(baseUrl + "my-data/" + result.getFileName());
                job.setCompanyLogoFileName(result.getFileName());
            } catch (Exception e) {
                log.error("Failed to upload company logo", e);
                throw new JobValidationException("Failed to upload company logo: " + e.getMessage());
            }
        }

        // Set metadata
        job.prePersist();

        Job savedJob = jobRepository.save(job);
        log.info("Successfully created job with id: {}", savedJob.getId());
        return savedJob;
    }

    public Job updateJob(String id, Job updatedJob, MultipartFile companyLogo) throws JobNotFoundException, JobValidationException {
        log.info("Updating job with id: {}", id);

        Job existingJob = getJobById(id);

        // Validate updated job
        validateJob(updatedJob);

        // Update fields
        updateJobFields(existingJob, updatedJob);

        // Handle company logo update
        if (companyLogo != null && !companyLogo.isEmpty()) {
            try {
                // Delete old logo if exists
                if (existingJob.getCompanyLogoFileName() != null) {
                    storageService.deleteFile(existingJob.getCompanyLogoFileName());
                }

                // Upload new logo
                StorageService.UploadResult result = storageService.uploadFile(companyLogo);
                existingJob.setCompanyLogo(baseUrl + "my-data/" + result.getFileName());
                existingJob.setCompanyLogoFileName(result.getFileName());
            } catch (Exception e) {
                log.error("Failed to upload company logo", e);
                throw new JobValidationException("Failed to upload company logo: " + e.getMessage());
            }
        }

        // Update metadata
        existingJob.setUpdatedAt(LocalDateTime.now());
        existingJob.generateSlug();

        Job savedJob = jobRepository.save(existingJob);
        log.info("Successfully updated job with id: {}", savedJob.getId());
        return savedJob;
    }

    public void deleteJob(String id) throws JobNotFoundException {
        log.info("Deleting job with id: {}", id);

        Job job = getJobById(id);

        // Delete company logo if exists
        if (job.getCompanyLogoFileName() != null) {
            try {
                storageService.deleteFile(job.getCompanyLogoFileName());
            } catch (Exception e) {
                log.warn("Failed to delete company logo file: {}", job.getCompanyLogoFileName(), e);
            }
        }

        jobRepository.deleteById(id);
        log.info("Successfully deleted job with id: {}", id);
    }

    // Search and Filter Operations
    public List<Job> searchJobs(String query) {
        log.info("Searching jobs with query: {}", query);

        if (query == null || query.trim().isEmpty()) {
            return getAllActiveJobs();
        }

        return jobRepository.searchActiveJobs(query.trim());
    }

    public Page<Job> searchJobsWithPagination(String query, int page, int size) {
        log.info("Searching jobs with pagination: query={}, page={}, size={}", query, page, size);

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        if (query == null || query.trim().isEmpty()) {
            return jobRepository.findAll(pageable);
        }

        return jobRepository.searchJobsWithPagination(query.trim(), LocalDateTime.now(), pageable);
    }

    public Page<Job> getJobsWithFilters(JobFilterCriteria criteria, int page, int size) {
        log.info("Fetching jobs with filters: {}", criteria);

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        return jobRepository.findJobsWithFilters(
                LocalDateTime.now(),
                criteria.getLocation(),
                criteria.getJobType(),
                criteria.getCompany(),
                pageable
        );
    }

    public List<Job> getJobsBySalaryRange(Double minSalary, Double maxSalary) {
        log.info("Fetching jobs by salary range: {} - {}", minSalary, maxSalary);
        return jobRepository.findJobsInSalaryRange(minSalary, maxSalary);
    }

    public List<Job> getJobsByLocation(String location) {
        log.info("Fetching jobs by location: {}", location);
        return jobRepository.findByLocationContainingIgnoreCase(location);
    }

    public List<Job> getJobsByCompany(String company) {
        log.info("Fetching jobs by company: {}", company);
        return jobRepository.findByCompanyIgnoreCase(company);
    }

    public List<Job> getJobsByType(String jobType) {
        log.info("Fetching jobs by type: {}", jobType);
        return jobRepository.findByJobTypeAndStatus(jobType, "active");
    }

    public List<Job> getRemoteJobs() {
        log.info("Fetching remote jobs");
        return jobRepository.findByRemoteAllowedTrueAndStatus("active");
    }

    public List<Job> getUrgentJobs() {
        log.info("Fetching urgent jobs");
        return jobRepository.findByIsUrgentTrueAndStatusOrderByCreatedAtDesc("active");
    }

    public List<Job> getFeaturedJobs() {
        log.info("Fetching featured jobs");
        return jobRepository.findByFeaturedTrueAndStatusOrderByCreatedAtDesc("active");
    }

    public List<Job> getJobsBySkills(List<String> skills) {
        log.info("Fetching jobs by skills: {}", skills);
        return jobRepository.findBySkillsIn(skills);
    }

    // Statistics and Analytics
    public JobStatistics getJobStatistics() {
        log.info("Generating job statistics");

        long totalJobs = jobRepository.count();
        long activeJobs = jobRepository.countActiveJobs();
        long recentJobs = jobRepository.countJobsCreatedAfter(LocalDateTime.now().minus(7, ChronoUnit.DAYS));

        List<JobRepository.JobTypeCount> jobTypeCounts = jobRepository.getJobCountByType();
        List<JobRepository.LocationCount> locationCounts = jobRepository.getTopJobLocations();
        List<JobRepository.CompanyCount> companyCounts = jobRepository.getTopHiringCompanies();

        return JobStatistics.builder()
                .totalJobs(totalJobs)
                .activeJobs(activeJobs)
                .recentJobs(recentJobs)
                .jobTypeCounts(jobTypeCounts)
                .locationCounts(locationCounts)
                .companyCounts(companyCounts)
                .build();
    }

    public List<Job> getRecentJobs(int limit) {
        log.info("Fetching recent jobs with limit: {}", limit);
        return jobRepository.findTop10ByStatusOrderByCreatedAtDesc("active")
                .stream()
                .limit(limit)
                .collect(Collectors.toList());
    }

    public List<Job> getPopularJobs(int limit) {
        log.info("Fetching popular jobs with limit: {}", limit);
        return jobRepository.findTop10ByStatusOrderByViewCountDesc("active")
                .stream()
                .limit(limit)
                .collect(Collectors.toList());
    }

    public List<Job> getJobsExpiringSoon(int days) {
        log.info("Fetching jobs expiring within {} days", days);
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime futureDate = now.plus(days, ChronoUnit.DAYS);
        return jobRepository.findJobsExpiringSoon(now, futureDate);
    }

    // Job Management Operations
    public Job incrementViewCount(String id) throws JobNotFoundException {
        log.info("Incrementing view count for job: {}", id);
        Job job = getJobById(id);
        job.setViewCount(job.getViewCount() + 1);
        return jobRepository.save(job);
    }

    public Job incrementApplicationCount(String id) throws JobNotFoundException {
        log.info("Incrementing application count for job: {}", id);
        Job job = getJobById(id);
        job.setApplicationCount(job.getApplicationCount() + 1);
        return jobRepository.save(job);
    }

    public Job updateJobStatus(String id, String status) throws JobNotFoundException, JobValidationException {
        log.info("Updating job status: {} to {}", id, status);

        if (!Arrays.asList("active", "closed", "draft").contains(status)) {
            throw new JobValidationException("Invalid status: " + status);
        }

        Job job = getJobById(id);
        job.setStatus(status);
        job.setUpdatedAt(LocalDateTime.now());

        if ("active".equals(status) && job.getPublishedAt() == null) {
            job.setPublishedAt(LocalDateTime.now());
        }

        return jobRepository.save(job);
    }

    public Job toggleFeaturedStatus(String id) throws JobNotFoundException {
        log.info("Toggling featured status for job: {}", id);
        Job job = getJobById(id);
        job.setFeatured(!job.getFeatured());
        job.setUpdatedAt(LocalDateTime.now());
        return jobRepository.save(job);
    }

    public Job toggleUrgentStatus(String id) throws JobNotFoundException {
        log.info("Toggling urgent status for job: {}", id);
        Job job = getJobById(id);
        job.setIsUrgent(!job.getIsUrgent());
        job.setUpdatedAt(LocalDateTime.now());
        return jobRepository.save(job);
    }

    // Cleanup Operations
    public int closeExpiredJobs() {
        log.info("Closing expired jobs");
        List<Job> expiredJobs = jobRepository.findByStatusAndApplicationDeadlineBefore("active", LocalDateTime.now());

        expiredJobs.forEach(job -> {
            job.setStatus("closed");
            job.setUpdatedAt(LocalDateTime.now());
        });

        jobRepository.saveAll(expiredJobs);
        log.info("Closed {} expired jobs", expiredJobs.size());
        return expiredJobs.size();
    }

    public int deleteOldDraftJobs(int daysOld) {
        log.info("Deleting draft jobs older than {} days", daysOld);
        LocalDateTime cutoffDate = LocalDateTime.now().minus(daysOld, ChronoUnit.DAYS);
        List<Job> oldDrafts = jobRepository.findOldDraftJobs(cutoffDate);

        // Delete associated files
        oldDrafts.forEach(job -> {
            if (job.getCompanyLogoFileName() != null) {
                try {
                    storageService.deleteFile(job.getCompanyLogoFileName());
                } catch (Exception e) {
                    log.warn("Failed to delete logo file for job: {}", job.getId(), e);
                }
            }
        });

        jobRepository.deleteAll(oldDrafts);
        log.info("Deleted {} old draft jobs", oldDrafts.size());
        return oldDrafts.size();
    }

    // Utility Methods
    private void validateJob(Job job) throws JobValidationException {
        Set<ConstraintViolation<Job>> violations = validator.validate(job);

        if (!violations.isEmpty()) {
            String errorMessage = violations.stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(", "));
            throw new JobValidationException("Job validation failed: " + errorMessage);
        }

        // Additional business logic validation
        if (!job.isSalaryRangeValid()) {
            throw new JobValidationException("Minimum salary cannot be greater than maximum salary");
        }

        if (job.getApplicationDeadline() != null && job.getApplicationDeadline().isBefore(LocalDateTime.now())) {
            throw new JobValidationException("Application deadline cannot be in the past");
        }

        if (job.getMaxApplications() != null && job.getMaxApplications() <= 0) {
            throw new JobValidationException("Maximum applications must be greater than 0");
        }
    }

    private void updateJobFields(Job existingJob, Job updatedJob) {
        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setCompany(updatedJob.getCompany());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setJobType(updatedJob.getJobType());
        existingJob.setSalaryMin(updatedJob.getSalaryMin());
        existingJob.setSalaryMax(updatedJob.getSalaryMax());
        existingJob.setCurrency(updatedJob.getCurrency());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setRequirements(updatedJob.getRequirements());
        existingJob.setStatus(updatedJob.getStatus());
        existingJob.setApplicationDeadline(updatedJob.getApplicationDeadline());
        existingJob.setContactEmail(updatedJob.getContactEmail());
        existingJob.setApplicationUrl(updatedJob.getApplicationUrl());
        existingJob.setSkills(updatedJob.getSkills());
        existingJob.setBenefits(updatedJob.getBenefits());
        existingJob.setExperienceLevel(updatedJob.getExperienceLevel());
        existingJob.setIndustry(updatedJob.getIndustry());
        existingJob.setRemoteAllowed(updatedJob.getRemoteAllowed());
        existingJob.setWorkingHours(updatedJob.getWorkingHours());
        existingJob.setSalaryPeriod(updatedJob.getSalaryPeriod());
        existingJob.setSalaryNegotiable(updatedJob.getSalaryNegotiable());
        existingJob.setMaxApplications(updatedJob.getMaxApplications());
        existingJob.setKeywords(updatedJob.getKeywords());
    }

    // Custom Exceptions
    public static class JobNotFoundException extends Exception {
        public JobNotFoundException(String message) {
            super(message);
        }
    }

    public static class JobValidationException extends Exception {
        public JobValidationException(String message) {
            super(message);
        }
    }

    // DTOs and Helper Classes
    public static class JobFilterCriteria {
        private String location;
        private String jobType;
        private String company;
        private String experienceLevel;
        private String industry;
        private Boolean remoteAllowed;
        private Double minSalary;
        private Double maxSalary;
        private String currency;
        private List<String> skills;

        // Constructors
        public JobFilterCriteria() {}

        // Getters and Setters
        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }

        public String getJobType() { return jobType; }
        public void setJobType(String jobType) { this.jobType = jobType; }

        public String getCompany() { return company; }
        public void setCompany(String company) { this.company = company; }

        public String getExperienceLevel() { return experienceLevel; }
        public void setExperienceLevel(String experienceLevel) { this.experienceLevel = experienceLevel; }

        public String getIndustry() { return industry; }
        public void setIndustry(String industry) { this.industry = industry; }

        public Boolean getRemoteAllowed() { return remoteAllowed; }
        public void setRemoteAllowed(Boolean remoteAllowed) { this.remoteAllowed = remoteAllowed; }

        public Double getMinSalary() { return minSalary; }
        public void setMinSalary(Double minSalary) { this.minSalary = minSalary; }

        public Double getMaxSalary() { return maxSalary; }
        public void setMaxSalary(Double maxSalary) { this.maxSalary = maxSalary; }

        public String getCurrency() { return currency; }
        public void setCurrency(String currency) { this.currency = currency; }

        public List<String> getSkills() { return skills; }
        public void setSkills(List<String> skills) { this.skills = skills; }

        @Override
        public String toString() {
            return "JobFilterCriteria{" +
                    "location='" + location + '\'' +
                    ", jobType='" + jobType + '\'' +
                    ", company='" + company + '\'' +
                    ", experienceLevel='" + experienceLevel + '\'' +
                    ", industry='" + industry + '\'' +
                    ", remoteAllowed=" + remoteAllowed +
                    ", minSalary=" + minSalary +
                    ", maxSalary=" + maxSalary +
                    ", currency='" + currency + '\'' +
                    ", skills=" + skills +
                    '}';
        }
    }

    @lombok.Builder
    @lombok.Data
    public static class JobStatistics {
        private long totalJobs;
        private long activeJobs;
        private long recentJobs;
        private List<JobRepository.JobTypeCount> jobTypeCounts;
        private List<JobRepository.LocationCount> locationCounts;
        private List<JobRepository.CompanyCount> companyCounts;
    }
}