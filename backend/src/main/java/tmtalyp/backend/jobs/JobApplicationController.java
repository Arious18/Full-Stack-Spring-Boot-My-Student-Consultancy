package tmtalyp.backend.jobs;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/job-applications")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "https://frontend.azatvepakulyyev.workers.dev", "https://tmtalyp.azatvepakulyyev.workers.dev"},
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@Tag(name = "Job Applications", description = "Job application management API")
public class JobApplicationController {

    private final JobApplicationService applicationService;

    @Autowired
    public JobApplicationController(JobApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    // ================================
    // APPLICATION SUBMISSION
    // ================================

    @PostMapping(value = "/apply/{jobId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Submit job application", description = "Submit a new job application with optional resume upload")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Application submitted successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid application data"),
            @ApiResponse(responseCode = "409", description = "Application already exists"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<Object> submitApplication(
            @PathVariable String jobId,
            @RequestParam("fullName") String fullName,
            @RequestParam("email") String email,
            @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
            @RequestParam(value = "currentPosition", required = false) String currentPosition,
            @RequestParam(value = "currentCompany", required = false) String currentCompany,
            @RequestParam(value = "yearsOfExperience", required = false) Integer yearsOfExperience,
            @RequestParam(value = "coverLetter", required = false) String coverLetter,
            @RequestParam(value = "expectedSalary", required = false) Double expectedSalary,
            @RequestParam(value = "expectedSalaryCurrency", defaultValue = "USD") String expectedSalaryCurrency,
            @RequestParam(value = "noticePeriod", required = false) String noticePeriod,
            @RequestParam(value = "willingToRelocate", defaultValue = "false") Boolean willingToRelocate,
            @RequestParam(value = "remoteWorkPreference", defaultValue = "false") Boolean remoteWorkPreference,
            @RequestParam(value = "portfolioUrl", required = false) String portfolioUrl,
            @RequestParam(value = "additionalNotes", required = false) String additionalNotes,
            @RequestParam(value = "resume", required = false) MultipartFile resume,
            HttpServletRequest request) {

        try {
            log.info("Submitting application for job: {} by {}", jobId, email);

            // Get current user if authenticated
            String userId = getCurrentUserId();

            // Build application object
            JobApplication application = buildApplicationFromParams(
                    fullName, email, phoneNumber, currentPosition, currentCompany,
                    yearsOfExperience, coverLetter, expectedSalary, expectedSalaryCurrency,
                    noticePeriod, willingToRelocate, remoteWorkPreference, portfolioUrl, additionalNotes
            );

            JobApplication savedApplication = applicationService.submitApplication(
                    jobId, application, resume, userId, request);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedApplication);

        } catch (JobApplicationService.ApplicationAlreadyExistsException e) {
            log.warn("Duplicate application attempt: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(createErrorResponse("Application Already Exists", e.getMessage()));
        } catch (JobApplicationService.ApplicationValidationException e) {
            log.error("Application validation error", e);
            return ResponseEntity.badRequest()
                    .body(createErrorResponse("Validation Failed", e.getMessage()));
        } catch (Exception e) {
            log.error("Error submitting application", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to submit application", e.getMessage()));
        }
    }

    @PostMapping("/quick-apply/{jobId}")
    @Operation(summary = "Quick apply for logged-in users", description = "Submit application using user profile data")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Application submitted successfully"),
            @ApiResponse(responseCode = "401", description = "User not authenticated"),
            @ApiResponse(responseCode = "409", description = "Application already exists")
    })
    public ResponseEntity<Object> quickApply(
            @PathVariable String jobId,
            @RequestParam(value = "coverLetter", required = false) String coverLetter,
            @RequestParam(value = "resume", required = false) MultipartFile resume,
            HttpServletRequest request) {

        try {
            String userId = getCurrentUserId();
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(createErrorResponse("Authentication Required", "Please log in to use quick apply"));
            }

            JobApplication savedApplication = applicationService.quickApply(
                    jobId, userId, coverLetter, resume, request);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedApplication);

        } catch (JobApplicationService.ApplicationAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(createErrorResponse("Application Already Exists", e.getMessage()));
        } catch (JobApplicationService.UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(createErrorResponse("User Not Found", e.getMessage()));
        } catch (Exception e) {
            log.error("Error in quick apply", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to submit application", e.getMessage()));
        }
    }

    @GetMapping("/user-data")
    @Operation(summary = "Get user application data", description = "Get user profile data for pre-filling application form")
    @ApiResponse(responseCode = "200", description = "User data retrieved successfully")
    public ResponseEntity<Object> getUserApplicationData() {
        try {
            String userId = getCurrentUserId();
            if (userId == null) {
                return ResponseEntity.ok(Map.of("authenticated", false));
            }

            JobApplicationService.ApplicationUserData userData = applicationService.getUserApplicationData(userId);

            Map<String, Object> response = new HashMap<>();
            response.put("authenticated", true);
            response.put("userData", userData);

            return ResponseEntity.ok(response);

        } catch (JobApplicationService.UserNotFoundException e) {
            return ResponseEntity.ok(Map.of("authenticated", false));
        } catch (Exception e) {
            log.error("Error fetching user application data", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to fetch user data", e.getMessage()));
        }
    }

    // ================================
    // APPLICATION MANAGEMENT
    // ================================

    @GetMapping
    @Operation(summary = "Get all applications", description = "Retrieve all job applications with pagination and filtering")
    @ApiResponse(responseCode = "200", description = "Applications retrieved successfully")
    public ResponseEntity<Object> getAllApplications(
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") @Min(0) int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size,
            @Parameter(description = "Sort field") @RequestParam(defaultValue = "appliedAt") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir,
            @Parameter(description = "Use pagination") @RequestParam(defaultValue = "true") boolean paginated) {

        try {
            if (paginated) {
                Page<JobApplication> applicationPage = applicationService.getAllApplicationsPaginated(page, size, sortBy, sortDir);

                Map<String, Object> response = new HashMap<>();
                response.put("applications", applicationPage.getContent());
                response.put("totalElements", applicationPage.getTotalElements());
                response.put("totalPages", applicationPage.getTotalPages());
                response.put("currentPage", applicationPage.getNumber());
                response.put("pageSize", applicationPage.getSize());
                response.put("hasNext", applicationPage.hasNext());
                response.put("hasPrevious", applicationPage.hasPrevious());

                return ResponseEntity.ok()
                        .header("X-Total-Count", String.valueOf(applicationPage.getTotalElements()))
                        .body(response);
            } else {
                List<JobApplication> applications = applicationService.getAllApplications();
                return ResponseEntity.ok(applications);
            }
        } catch (Exception e) {
            log.error("Error fetching applications", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to fetch applications", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get application by ID", description = "Retrieve a specific job application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Application found"),
            @ApiResponse(responseCode = "404", description = "Application not found")
    })
    public ResponseEntity<Object> getApplicationById(@PathVariable String id) {
        try {
            JobApplication application = applicationService.getApplicationById(id);
            return ResponseEntity.ok(application);
        } catch (JobApplicationService.ApplicationNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error fetching application by id: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to fetch application", e.getMessage()));
        }
    }

    @GetMapping("/job/{jobId}")
    @Operation(summary = "Get applications for a job", description = "Retrieve all applications for a specific job")
    @ApiResponse(responseCode = "200", description = "Applications retrieved successfully")
    public ResponseEntity<Object> getApplicationsByJobId(
            @PathVariable String jobId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "false") boolean paginated) {

        try {
            if (paginated) {
                Page<JobApplication> applicationPage = applicationService.getApplicationsByJobIdPaginated(jobId, page, size);

                Map<String, Object> response = new HashMap<>();
                response.put("applications", applicationPage.getContent());
                response.put("totalElements", applicationPage.getTotalElements());
                response.put("totalPages", applicationPage.getTotalPages());
                response.put("currentPage", applicationPage.getNumber());

                return ResponseEntity.ok(response);
            } else {
                List<JobApplication> applications = applicationService.getApplicationsByJobId(jobId);
                return ResponseEntity.ok(applications);
            }
        } catch (Exception e) {
            log.error("Error fetching applications for job: {}", jobId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to fetch applications", e.getMessage()));
        }
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "Get user applications", description = "Retrieve all applications submitted by a user")
    @ApiResponse(responseCode = "200", description = "User applications retrieved successfully")
    public ResponseEntity<Object> getUserApplications(
            @PathVariable String userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "false") boolean paginated) {

        try {
            // Check if current user can access these applications
            String currentUserId = getCurrentUserId();
            if (!userId.equals(currentUserId) && !isAdmin()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(createErrorResponse("Access Denied", "You can only view your own applications"));
            }

            if (paginated) {
                Page<JobApplication> applicationPage = applicationService.getUserApplicationsPaginated(userId, page, size);

                Map<String, Object> response = new HashMap<>();
                response.put("applications", applicationPage.getContent());
                response.put("totalElements", applicationPage.getTotalElements());
                response.put("totalPages", applicationPage.getTotalPages());
                response.put("currentPage", applicationPage.getNumber());

                return ResponseEntity.ok(response);
            } else {
                List<JobApplication> applications = applicationService.getUserApplications(userId);
                return ResponseEntity.ok(applications);
            }
        } catch (Exception e) {
            log.error("Error fetching applications for user: {}", userId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to fetch applications", e.getMessage()));
        }
    }

    @GetMapping("/my-applications")
    @Operation(summary = "Get current user applications", description = "Retrieve applications for the logged-in user")
    @ApiResponse(responseCode = "200", description = "User applications retrieved successfully")
    public ResponseEntity<Object> getMyApplications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "true") boolean paginated) {

        try {
            String userId = getCurrentUserId();
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(createErrorResponse("Authentication Required", "Please log in to view your applications"));
            }

            return getUserApplications(userId, page, size, paginated);

        } catch (Exception e) {
            log.error("Error fetching user applications", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to fetch applications", e.getMessage()));
        }
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Update application status", description = "Update the status of a job application")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Status updated successfully"),
            @ApiResponse(responseCode = "404", description = "Application not found"),
            @ApiResponse(responseCode = "400", description = "Invalid status")
    })
    public ResponseEntity<Object> updateApplicationStatus(
            @PathVariable String id,
            @RequestParam String status,
            @RequestParam(required = false) String notes) {

        try {
            String updatedBy = getCurrentUserEmail();
            if (updatedBy == null) {
                updatedBy = "system";
            }

            JobApplication updatedApplication = applicationService.updateApplicationStatus(id, status, updatedBy);

            if (notes != null && !notes.trim().isEmpty()) {
                updatedApplication = applicationService.addHRNotes(id, notes, updatedBy);
            }

            return ResponseEntity.ok(updatedApplication);

        } catch (JobApplicationService.ApplicationNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (JobApplicationService.ApplicationValidationException e) {
            return ResponseEntity.badRequest()
                    .body(createErrorResponse("Invalid Status", e.getMessage()));
        } catch (Exception e) {
            log.error("Error updating application status: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to update status", e.getMessage()));
        }
    }

    @PostMapping("/{id}/schedule-interview")
    @Operation(summary = "Schedule interview", description = "Schedule an interview for a job application")
    @ApiResponse(responseCode = "200", description = "Interview scheduled successfully")
    public ResponseEntity<Object> scheduleInterview(
            @PathVariable String id,
            @RequestParam String interviewDateTime,
            @RequestParam(required = false) String notes) {

        try {
            LocalDateTime interviewDate = LocalDateTime.parse(interviewDateTime, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
            JobApplication updatedApplication = applicationService.scheduleInterview(id, interviewDate, notes);

            return ResponseEntity.ok(updatedApplication);

        } catch (JobApplicationService.ApplicationNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error scheduling interview for application: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to schedule interview", e.getMessage()));
        }
    }

    // ================================
    // SEARCH AND STATISTICS
    // ================================

    @GetMapping("/search")
    @Operation(summary = "Search applications", description = "Search job applications by various criteria")
    @ApiResponse(responseCode = "200", description = "Search results retrieved successfully")
    public ResponseEntity<Object> searchApplications(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        try {
            Page<JobApplication> applicationPage = applicationService.searchApplications(query, page, size);

            Map<String, Object> response = new HashMap<>();
            response.put("applications", applicationPage.getContent());
            response.put("totalElements", applicationPage.getTotalElements());
            response.put("totalPages", applicationPage.getTotalPages());
            response.put("currentPage", applicationPage.getNumber());
            response.put("query", query);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error searching applications", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to search applications", e.getMessage()));
        }
    }

    @GetMapping("/statistics")
    @Operation(summary = "Get application statistics", description = "Retrieve statistics about job applications")
    @ApiResponse(responseCode = "200", description = "Statistics retrieved successfully")
    public ResponseEntity<Object> getApplicationStatistics() {
        try {
            JobApplicationService.ApplicationStatistics stats = applicationService.getApplicationStatistics();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            log.error("Error fetching application statistics", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to fetch statistics", e.getMessage()));
        }
    }

    @GetMapping("/recent")
    @Operation(summary = "Get recent applications", description = "Retrieve recently submitted applications")
    @ApiResponse(responseCode = "200", description = "Recent applications retrieved successfully")
    public ResponseEntity<Object> getRecentApplications(
            @RequestParam(defaultValue = "10") @Min(1) @Max(50) int limit) {

        try {
            List<JobApplication> applications = applicationService.getRecentApplications(limit);
            return ResponseEntity.ok(applications);
        } catch (Exception e) {
            log.error("Error fetching recent applications", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to fetch recent applications", e.getMessage()));
        }
    }

    // ================================
    // HELPER METHODS
    // ================================

    private JobApplication buildApplicationFromParams(String fullName, String email, String phoneNumber,
                                                      String currentPosition, String currentCompany,
                                                      Integer yearsOfExperience, String coverLetter,
                                                      Double expectedSalary, String expectedSalaryCurrency,
                                                      String noticePeriod, Boolean willingToRelocate,
                                                      Boolean remoteWorkPreference, String portfolioUrl,
                                                      String additionalNotes) {

        JobApplication application = new JobApplication();
        application.setFullName(fullName);
        application.setEmail(email);
        application.setPhoneNumber(phoneNumber);
        application.setCurrentPosition(currentPosition);
        application.setCurrentCompany(currentCompany);
        application.setYearsOfExperience(yearsOfExperience);
        application.setCoverLetter(coverLetter);
        application.setExpectedSalary(expectedSalary);
        application.setExpectedSalaryCurrency(expectedSalaryCurrency);
        application.setNoticePeriod(noticePeriod);
        application.setWillingToRelocate(willingToRelocate);
        application.setRemoteWorkPreference(remoteWorkPreference);
        application.setPortfolioUrl(portfolioUrl);
        application.setAdditionalNotes(additionalNotes);

        return application;
    }

    private String getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()
                && !"anonymousUser".equals(authentication.getPrincipal())) {
            // This assumes you have a way to get user ID from authentication
            // You might need to adjust this based on your authentication setup
            return authentication.getName(); // or extract user ID from principal
        }
        return null;
    }

    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()
                && !"anonymousUser".equals(authentication.getPrincipal())) {
            return authentication.getName();
        }
        return null;
    }

    private boolean isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            return authentication.getAuthorities().stream()
                    .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));
        }
        return false;
    }

    private Map<String, Object> createErrorResponse(String error, String message) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("error", error);
        errorResponse.put("message", message);
        errorResponse.put("timestamp", LocalDateTime.now());
        return errorResponse;
    }

    // ================================
    // EXCEPTION HANDLERS
    // ================================

    @ExceptionHandler(JobApplicationService.ApplicationNotFoundException.class)
    public ResponseEntity<Object> handleApplicationNotFoundException(JobApplicationService.ApplicationNotFoundException e) {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(JobApplicationService.ApplicationValidationException.class)
    public ResponseEntity<Object> handleApplicationValidationException(JobApplicationService.ApplicationValidationException e) {
        return ResponseEntity.badRequest()
                .body(createErrorResponse("Validation Error", e.getMessage()));
    }

    @ExceptionHandler(JobApplicationService.ApplicationAlreadyExistsException.class)
    public ResponseEntity<Object> handleApplicationAlreadyExistsException(JobApplicationService.ApplicationAlreadyExistsException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(createErrorResponse("Application Already Exists", e.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest()
                .body(createErrorResponse("Invalid Argument", e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGenericException(Exception e) {
        log.error("Unexpected error in JobApplicationController", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Internal Server Error", "An unexpected error occurred"));
    }
}