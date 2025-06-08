package tmtalyp.backend.jobs;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends MongoRepository<Job, String> {

    // Basic queries
    List<Job> findByStatus(String status);
    List<Job> findByStatusOrderByCreatedAtDesc(String status);
    List<Job> findByCompany(String company);
    List<Job> findByCompanyIgnoreCase(String company);
    Optional<Job> findBySlug(String slug);

    // Location-based queries
    List<Job> findByLocationIgnoreCase(String location);
    List<Job> findByLocationContainingIgnoreCase(String location);

    // Job type queries
    List<Job> findByJobType(String jobType);
    List<Job> findByJobTypeAndStatus(String jobType, String status);

    // Date-based queries
    List<Job> findByCreatedAtAfter(LocalDateTime date);
    List<Job> findByApplicationDeadlineAfter(LocalDateTime date);
    List<Job> findByApplicationDeadlineBefore(LocalDateTime date);

    // Find active jobs with valid deadlines
    @Query("{ 'status': 'active', $or: [ { 'applicationDeadline': null }, { 'applicationDeadline': { $gt: ?0 } } ] }")
    List<Job> findActiveJobsWithValidDeadlines(LocalDateTime currentDate);

    // Salary-based queries
    @Query("{ 'salaryMin': { $gte: ?0 }, 'salaryMax': { $lte: ?1 } }")
    List<Job> findBySalaryRange(Double minSalary, Double maxSalary);

    // Featured jobs
    List<Job> findByFeaturedTrueAndStatusOrderByCreatedAtDesc(String status);

    // Comprehensive search query
    @Query("{ $and: [ " +
            "{ $or: [ " +
            "  { 'title': { $regex: ?0, $options: 'i' } }, " +
            "  { 'company': { $regex: ?0, $options: 'i' } }, " +
            "  { 'description': { $regex: ?0, $options: 'i' } }, " +
            "  { 'requirements': { $regex: ?0, $options: 'i' } }, " +
            "  { 'location': { $regex: ?0, $options: 'i' } }, " +
            "  { 'skills': { $in: [?0] } }, " +
            "  { 'industry': { $regex: ?0, $options: 'i' } }, " +
            "  { 'keywords': { $in: [?0] } } " +
            "] }, " +
            "{ 'status': 'active' } " +
            "] }")
    List<Job> searchActiveJobs(String query);

    // Advanced search with filters
    @Query("{ $and: [ " +
            "{ $or: [ " +
            "  { 'title': { $regex: ?0, $options: 'i' } }, " +
            "  { 'company': { $regex: ?0, $options: 'i' } }, " +
            "  { 'description': { $regex: ?0, $options: 'i' } } " +
            "] }, " +
            "{ 'status': 'active' }, " +
            "{ $or: [ { 'applicationDeadline': null }, { 'applicationDeadline': { $gt: ?1 } } ] } " +
            "] }")
    Page<Job> searchJobsWithPagination(String query, LocalDateTime currentDate, Pageable pageable);

    // Filter by multiple criteria
    @Query("{ $and: [ " +
            "{ 'status': 'active' }, " +
            "{ $or: [ { 'applicationDeadline': null }, { 'applicationDeadline': { $gt: ?0 } } ] }, " +
            "{ $or: [ { 'location': { $regex: ?1, $options: 'i' } }, ?1 == null ] }, " +
            "{ $or: [ { 'jobType': ?2 }, ?2 == null ] }, " +
            "{ $or: [ { 'company': { $regex: ?3, $options: 'i' } }, ?3 == null ] } " +
            "] }")
    Page<Job> findJobsWithFilters(LocalDateTime currentDate, String location, String jobType, String company, Pageable pageable);

    // Salary range filtering
    @Query("{ $and: [ " +
            "{ 'status': 'active' }, " +
            "{ $or: [ " +
            "  { $and: [ { 'salaryMin': { $gte: ?0 } }, { 'salaryMax': { $lte: ?1 } } ] }, " +
            "  { $and: [ { 'salaryMin': { $lte: ?1 } }, { 'salaryMax': { $gte: ?0 } } ] } " +
            "] } " +
            "] }")
    List<Job> findJobsInSalaryRange(Double minSalary, Double maxSalary);

    // Jobs by experience level
    List<Job> findByExperienceLevelAndStatus(String experienceLevel, String status);

    // Jobs by industry
    List<Job> findByIndustryIgnoreCaseAndStatus(String industry, String status);

    // Remote jobs
    List<Job> findByRemoteAllowedTrueAndStatus(String status);

    // Urgent jobs
    List<Job> findByIsUrgentTrueAndStatusOrderByCreatedAtDesc(String status);

    // Jobs expiring soon (within specified days)
    @Query("{ $and: [ " +
            "{ 'status': 'active' }, " +
            "{ 'applicationDeadline': { $gte: ?0, $lte: ?1 } } " +
            "] }")
    List<Job> findJobsExpiringSoon(LocalDateTime startDate, LocalDateTime endDate);

    // Jobs by skills
    @Query("{ 'skills': { $in: ?0 }, 'status': 'active' }")
    List<Job> findBySkillsIn(List<String> skills);

    // Statistics queries
    @Query(value = "{ 'status': 'active' }", count = true)
    long countActiveJobs();

    @Query(value = "{ 'company': ?0 }", count = true)
    long countJobsByCompany(String company);

    @Query(value = "{ 'createdAt': { $gte: ?0 } }", count = true)
    long countJobsCreatedAfter(LocalDateTime date);

    // Aggregation for job statistics
    @Aggregation(pipeline = {
            "{ $match: { 'status': 'active' } }",
            "{ $group: { _id: '$jobType', count: { $sum: 1 } } }",
            "{ $sort: { count: -1 } }"
    })
    List<JobTypeCount> getJobCountByType();

    @Aggregation(pipeline = {
            "{ $match: { 'status': 'active' } }",
            "{ $group: { _id: '$location', count: { $sum: 1 } } }",
            "{ $sort: { count: -1 } }",
            "{ $limit: 10 }"
    })
    List<LocationCount> getTopJobLocations();

    @Aggregation(pipeline = {
            "{ $match: { 'status': 'active' } }",
            "{ $group: { _id: '$company', count: { $sum: 1 } } }",
            "{ $sort: { count: -1 } }",
            "{ $limit: 10 }"
    })
    List<CompanyCount> getTopHiringCompanies();

    // Recent jobs
    List<Job> findTop10ByStatusOrderByCreatedAtDesc(String status);

    // Popular jobs (by view count)
    List<Job> findTop10ByStatusOrderByViewCountDesc(String status);

    // Jobs with most applications
    List<Job> findTop10ByStatusOrderByApplicationCountDesc(String status);

    // Custom projections for statistics
    interface JobTypeCount {
        String getId();
        Long getCount();
    }

    interface LocationCount {
        String getId();
        Long getCount();
    }

    interface CompanyCount {
        String getId();
        Long getCount();
    }

    // Cleanup methods
    List<Job> findByStatusAndApplicationDeadlineBefore(String status, LocalDateTime date);

    @Query("{ 'status': 'draft', 'createdAt': { $lt: ?0 } }")
    List<Job> findOldDraftJobs(LocalDateTime cutoffDate);
}