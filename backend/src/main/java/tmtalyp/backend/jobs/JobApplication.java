package tmtalyp.backend.jobs;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.Arrays;

@Data
@Document(collection = "job_applications")
public class JobApplication {
    @Id
    private String id;

    @NotBlank(message = "Job ID is required")
    @Indexed
    private String jobId;

    @NotBlank(message = "Job title is required")
    private String jobTitle;

    @NotBlank(message = "Company name is required")
    private String companyName;

    // User Information
    @Indexed
    private String userId; // If user is logged in

    @NotBlank(message = "Full name is required")
    @Size(min = 2, max = 100, message = "Full name must be between 2 and 100 characters")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    @Indexed
    private String email;

    @Pattern(regexp = "^[+]?[0-9\\s\\-()]{10,15}$", message = "Please provide a valid phone number")
    private String phoneNumber;

    // Professional Information
    @Size(max = 200, message = "Current position cannot exceed 200 characters")
    private String currentPosition;

    @Size(max = 100, message = "Company name cannot exceed 100 characters")
    private String currentCompany;

    @Min(value = 0, message = "Years of experience cannot be negative")
    @Max(value = 50, message = "Years of experience cannot exceed 50")
    private Integer yearsOfExperience;

    @Size(max = 1000, message = "Cover letter cannot exceed 1000 characters")
    private String coverLetter;

    // File attachments
    private String resumeFileName;
    private String resumeUrl;
    private String portfolioUrl;

    // Application Status
    @NotNull(message = "Application status is required")
    @Pattern(regexp = "^(pending|reviewed|shortlisted|interviewed|offered|rejected|withdrawn)$",
            message = "Status must be one of: pending, reviewed, shortlisted, interviewed, offered, rejected, withdrawn")
    @Indexed
    private String status = "pending";

    // Additional Information
    @Min(value = 0, message = "Expected salary cannot be negative")
    private Double expectedSalary;

    private String expectedSalaryCurrency = "USD";

    @Size(max = 50, message = "Notice period cannot exceed 50 characters")
    private String noticePeriod;

    private Boolean willingToRelocate = false;
    private Boolean remoteWorkPreference = false;

    @Size(max = 500, message = "Additional notes cannot exceed 500 characters")
    private String additionalNotes;

    // Application metadata
    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;
    private String applicationSource = "website"; // website, referral, linkedin, etc.
    private String ipAddress;
    private String userAgent;

    // HR/Admin fields
    private String hrNotes;
    private String interviewSchedule;
    private LocalDateTime interviewDate;
    private String rejectionReason;
    private LocalDateTime statusUpdatedAt;
    private String statusUpdatedBy;

    // Analytics
    private Integer timesViewed = 0;
    private LocalDateTime lastViewedAt;

    // Helper methods
    public boolean isPending() {
        return "pending".equals(status);
    }

    public boolean isActive() {
        return !Arrays.asList("rejected", "withdrawn").contains(status);
    }

    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        if (appliedAt == null) {
            appliedAt = now;
        }
        updatedAt = now;
        statusUpdatedAt = now;
    }

    public void updateStatus(String newStatus, String updatedBy) {
        this.status = newStatus;
        this.statusUpdatedBy = updatedBy;
        this.statusUpdatedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public void incrementViewCount() {
        this.timesViewed = (this.timesViewed == null ? 0 : this.timesViewed) + 1;
        this.lastViewedAt = LocalDateTime.now();
    }
}