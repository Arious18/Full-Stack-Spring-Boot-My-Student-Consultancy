package tmtalyp.backend.news;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface NewsRepository extends MongoRepository<News, String> {

    // Find by basic properties
    Optional<News> findBySlug(String slug);

    List<News> findByCategory(String category);

    List<News> findByAuthorEmail(String authorEmail);

    // Published news queries
    List<News> findByIsPublishedTrueOrderByPublishedAtDesc();

    Page<News> findByIsPublishedTrueOrderByPublishedAtDesc(Pageable pageable);

    List<News> findByIsPublishedTrueAndCategoryOrderByPublishedAtDesc(String category);

    Page<News> findByIsPublishedTrueAndCategoryOrderByPublishedAtDesc(String category, Pageable pageable);

    // Featured and breaking news
    List<News> findByIsPublishedTrueAndIsFeaturedTrueOrderByPublishedAtDesc();

    List<News> findByIsPublishedTrueAndIsBreakingTrueOrderByPublishedAtDesc();

    // Status-based queries
    List<News> findByStatusOrderByCreatedAtDesc(String status);

    Page<News> findByStatusOrderByCreatedAtDesc(String status, Pageable pageable);

    // Date range queries
    List<News> findByIsPublishedTrueAndPublishedAtBetweenOrderByPublishedAtDesc(
            LocalDateTime startDate, LocalDateTime endDate);

    Page<News> findByIsPublishedTrueAndPublishedAtBetweenOrderByPublishedAtDesc(
            LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);

    // Geographic queries
    List<News> findByIsPublishedTrueAndCountryOrderByPublishedAtDesc(String country);

    List<News> findByIsPublishedTrueAndRegionOrderByPublishedAtDesc(String region);

    // Tag-based queries
    List<News> findByIsPublishedTrueAndTagsContainingOrderByPublishedAtDesc(String tag);

    // Priority-based queries
    List<News> findByIsPublishedTrueAndPriorityOrderByPublishedAtDesc(String priority);

    // Search queries
    @Query("{ $and: [ " +
            "{ 'isPublished': true }, " +
            "{ $or: [ " +
            "{ 'title': { $regex: ?0, $options: 'i' } }, " +
            "{ 'subtitle': { $regex: ?0, $options: 'i' } }, " +
            "{ 'content': { $regex: ?0, $options: 'i' } }, " +
            "{ 'summary': { $regex: ?0, $options: 'i' } }, " +
            "{ 'tags': { $regex: ?0, $options: 'i' } }, " +
            "{ 'category': { $regex: ?0, $options: 'i' } }, " +
            "{ 'authorName': { $regex: ?0, $options: 'i' } } " +
            "] } ] }")
    List<News> searchPublishedNews(String query);

    @Query("{ $and: [ " +
            "{ 'isPublished': true }, " +
            "{ $or: [ " +
            "{ 'title': { $regex: ?0, $options: 'i' } }, " +
            "{ 'subtitle': { $regex: ?0, $options: 'i' } }, " +
            "{ 'content': { $regex: ?0, $options: 'i' } }, " +
            "{ 'summary': { $regex: ?0, $options: 'i' } }, " +
            "{ 'tags': { $regex: ?0, $options: 'i' } }, " +
            "{ 'category': { $regex: ?0, $options: 'i' } }, " +
            "{ 'authorName': { $regex: ?0, $options: 'i' } } " +
            "] } ] }")
    Page<News> searchPublishedNews(String query, Pageable pageable);

    // Advanced search with filters
    @Query("{ $and: [ " +
            "{ 'isPublished': true }, " +
            "{ 'category': ?1 }, " +
            "{ $or: [ " +
            "{ 'title': { $regex: ?0, $options: 'i' } }, " +
            "{ 'content': { $regex: ?0, $options: 'i' } }, " +
            "{ 'summary': { $regex: ?0, $options: 'i' } } " +
            "] } ] }")
    Page<News> searchPublishedNewsByCategory(String query, String category, Pageable pageable);

    // Popular news (by view count)
    List<News> findTop10ByIsPublishedTrueOrderByViewCountDesc();

    // Recent news with limit
    List<News> findTop20ByIsPublishedTrueOrderByPublishedAtDesc();

    // Count queries
    long countByIsPublishedTrue();

    long countByCategory(String category);

    long countByStatus(String status);

    long countByAuthorEmail(String authorEmail);

    // Related news by tags (excluding current news)
    @Query("{ $and: [ " +
            "{ 'isPublished': true }, " +
            "{ '_id': { $ne: ?1 } }, " +
            "{ 'tags': { $in: ?0 } } " +
            "] }")
    List<News> findRelatedNewsByTags(List<String> tags, String excludeNewsId);

    // Scheduled news
    List<News> findByStatusAndScheduledAtLessThanEqual(String status, LocalDateTime dateTime);
}