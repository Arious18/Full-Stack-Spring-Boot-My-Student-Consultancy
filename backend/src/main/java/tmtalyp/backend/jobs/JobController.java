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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/jobs") 
@CrossOrigin(origins = {"http://localhost:5173"},
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@Tag(name = "Jobs Management", description = "Comprehensive job posting and management API")
public class JobController {

    private final JobService jobService;

    @Autowired
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // ================================
    // BASIC CRUD OPERATIONS
    // ================================

    @GetMapping
    @Operation(summary = "Get all jobs", description = "Retrieve all jobs with optional pagination, sorting, and filtering")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved jobs"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<Object> getAllJobs(
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") @Min(0) int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size,
            @Parameter(description = "Sort field") @RequestParam(defaultValue = "createdAt") String sortBy,
            @Parameter(description = "Sort direction (asc/desc)") @RequestParam(defaultValue = "desc") String sortDir,
            @Parameter(description = "Use pagination") @RequestParam(defaultValue = "false") boolean paginated,
            @Parameter(description = "Filter by status") @RequestParam(required = false) String status,
            @Parameter(description = "Filter by company") @RequestParam(required = false) String company) {

        try {
            log.info("Getting all jobs - page: {}, size: {}, paginated: {}", page, size, paginated);

            if (paginated) {
                Page<Job> jobPage = jobService.getAllJobsPaginated(page, size, sortBy, sortDir);

                Map<String, Object> response = new HashMap<>();
                response.put("jobs", jobPage.getContent());
                response.put("totalElements", jobPage.getTotalElements());
                response.put("totalPages", jobPage.getTotalPages());
                response.put("currentPage", jobPage.getNumber());
                response.put("pageSize", jobPage.getSize());
                response.put("hasNext", jobPage.hasNext());
                response.put("hasPrevious", jobPage.hasPrevious());
                response.put("isFirst", jobPage.isFirst());
                response.put("isLast", jobPage.isLast());

                return ResponseEntity.ok()
                        .header("X-Total-Count", String.valueOf(jobPage.getTotalElements()))
                        .header("X-Total-Pages", String.valueOf(jobPage.getTotalPages()))
                        .header("X-Current-Page", String.valueOf(jobPage.getNumber()))
                        .body(response);
            } else {
                List<Job> jobs = jobService.getAllJobs();

                // Apply filters if provided
                if (status != null && !status.isEmpty()) {
                    jobs = jobs.stream()
                            .filter(job -> status.equalsIgnoreCase(job.getStatus()))
                            .collect(Collectors.toList());
                }
                if (company != null && !company.isEmpty()) {
                    jobs = jobs.stream()
                            .filter(job -> job.getCompany().toLowerCase().contains(company.toLowerCase()))
                            .collect(Collectors.toList());
                }

                return ResponseEntity.ok(jobs);
            }
        } catch (Exception e) {
            log.error("Error fetching jobs", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to fetch jobs", e.getMessage()));
        }
    }

    @GetMapping("/active")
    @Operation(summary = "Get active jobs", description = "Retrieve all active jobs with valid deadlines")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved active jobs")
    public ResponseEntity<Object> getActiveJobs(
            @Parameter(description = "Limit number of results") @RequestParam(required = false) Integer limit) {
        try {
            List<Job> jobs = jobService.getAllActiveJobs();

            if (limit != null && limit > 0) {
                jobs = jobs.stream().limit(limit).collect(Collectors.toList());
            }

            return ResponseEntity.ok(jobs);
        } catch (Exception e) {
            log.error("Error fetching active jobs", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to fetch active jobs", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get job by ID", description = "Retrieve a specific job by its ID and increment view count")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Job found"),
            @ApiResponse(responseCode = "404", description = "Job not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<Object> getJobById(
            @Parameter(description = "Job ID") @PathVariable String id,
            @Parameter(description = "Skip view count increment") @RequestParam(defaultValue = "false") boolean skipViewIncrement) {
        try {
            Job job = jobService.getJobById(id);

            // Increment view count unless explicitly skipped
            if (!skipViewIncrement) {
                jobService.incrementViewCount(id);
                // Refresh job to get updated view count
                job = jobService.getJobById(id);
            }

            return ResponseEntity.ok(job);
        } catch (JobService.JobNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error fetching job by id: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to fetch job", e.getMessage()));
        }
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Create new job", description = "Create a new job posting with optional company logo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Job created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid job data"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<Object> createJob(
            @RequestParam("title") String title,
            @RequestParam("company") String company,
            @RequestParam("location") String location,
            @RequestParam("jobType") String jobType,
            @RequestParam(value = "salaryMin", required = false) BigDecimal salaryMin,
            @RequestParam(value = "salaryMax", required = false) BigDecimal salaryMax,
            @RequestParam(value = "currency", defaultValue = "USD") String currency,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "requirements", required = false) String requirements,
            @RequestParam(value = "status", defaultValue = "active") String status,
            @RequestParam(value = "applicationDeadline", required = false) String applicationDeadline,
            @RequestParam(value = "contactEmail", required = false) String contactEmail,
            @RequestParam(value = "applicationUrl", required = false) String applicationUrl,
            @RequestParam(value = "experienceLevel", required = false) String experienceLevel,
            @RequestParam(value = "industry", required = false) String industry,
            @RequestParam(value = "remoteAllowed", defaultValue = "false") Boolean remoteAllowed,
            @RequestParam(value = "workingHours", required = false) String workingHours,
            @RequestParam(value = "salaryPeriod", defaultValue = "annually") String salaryPeriod,
            @RequestParam(value = "salaryNegotiable", defaultValue = "false") Boolean salaryNegotiable,
            @RequestParam(value = "maxApplications", required = false) Integer maxApplications,
            @RequestParam(value = "isUrgent", defaultValue = "false") Boolean isUrgent,
            @RequestParam(value = "featured", defaultValue = "false") Boolean featured,
            @RequestParam(value = "skills", required = false) String skills,
            @RequestParam(value = "benefits", required = false) String benefits,
            @RequestParam(value = "keywords", required = false) String keywords,
            @RequestParam(value = "createdBy", required = false) String createdBy,
            @RequestParam(value = "companyLogo", required = false) MultipartFile companyLogo) {

        try {
            log.info("Creating new job: {} at {}", title, company);

            Job job = buildJobFromParams(title, company, location, jobType, salaryMin, salaryMax,
                    currency, description, requirements, status, applicationDeadline, contactEmail,
                    applicationUrl, experienceLevel, industry, remoteAllowed, workingHours,
                    salaryPeriod, salaryNegotiable, maxApplications, isUrgent, featured,
                    skills, benefits, keywords, createdBy);

            Job createdJob = jobService.createJob(job, companyLogo);

            return ResponseEntity.status(HttpStatus.CREATED).body(createdJob);

        } catch (JobService.JobValidationException e) {
            log.error("Validation error creating job", e);
            return ResponseEntity.badRequest()
                    .body(createErrorResponse("Validation failed", e.getMessage()));
        } catch (Exception e) {
            log.error("Error creating job", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to create job", e.getMessage()));
        }
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Update job", description = "Update an existing job posting")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Job updated successfully"),
            @ApiResponse(responseCode = "404", description = "Job not found"),
            @ApiResponse(responseCode = "400", description = "Invalid job data")
    })
    public ResponseEntity<Object> updateJob(
            @PathVariable String id,
            @RequestParam("title") String title,
            @RequestParam("company") String company,
            @RequestParam("location") String location,
            @RequestParam("jobType") String jobType,
            @RequestParam(value = "salaryMin", required = false) BigDecimal salaryMin,
            @RequestParam(value = "salaryMax", required = false) BigDecimal salaryMax,
            @RequestParam(value = "currency", defaultValue = "USD") String currency,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "requirements", required = false) String requirements,
            @RequestParam(value = "status", defaultValue = "active") String status,
            @RequestParam(value = "applicationDeadline", required = false) String applicationDeadline,
            @RequestParam(value = "contactEmail", required = false) String contactEmail,
            @RequestParam(value = "applicationUrl", required = false) String applicationUrl,
            @RequestParam(value = "experienceLevel", required = false) String experienceLevel,
            @RequestParam(value = "industry", required = false) String industry,
            @RequestParam(value = "remoteAllowed", defaultValue = "false") Boolean remoteAllowed,
            @RequestParam(value = "workingHours", required = false) String workingHours,
            @RequestParam(value = "salaryPeriod", defaultValue = "annually") String salaryPeriod,
            @RequestParam(value = "salaryNegotiable", defaultValue = "false") Boolean salaryNegotiable,
            @RequestParam(value = "maxApplications", required = false) Integer maxApplications,
            @RequestParam(value = "isUrgent", defaultValue = "false") Boolean isUrgent,
            @RequestParam(value = "featured", defaultValue = "false") Boolean featured,
            @RequestParam(value = "skills", required = false) String skills,
            @RequestParam(value = "benefits", required = false) String benefits,
            @RequestParam(value = "keywords", required = false) String keywords,
            @RequestParam(value = "updatedBy", required = false) String updatedBy,
            @RequestParam(value = "companyLogo", required = false) MultipartFile companyLogo) {

        try {
            Job job = buildJobFromParams(title, company, location, jobType, salaryMin, salaryMax,
                    currency, description, requirements, status, applicationDeadline, contactEmail,
                    applicationUrl, experienceLevel, industry, remoteAllowed, workingHours,
                    salaryPeriod, salaryNegotiable, maxApplications, isUrgent, featured,
                    skills, benefits, keywords, updatedBy);

            Job updatedJob = jobService.updateJob(id, job, companyLogo);
            return ResponseEntity.ok(updatedJob);

        } catch (JobService.JobNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (JobService.JobValidationException e) {
            return ResponseEntity.badRequest()
                    .body(createErrorResponse("Validation failed", e.getMessage()));
        } catch (Exception e) {
            log.error("Error updating job: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to update job", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete job", description = "Delete a job posting permanently")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Job deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Job not found"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<Object> deleteJob(@PathVariable String id) {
        try {
            jobService.deleteJob(id);
            return ResponseEntity.noContent().build();
        } catch (JobService.JobNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error deleting job: {}", id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createErrorResponse("Failed to delete job", e.getMessage()));
        }
    }

    // ================================
    // HELPER METHODS
    // ================================

    private Job buildJobFromParams(String title, String company, String location, String jobType,
                                   BigDecimal salaryMin, BigDecimal salaryMax, String currency,
                                   String description, String requirements, String status,
                                   String applicationDeadline, String contactEmail, String applicationUrl,
                                   String experienceLevel, String industry, Boolean remoteAllowed,
                                   String workingHours, String salaryPeriod, Boolean salaryNegotiable,
                                   Integer maxApplications, Boolean isUrgent, Boolean featured,
                                   String skills, String benefits, String keywords, String userInfo) {

        Job job = new Job();
        job.setTitle(title);
        job.setCompany(company);
        job.setLocation(location);
        job.setJobType(jobType);
        job.setSalaryMin(salaryMin);
        job.setSalaryMax(salaryMax);
        job.setCurrency(currency);
        job.setDescription(description);
        job.setRequirements(requirements);
        job.setStatus(status);
        job.setContactEmail(contactEmail);
        job.setApplicationUrl(applicationUrl);
        job.setExperienceLevel(experienceLevel);
        job.setIndustry(industry);
        job.setRemoteAllowed(remoteAllowed);
        job.setWorkingHours(workingHours);
        job.setSalaryPeriod(salaryPeriod);
        job.setSalaryNegotiable(salaryNegotiable);
        job.setMaxApplications(maxApplications);
        job.setIsUrgent(isUrgent);
        job.setFeatured(featured);

        // Parse application deadline
        if (applicationDeadline != null && !applicationDeadline.isEmpty()) {
            try {
                job.setApplicationDeadline(LocalDateTime.parse(applicationDeadline + "T23:59:59"));
            } catch (Exception e) {
                log.warn("Invalid date format for application deadline: {}", applicationDeadline);
            }
        }

        // Parse comma-separated lists
        if (skills != null && !skills.trim().isEmpty()) {
            job.setSkills(Arrays.stream(skills.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList()));
        }

        if (benefits != null && !benefits.trim().isEmpty()) {
            job.setBenefits(Arrays.stream(benefits.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList()));
        }

        if (keywords != null && !keywords.trim().isEmpty()) {
            job.setKeywords(Arrays.stream(keywords.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList()));
        }

        // Set user info
        if (userInfo != null) {
            job.setCreatedBy(userInfo);
            job.setUpdatedBy(userInfo);
        }

        return job;
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

    @ExceptionHandler(JobService.JobNotFoundException.class)
    public ResponseEntity<Object> handleJobNotFoundException(JobService.JobNotFoundException e) {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(JobService.JobValidationException.class)
    public ResponseEntity<Object> handleJobValidationException(JobService.JobValidationException e) {
        return ResponseEntity.badRequest()
                .body(createErrorResponse("Validation Error", e.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.badRequest()
                .body(createErrorResponse("Invalid Argument", e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGenericException(Exception e) {
        log.error("Unexpected error in JobController", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(createErrorResponse("Internal Server Error", "An unexpected error occurred"));
    }
}
