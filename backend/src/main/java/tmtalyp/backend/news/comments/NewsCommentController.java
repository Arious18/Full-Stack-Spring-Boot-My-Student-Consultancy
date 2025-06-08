package tmtalyp.backend.news.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/news/{newsId}/comments")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class NewsCommentController {

    private final NewsCommentService commentService;

    @Autowired
    public NewsCommentController(NewsCommentService commentService) {
        this.commentService = commentService;
    }

    // Create new comment - AUTO APPROVE
    @PostMapping
    public ResponseEntity<NewsComment> createComment(
            @PathVariable String newsId,
            @RequestParam("authorName") String authorName,
            @RequestParam("authorEmail") String authorEmail,
            @RequestParam("content") String content,
            @RequestParam(value = "authorWebsite", required = false) String authorWebsite,
            @RequestParam(value = "parentCommentId", required = false) String parentCommentId,
            HttpServletRequest request) throws Exception {

        NewsComment comment = new NewsComment();
        comment.setNewsId(newsId);
        comment.setAuthorName(authorName);
        comment.setAuthorEmail(authorEmail);
        comment.setContent(content);
        comment.setAuthorWebsite(authorWebsite);
        comment.setParentCommentId(parentCommentId);

        // The service will auto-approve this comment
        NewsComment createdComment = commentService.createComment(comment, request);
        return ResponseEntity.ok(createdComment);
    }

    // Update comment
    @PutMapping("/{commentId}")
    public ResponseEntity<NewsComment> updateComment(
            @PathVariable String newsId,
            @PathVariable String commentId,
            @RequestParam("content") String content,
            @RequestParam("userEmail") String userEmail) throws Exception {

        NewsComment updatedComment = commentService.updateComment(commentId, content, userEmail);
        return ResponseEntity.ok(updatedComment);
    }

    // Get comments for news article - Show approved comments by default
    @GetMapping
    public ResponseEntity<Page<NewsComment>> getCommentsByNewsId(
            @PathVariable String newsId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "true") boolean approvedOnly) {

        Page<NewsComment> comments = commentService.getCommentsByNewsId(newsId, page, size, approvedOnly);
        return ResponseEntity.ok(comments);
    }

    // Get ALL comments including unapproved ones (for admin)
    @GetMapping("/all")
    public ResponseEntity<Page<NewsComment>> getAllCommentsByNewsId(
            @PathVariable String newsId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<NewsComment> comments = commentService.getCommentsByNewsId(newsId, page, size, false);
        return ResponseEntity.ok(comments);
    }

    // Approve comment manually (for admin use)
    @PostMapping("/{commentId}/approve")
    public ResponseEntity<NewsComment> approveComment(
            @PathVariable String newsId,
            @PathVariable String commentId,
            @RequestParam("approvedBy") String approvedBy) throws Exception {

        NewsComment comment = commentService.getCommentById(commentId);
        comment.setApproved(true);
        comment.setModeratedAt(LocalDateTime.now());
        comment.setModeratedBy(approvedBy);

        NewsComment updatedComment = commentService.updateCommentApproval(comment);
        return ResponseEntity.ok(updatedComment);
    }

    // Disapprove comment (for admin use)
    @PostMapping("/{commentId}/disapprove")
    public ResponseEntity<NewsComment> disapproveComment(
            @PathVariable String newsId,
            @PathVariable String commentId,
            @RequestParam("disapprovedBy") String disapprovedBy) throws Exception {

        NewsComment comment = commentService.getCommentById(commentId);
        comment.setApproved(false);
        comment.setModeratedAt(LocalDateTime.now());
        comment.setModeratedBy(disapprovedBy);

        NewsComment updatedComment = commentService.updateCommentApproval(comment);
        return ResponseEntity.ok(updatedComment);
    }

    // Get replies for a comment
    @GetMapping("/{commentId}/replies")
    public ResponseEntity<List<NewsComment>> getRepliesByCommentId(
            @PathVariable String newsId,
            @PathVariable String commentId) {

        List<NewsComment> replies = commentService.getRepliesByCommentId(commentId);
        return ResponseEntity.ok(replies);
    }

    // Get comment by ID
    @GetMapping("/{commentId}")
    public ResponseEntity<NewsComment> getCommentById(
            @PathVariable String newsId,
            @PathVariable String commentId) throws Exception {

        NewsComment comment = commentService.getCommentById(commentId);
        return ResponseEntity.ok(comment);
    }

    // Delete comment - FIXED for admin functionality
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable String newsId,
            @PathVariable String commentId,
            @RequestParam(value = "userEmail", required = false) String userEmail,
            @RequestParam(value = "isAdmin", defaultValue = "false") boolean isAdmin,
            @RequestParam(value = "adminEmail", required = false) String adminEmail,
            HttpServletRequest request) throws Exception {

        try {
            String emailToUse;

            if (isAdmin) {
                // For admin deletion, try adminEmail first, then extract from JWT token
                if (adminEmail != null && !adminEmail.trim().isEmpty()) {
                    emailToUse = adminEmail;
                } else {
                    // Extract email from JWT token if adminEmail not provided
                    emailToUse = extractEmailFromRequest(request);
                    if (emailToUse == null) {
                        throw new IllegalArgumentException("Admin email is required for admin deletion. Please provide adminEmail parameter or ensure JWT token contains email.");
                    }
                }
            } else {
                // For regular user deletion
                if (userEmail == null || userEmail.trim().isEmpty()) {
                    throw new IllegalArgumentException("User email is required for user deletion");
                }
                emailToUse = userEmail;
            }

            System.out.println("Deleting comment with email: " + emailToUse + ", isAdmin: " + isAdmin);
            commentService.deleteComment(commentId, emailToUse, isAdmin);
            return ResponseEntity.noContent().build();

        } catch (Exception e) {
            // Log the error for debugging
            System.err.println("Error deleting comment: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    // Helper method to extract email from JWT token
    private String extractEmailFromRequest(HttpServletRequest request) {
        try {
            // Get the principal from Spring Security context
            org.springframework.security.core.Authentication authentication =
                    org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();

            if (authentication != null && authentication.getPrincipal() instanceof org.springframework.security.core.userdetails.UserDetails) {
                org.springframework.security.core.userdetails.UserDetails userDetails =
                        (org.springframework.security.core.userdetails.UserDetails) authentication.getPrincipal();
                return userDetails.getUsername(); // This should be the email
            }

            return null;
        } catch (Exception e) {
            System.err.println("Error extracting email from JWT: " + e.getMessage());
            return null;
        }
    }

    // Like comment
    @PostMapping("/{commentId}/like")
    public ResponseEntity<NewsComment> likeComment(
            @PathVariable String newsId,
            @PathVariable String commentId,
            @RequestParam("userEmail") String userEmail,
            HttpServletRequest request) throws Exception {

        String ipAddress = getClientIpAddress(request);
        NewsComment likedComment = commentService.likeComment(commentId, userEmail, ipAddress);
        return ResponseEntity.ok(likedComment);
    }

    // Report comment
    @PostMapping("/{commentId}/report")
    public ResponseEntity<NewsComment> reportComment(
            @PathVariable String newsId,
            @PathVariable String commentId,
            @RequestParam("reportedBy") String reportedBy,
            @RequestParam("reason") String reason,
            @RequestParam(value = "description", required = false) String description) throws Exception {

        NewsComment reportedComment = commentService.reportComment(commentId, reportedBy, reason, description);
        return ResponseEntity.ok(reportedComment);
    }

    // Search comments
    @GetMapping("/search")
    public ResponseEntity<Page<NewsComment>> searchComments(
            @PathVariable String newsId,
            @RequestParam("query") String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<NewsComment> comments = commentService.searchComments(newsId, query, page, size);
        return ResponseEntity.ok(comments);
    }

    // Get popular comments
    @GetMapping("/popular")
    public ResponseEntity<List<NewsComment>> getPopularComments(@PathVariable String newsId) {
        List<NewsComment> comments = commentService.getPopularComments(newsId);
        return ResponseEntity.ok(comments);
    }

    // Helper method to get client IP address
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
}