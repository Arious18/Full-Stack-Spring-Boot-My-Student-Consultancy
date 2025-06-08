package tmtalyp.backend.news.comments;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NewsCommentRepository extends MongoRepository<NewsComment, String> {

    // Find comments by news ID
    List<NewsComment> findByNewsIdAndIsDeletedFalseOrderByCreatedAtDesc(String newsId);

    Page<NewsComment> findByNewsIdAndIsDeletedFalseOrderByCreatedAtDesc(String newsId, Pageable pageable);

    // Find approved comments only
    List<NewsComment> findByNewsIdAndIsApprovedTrueAndIsDeletedFalseOrderByCreatedAtDesc(String newsId);

    Page<NewsComment> findByNewsIdAndIsApprovedTrueAndIsDeletedFalseOrderByCreatedAtDesc(String newsId, Pageable pageable);

    // Find top-level comments (no parent) - ADDED MISSING METHODS
    List<NewsComment> findByNewsIdAndParentCommentIdIsNullAndIsDeletedFalseOrderByCreatedAtDesc(String newsId);

    Page<NewsComment> findByNewsIdAndParentCommentIdIsNullAndIsDeletedFalseOrderByCreatedAtDesc(String newsId, Pageable pageable);

    List<NewsComment> findByNewsIdAndParentCommentIdIsNullAndIsApprovedTrueAndIsDeletedFalseOrderByCreatedAtDesc(String newsId);

    Page<NewsComment> findByNewsIdAndParentCommentIdIsNullAndIsApprovedTrueAndIsDeletedFalseOrderByCreatedAtDesc(String newsId, Pageable pageable);

    // Find replies to a comment
    List<NewsComment> findByParentCommentIdAndIsApprovedTrueAndIsDeletedFalseOrderByCreatedAtAsc(String parentCommentId);

    // Find comments by author
    List<NewsComment> findByAuthorEmailAndIsDeletedFalseOrderByCreatedAtDesc(String authorEmail);

    Page<NewsComment> findByAuthorEmailAndIsDeletedFalseOrderByCreatedAtDesc(String authorEmail, Pageable pageable);

    // Find comments by status
    List<NewsComment> findByStatusOrderByCreatedAtDesc(String status);

    Page<NewsComment> findByStatusOrderByCreatedAtDesc(String status, Pageable pageable);

    // Moderation queries
    List<NewsComment> findByIsApprovedFalseAndIsDeletedFalseOrderByCreatedAtDesc();

    Page<NewsComment> findByIsApprovedFalseAndIsDeletedFalseOrderByCreatedAtDesc(Pageable pageable);

    List<NewsComment> findByIsReportedTrueAndIsDeletedFalseOrderByCreatedAtDesc();

    Page<NewsComment> findByIsReportedTrueAndIsDeletedFalseOrderByCreatedAtDesc(Pageable pageable);

    // Count queries
    long countByNewsIdAndIsApprovedTrueAndIsDeletedFalse(String newsId);

    long countByNewsIdAndParentCommentIdIsNullAndIsApprovedTrueAndIsDeletedFalse(String newsId);

    long countByParentCommentIdAndIsApprovedTrueAndIsDeletedFalse(String parentCommentId);

    long countByAuthorEmailAndIsDeletedFalse(String authorEmail);

    long countByStatus(String status);

    long countByIsApprovedFalseAndIsDeletedFalse();

    long countByIsReportedTrueAndIsDeletedFalse();

    // Search comments
    @Query("{ $and: [ " +
            "{ 'newsId': ?1 }, " +
            "{ 'isApproved': true }, " +
            "{ 'isDeleted': false }, " +
            "{ $or: [ " +
            "{ 'content': { $regex: ?0, $options: 'i' } }, " +
            "{ 'authorName': { $regex: ?0, $options: 'i' } } " +
            "] } ] }")
    List<NewsComment> searchCommentsByNewsId(String query, String newsId);

    @Query("{ $and: [ " +
            "{ 'newsId': ?1 }, " +
            "{ 'isApproved': true }, " +
            "{ 'isDeleted': false }, " +
            "{ $or: [ " +
            "{ 'content': { $regex: ?0, $options: 'i' } }, " +
            "{ 'authorName': { $regex: ?0, $options: 'i' } } " +
            "] } ] }")
    Page<NewsComment> searchCommentsByNewsId(String query, String newsId, Pageable pageable);

    // Recent comments across all news
    List<NewsComment> findTop10ByIsApprovedTrueAndIsDeletedFalseOrderByCreatedAtDesc();

    // Popular comments (by like count)
    List<NewsComment> findTop10ByNewsIdAndIsApprovedTrueAndIsDeletedFalseOrderByLikeCountDesc(String newsId);

    // Comments within date range
    List<NewsComment> findByNewsIdAndIsApprovedTrueAndIsDeletedFalseAndCreatedAtBetweenOrderByCreatedAtDesc(
            String newsId, LocalDateTime startDate, LocalDateTime endDate);

    Page<NewsComment> findByNewsIdAndIsApprovedTrueAndIsDeletedFalseAndCreatedAtBetweenOrderByCreatedAtDesc(
            String newsId, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);

    // Pinned comments
    List<NewsComment> findByNewsIdAndIsPinnedTrueAndIsApprovedTrueAndIsDeletedFalseOrderByCreatedAtDesc(String newsId);

    // Comments by IP address (for spam detection)
    List<NewsComment> findByIpAddressAndCreatedAtBetween(String ipAddress, LocalDateTime startDate, LocalDateTime endDate);

    // Bulk operations
    @Query("{ 'newsId': ?0 }")
    List<NewsComment> findAllByNewsId(String newsId);

    void deleteAllByNewsId(String newsId);
}