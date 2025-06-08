package tmtalyp.backend.jobs;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.repository.query.Param; // Import @Param
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface JobApplicationRepository extends MongoRepository<JobApplication, String> {

    // Basic queries
    List<JobApplication> findByJobId(String jobId);
    List<JobApplication> findByUserId(String userId);
    List<JobApplication> findByEmail(String email);
    List<JobApplication> findByStatus(String status);
    Optional<JobApplication> findByJobIdAndUserId(String jobId, String userId);
    Optional<JobApplication> findByJobIdAndEmail(String jobId, String email);

    // Status-based queries
    List<JobApplication> findByStatusOrderByAppliedAtDesc(String status);
    Page<JobApplication> findByStatus(String status, Pageable pageable);

    // Job-specific applications
    Page<JobApplication> findByJobIdOrderByAppliedAtDesc(String jobId, Pageable pageable);
    long countByJobId(String jobId);
    long countByJobIdAndStatus(String jobId, String status);

    // User-specific applications
    Page<JobApplication> findByUserIdOrderByAppliedAtDesc(String userId, Pageable pageable);
    Page<JobApplication> findByEmailOrderByAppliedAtDesc(String email, Pageable pageable);
    long countByUserId(String userId);
    long countByEmail(String email);

    // Date-based queries
    List<JobApplication> findByAppliedAtBetween(LocalDateTime startDate, LocalDateTime endDate);
    List<JobApplication> findByAppliedAtAfter(LocalDateTime date);

    // Company-specific applications
    List<JobApplication> findByCompanyNameIgnoreCase(String companyName);
    Page<JobApplication> findByCompanyNameIgnoreCaseOrderByAppliedAtDesc(String companyName, Pageable pageable);

    // Search applications
    @Query("{ $or: [ " +
            "{ 'fullName': { $regex: ?0, $options: 'i' } }, " +
            "{ 'email': { $regex: ?0, $options: 'i' } }, " +
            "{ 'jobTitle': { $regex: ?0, $options: 'i' } }, " +
            "{ 'companyName': { $regex: ?0, $options: 'i' } }, " +
            "{ 'currentPosition': { $regex: ?0, $options: 'i' } } " +
            "] }")
    Page<JobApplication> searchApplications(String query, Pageable pageable);

    // Advanced filtering
    // Corrected query using SpEL for conditional filtering
    @Query("{ $and: [ " +
            "?#{ T(org.springframework.util.StringUtils).hasText(#status) ? { 'status': #status } : {} }, " +
            "?#{ T(org.springframework.util.StringUtils).hasText(#company) ? { 'companyName': { $regex: #company, $options: 'i' } } : {} }, " +
            "?#{ #fromDate != null ? { 'appliedAt': { $gte: #fromDate } } : {} }, " +
            "?#{ #toDate != null ? { 'appliedAt': { $lte: #toDate } } : {} } " +
            "] }")
    Page<JobApplication> findApplicationsWithFilters(@Param("status") String status, @Param("company") String company,
                                                     @Param("fromDate") LocalDateTime fromDate, @Param("toDate") LocalDateTime toDate,
                                                     Pageable pageable);

    // Check for duplicate applications
    boolean existsByJobIdAndUserId(String jobId, String userId);
    boolean existsByJobIdAndEmail(String jobId, String email);

    // Statistics queries
    @Query(value = "{ 'status': 'pending' }", count = true)
    long countPendingApplications();

    @Query(value = "{ 'appliedAt': { $gte: ?0 } }", count = true)
    long countApplicationsAfterDate(LocalDateTime date);

    // Aggregation for statistics
    @Aggregation(pipeline = {
            "{ $group: { _id: '$status', count: { $sum: 1 } } }",
            "{ $sort: { count: -1 } }"
    })
    List<ApplicationStatusCount> getApplicationCountByStatus();

    @Aggregation(pipeline = {
            "{ $group: { _id: '$companyName', count: { $sum: 1 } } }",
            "{ $sort: { count: -1 } }",
            "{ $limit: 10 }"
    })
    List<CompanyApplicationCount> getTopCompaniesByApplications();

    @Aggregation(pipeline = {
            "{ $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$appliedAt' } }, count: { $sum: 1 } } }",
            "{ $sort: { '_id': -1 } }",
            "{ $limit: 30 }"
    })
    List<DailyApplicationCount> getDailyApplicationCounts();

    // Recent applications for dashboard
    List<JobApplication> findTop10ByOrderByAppliedAtDesc();
    List<JobApplication> findTop5ByStatusOrderByAppliedAtDesc(String status);

    // Applications needing attention
    @Query("{ 'status': 'pending', 'appliedAt': { $lt: ?0 } }")
    List<JobApplication> findOldPendingApplications(LocalDateTime cutoffDate);

    // Applications by experience level
    @Query("{ 'yearsOfExperience': { $gte: ?0, $lte: ?1 } }")
    List<JobApplication> findByExperienceRange(Integer minYears, Integer maxYears);

    // Applications with attachments
    @Query("{ 'resumeUrl': { $ne: null } }")
    List<JobApplication> findApplicationsWithResume();

    @Query("{ 'portfolioUrl': { $ne: null } }")
    List<JobApplication> findApplicationsWithPortfolio();

    // Custom projections for statistics
    interface ApplicationStatusCount {
        String getId();
        Long getCount();
    }

    interface CompanyApplicationCount {
        String getId();
        Long getCount();
    }

    interface DailyApplicationCount {
        String getId();
        Long getCount();
    }

    // Cleanup methods
    @Query("{ 'status': 'pending', 'appliedAt': { $lt: ?0 } }")
    List<JobApplication> findExpiredPendingApplications(LocalDateTime cutoffDate);

    void deleteByAppliedAtBefore(LocalDateTime cutoffDate);
}