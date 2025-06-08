package tmtalyp.backend.jobs;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.math.BigDecimal;

@Data
@Document(collection = "jobs")
public class Job {
    @Id
    private String id;

    @NotBlank(message = "Job title is required")
    @Size(min = 2, max = 200, message = "Job title must be between 2 and 200 characters")
    @Indexed
    private String title;

    @NotBlank(message = "Company name is required")
    @Size(min = 2, max = 100, message = "Company name must be between 2 and 100 characters")
    @Indexed
    private String company;

    @NotBlank(message = "Location is required")
    @Size(min = 2, max = 100, message = "Location must be between 2 and 100 characters")
    @Indexed
    private String location;

    @NotNull(message = "Job type is required")
    @Pattern(regexp = "^(full-time|part-time|contract|internship|remote)$",
            message = "Job type must be one of: full-time, part-time, contract, internship, remote")
    private String jobType;

    @DecimalMin(value = "0.0", inclusive = false, message = "Minimum salary must be positive")
    private BigDecimal salaryMin;

    @DecimalMin(value = "0.0", inclusive = false, message = "Maximum salary must be positive")
    private BigDecimal salaryMax;

    @Pattern(regexp = "^[A-Z]{3}$", message = "Currency must be a valid 3-letter code (e.g., USD, EUR)")
    private String currency = "USD";

    @Size(max = 5000, message = "Description cannot exceed 5000 characters")
    private String description;

    @Size(max = 3000, message = "Requirements cannot exceed 3000 characters")
    private String requirements;

    @NotNull(message = "Status is required")
    @Pattern(regexp = "^(active|closed|draft)$",
            message = "Status must be one of: active, closed, draft")
    @Indexed
    private String status = "active";

    private LocalDateTime applicationDeadline;

    @Email(message = "Contact email must be valid")
    private String contactEmail;

    @Pattern(regexp = "^(https?://).*", message = "Application URL must be a valid HTTP/HTTPS URL")
    private String applicationUrl;

    // Metadata fields
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String createdBy;
    private String updatedBy;

    // Additional fields for enhanced functionality
    private Boolean featured = false;
    private Integer viewCount = 0;
    private Integer applicationCount = 0;
    private String companyLogo;
    private String companyLogoFileName;

    // Tags for better categorization
    private java.util.List<String> skills;
    private java.util.List<String> benefits;
    private String experienceLevel; // entry, mid, senior, executive
    private String industry;
    private Boolean remoteAllowed = false;
    private String workingHours; // flexible, standard, shifts

    // Salary details
    private String salaryPeriod = "annually"; // hourly, monthly, annually
    private Boolean salaryNegotiable = false;

    // Application details
    private Integer maxApplications;
    private Boolean isUrgent = false;
    private LocalDateTime publishedAt;

    // SEO and search optimization
    private String slug;
    private java.util.List<String> keywords;

    // Custom validation for salary range
    public boolean isSalaryRangeValid() {
        if (salaryMin != null && salaryMax != null) {
            return salaryMin.compareTo(salaryMax) <= 0;
        }
        return true;
    }

    // Helper methods
    public boolean isActive() {
        return "active".equals(status);
    }

    public boolean isExpired() {
        return applicationDeadline != null && LocalDateTime.now().isAfter(applicationDeadline);
    }

    public boolean hasValidDeadline() {
        return applicationDeadline == null || applicationDeadline.isAfter(LocalDateTime.now());
    }

    // Auto-generate slug from title and company
    public void generateSlug() {
        if (title != null && company != null) {
            this.slug = (title + "-" + company)
                    .toLowerCase()
                    .replaceAll("[^a-z0-9\\s-]", "")
                    .replaceAll("\\s+", "-")
                    .replaceAll("-+", "-")
                    .replaceAll("^-|-$", "");
        }
    }

    // Pre-persist operations
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        if (createdAt == null) {
            createdAt = now;
        }
        updatedAt = now;
        generateSlug();

        if ("active".equals(status) && publishedAt == null) {
            publishedAt = now;
        }
    }
}