package tmtalyp.backend.news.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tmtalyp.backend.news.NewsService;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NewsCommentService {

    private final NewsCommentRepository commentRepository;
    private final NewsService newsService;

    @Autowired
    public NewsCommentService(NewsCommentRepository commentRepository, NewsService newsService) {
        this.commentRepository = commentRepository;
        this.newsService = newsService;
    }

    // Create new comment - AUTO APPROVE BY DEFAULT
    public NewsComment createComment(NewsComment comment, HttpServletRequest request) throws Exception {
        // Validate news exists
        try {
            newsService.getNewsById(comment.getNewsId());
        } catch (Exception e) {
            throw new Exception("News not found with id: " + comment.getNewsId());
        }

        // Set default values
        comment.setCreatedAt(LocalDateTime.now());
        comment.setUpdatedAt(LocalDateTime.now());

        // AUTO APPROVE - Change from false to true
        comment.setApproved(true);
        comment.setStatus("APPROVED");
        comment.setModeratedBy("AUTO_APPROVED");
        comment.setModeratedAt(LocalDateTime.now());

        comment.setDeleted(false);
        comment.setEdited(false);
        comment.setReported(false);
        comment.setPinned(false);
        comment.setLikeCount(0);
        comment.setDislikeCount(0);
        comment.setReplyCount(0);

        // Set IP address and user agent for tracking
        comment.setIpAddress(getClientIpAddress(request));
        comment.setUserAgent(request.getHeader("User-Agent"));

        // Auto-approve replies as well since parent comments are auto-approved
        if (comment.getParentCommentId() != null) {
            // Increment reply count for parent comment
            incrementReplyCount(comment.getParentCommentId());
        }

        NewsComment savedComment = commentRepository.save(comment);

        // Update comment count for the news article
        updateNewsCommentCount(comment.getNewsId());

        return savedComment;
    }

    // Update existing comment
    public NewsComment updateComment(String commentId, String newContent, String userEmail) throws Exception {
        Optional<NewsComment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            throw new Exception("Comment not found with id: " + commentId);
        }

        NewsComment comment = optionalComment.get();

        // Verify ownership
        if (!comment.getAuthorEmail().equals(userEmail)) {
            throw new Exception("Unauthorized to edit this comment");
        }

        // Check if comment can be edited (within time limit, not deleted, etc.)
        if (comment.isDeleted()) {
            throw new Exception("Cannot edit deleted comment");
        }

        comment.setContent(newContent);
        comment.setEdited(true);
        comment.setEditedAt(LocalDateTime.now());
        comment.setUpdatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    // Get comments for a news article
    public Page<NewsComment> getCommentsByNewsId(String newsId, int page, int size, boolean approvedOnly) {
        Pageable pageable = PageRequest.of(page, size);

        if (approvedOnly) {
            return commentRepository.findByNewsIdAndParentCommentIdIsNullAndIsApprovedTrueAndIsDeletedFalseOrderByCreatedAtDesc(newsId, pageable);
        } else {
            return commentRepository.findByNewsIdAndParentCommentIdIsNullAndIsDeletedFalseOrderByCreatedAtDesc(newsId, pageable);
        }
    }

    // Get replies for a comment
    public List<NewsComment> getRepliesByCommentId(String commentId) {
        return commentRepository.findByParentCommentIdAndIsApprovedTrueAndIsDeletedFalseOrderByCreatedAtAsc(commentId);
    }

    // Get comment by ID
    public NewsComment getCommentById(String commentId) throws Exception {
        Optional<NewsComment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            throw new Exception("Comment not found with id: " + commentId);
        }
        return optionalComment.get();
    }

    // Delete comment
    public void deleteComment(String commentId, String userEmail, boolean isAdmin) throws Exception {
        Optional<NewsComment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            throw new Exception("Comment not found with id: " + commentId);
        }

        NewsComment comment = optionalComment.get();

        // Verify ownership or admin privileges
        if (!isAdmin && !comment.getAuthorEmail().equals(userEmail)) {
            throw new Exception("Unauthorized to delete this comment");
        }

        // Soft delete
        comment.setDeleted(true);
        comment.setUpdatedAt(LocalDateTime.now());
        commentRepository.save(comment);

        // Update comment count for the news article
        updateNewsCommentCount(comment.getNewsId());

        // Decrement reply count for parent comment if this is a reply
        if (comment.getParentCommentId() != null) {
            decrementReplyCount(comment.getParentCommentId());
        }
    }

    // Approve comment (admin function) - Keep for manual override
    public NewsComment approveComment(String commentId, String moderatorEmail) throws Exception {
        Optional<NewsComment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            throw new Exception("Comment not found with id: " + commentId);
        }

        NewsComment comment = optionalComment.get();
        comment.setApproved(true);
        comment.setStatus("APPROVED");
        comment.setModeratedBy(moderatorEmail);
        comment.setModeratedAt(LocalDateTime.now());
        comment.setUpdatedAt(LocalDateTime.now());

        NewsComment savedComment = commentRepository.save(comment);

        // Update comment count for the news article
        updateNewsCommentCount(comment.getNewsId());

        return savedComment;
    }

    // Reject comment (admin function)
    public NewsComment rejectComment(String commentId, String moderatorEmail, String reason) throws Exception {
        Optional<NewsComment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            throw new Exception("Comment not found with id: " + commentId);
        }

        NewsComment comment = optionalComment.get();
        comment.setApproved(false);
        comment.setStatus("REJECTED");
        comment.setModeratedBy(moderatorEmail);
        comment.setModeratedAt(LocalDateTime.now());
        comment.setModeratorNote(reason);
        comment.setUpdatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    // Update comment approval (for manual admin control)
    public NewsComment updateCommentApproval(NewsComment comment) throws Exception {
        if (comment.getId() == null) {
            throw new Exception("Comment ID cannot be null");
        }

        // Validate that the comment exists
        NewsComment existingComment = getCommentById(comment.getId());
        if (existingComment == null) {
            throw new Exception("Comment not found with ID: " + comment.getId());
        }

        // Update approval fields
        existingComment.setApproved(comment.isApproved());
        existingComment.setModeratedAt(comment.getModeratedAt());
        existingComment.setModeratedBy(comment.getModeratedBy());
        existingComment.setStatus(comment.isApproved() ? "APPROVED" : "REJECTED");
        existingComment.setUpdatedAt(LocalDateTime.now());

        // Save and return updated comment
        NewsComment savedComment = commentRepository.save(existingComment);

        // Update comment count for the news article
        updateNewsCommentCount(existingComment.getNewsId());

        return savedComment;
    }

    // Pin/Unpin comment (admin function)
    public NewsComment togglePinComment(String commentId, String moderatorEmail) throws Exception {
        Optional<NewsComment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            throw new Exception("Comment not found with id: " + commentId);
        }

        NewsComment comment = optionalComment.get();
        comment.setPinned(!comment.isPinned());
        comment.setModeratedBy(moderatorEmail);
        comment.setModeratedAt(LocalDateTime.now());
        comment.setUpdatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    // Like comment
    public NewsComment likeComment(String commentId, String userEmail, String ipAddress) throws Exception {
        Optional<NewsComment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            throw new Exception("Comment not found with id: " + commentId);
        }

        NewsComment comment = optionalComment.get();

        // Check if user already voted
        if (comment.getVotes() != null) {
            boolean alreadyVoted = comment.getVotes().stream()
                    .anyMatch(vote -> vote.getUserEmail().equals(userEmail) || vote.getIpAddress().equals(ipAddress));
            if (alreadyVoted) {
                throw new Exception("User has already voted on this comment");
            }
        }

        // Add vote
        NewsComment.CommentVote vote = new NewsComment.CommentVote();
        vote.setUserEmail(userEmail);
        vote.setVoteType("LIKE");
        vote.setVotedAt(LocalDateTime.now());
        vote.setIpAddress(ipAddress);

        if (comment.getVotes() == null) {
            comment.setVotes(List.of(vote));
        } else {
            comment.getVotes().add(vote);
        }

        comment.setLikeCount(comment.getLikeCount() + 1);
        comment.setUpdatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    // Report comment
    public NewsComment reportComment(String commentId, String reportedBy, String reason, String description) throws Exception {
        Optional<NewsComment> optionalComment = commentRepository.findById(commentId);
        if (optionalComment.isEmpty()) {
            throw new Exception("Comment not found with id: " + commentId);
        }

        NewsComment comment = optionalComment.get();

        // Add flag
        NewsComment.CommentFlag flag = new NewsComment.CommentFlag();
        flag.setFlaggedBy(reportedBy);
        flag.setReason(reason);
        flag.setDescription(description);
        flag.setFlaggedAt(LocalDateTime.now());
        flag.setStatus("PENDING");

        if (comment.getFlags() == null) {
            comment.setFlags(List.of(flag));
        } else {
            comment.getFlags().add(flag);
        }

        comment.setReported(true);
        comment.setUpdatedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    // Search comments
    public Page<NewsComment> searchComments(String newsId, String query, int page, int size) {
        if (query == null || query.trim().isEmpty()) {
            return getCommentsByNewsId(newsId, page, size, true);
        }

        Pageable pageable = PageRequest.of(page, size);
        return commentRepository.searchCommentsByNewsId(query.trim(), newsId, pageable);
    }

    // Get pending comments for moderation (should be very few now with auto-approval)
    public Page<NewsComment> getPendingComments(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return commentRepository.findByIsApprovedFalseAndIsDeletedFalseOrderByCreatedAtDesc(pageable);
    }

    // Get reported comments
    public Page<NewsComment> getReportedComments(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return commentRepository.findByIsReportedTrueAndIsDeletedFalseOrderByCreatedAtDesc(pageable);
    }

    // Get popular comments for a news article
    public List<NewsComment> getPopularComments(String newsId) {
        return commentRepository.findTop10ByNewsIdAndIsApprovedTrueAndIsDeletedFalseOrderByLikeCountDesc(newsId);
    }

    // Get recent comments across all news
    public List<NewsComment> getRecentComments() {
        return commentRepository.findTop10ByIsApprovedTrueAndIsDeletedFalseOrderByCreatedAtDesc();
    }

    // Get comments by user
    public Page<NewsComment> getCommentsByUser(String userEmail, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return commentRepository.findByAuthorEmailAndIsDeletedFalseOrderByCreatedAtDesc(userEmail, pageable);
    }

    // Get comment statistics
    public CommentStatistics getCommentStatistics() {
        CommentStatistics stats = new CommentStatistics();
        stats.setTotalComments(commentRepository.count());
        stats.setApprovedComments(commentRepository.countByStatus("APPROVED"));
        stats.setPendingComments(commentRepository.countByIsApprovedFalseAndIsDeletedFalse());
        stats.setReportedComments(commentRepository.countByIsReportedTrueAndIsDeletedFalse());
        return stats;
    }

    // Helper methods
    private void updateNewsCommentCount(String newsId) {
        long commentCount = commentRepository.countByNewsIdAndIsApprovedTrueAndIsDeletedFalse(newsId);
        newsService.updateCommentCount(newsId, (int) commentCount);
    }

    private void incrementReplyCount(String parentCommentId) {
        Optional<NewsComment> optionalComment = commentRepository.findById(parentCommentId);
        if (optionalComment.isPresent()) {
            NewsComment comment = optionalComment.get();
            comment.setReplyCount(comment.getReplyCount() + 1);
            commentRepository.save(comment);
        }
    }

    private void decrementReplyCount(String parentCommentId) {
        Optional<NewsComment> optionalComment = commentRepository.findById(parentCommentId);
        if (optionalComment.isPresent()) {
            NewsComment comment = optionalComment.get();
            comment.setReplyCount(Math.max(0, comment.getReplyCount() - 1));
            commentRepository.save(comment);
        }
    }

    private String getClientIpAddress(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }

        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }

        return request.getRemoteAddr();
    }

    // Inner class for statistics
    public static class CommentStatistics {
        private long totalComments;
        private long approvedComments;
        private long pendingComments;
        private long reportedComments;

        // Getters and setters
        public long getTotalComments() { return totalComments; }
        public void setTotalComments(long totalComments) { this.totalComments = totalComments; }

        public long getApprovedComments() { return approvedComments; }
        public void setApprovedComments(long approvedComments) { this.approvedComments = approvedComments; }

        public long getPendingComments() { return pendingComments; }
        public void setPendingComments(long pendingComments) { this.pendingComments = pendingComments; }

        public long getReportedComments() { return reportedComments; }
        public void setReportedComments(long reportedComments) { this.reportedComments = reportedComments; }
    }
}