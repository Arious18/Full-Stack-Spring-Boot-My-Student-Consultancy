package tmtalyp.backend.news.comments;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Admin controller for comment moderation
@RestController
@RequestMapping("/admin/comments")
@CrossOrigin(origins = "*")
class NewsCommentAdminController {

    private final NewsCommentService commentService;

    @Autowired
    public NewsCommentAdminController(NewsCommentService commentService) {
        this.commentService = commentService;
    }

    // Approve comment
    @PostMapping("/{commentId}/approve")
    public ResponseEntity<NewsComment> approveComment(
            @PathVariable String commentId,
            @RequestParam("moderatorEmail") String moderatorEmail) throws Exception {

        NewsComment approvedComment = commentService.approveComment(commentId, moderatorEmail);
        return ResponseEntity.ok(approvedComment);
    }

    // Reject comment
    @PostMapping("/{commentId}/reject")
    public ResponseEntity<NewsComment> rejectComment(
            @PathVariable String commentId,
            @RequestParam("moderatorEmail") String moderatorEmail,
            @RequestParam(value = "reason", required = false) String reason) throws Exception {

        NewsComment rejectedComment = commentService.rejectComment(commentId, moderatorEmail, reason);
        return ResponseEntity.ok(rejectedComment);
    }

    // Admin delete comment - dedicated endpoint for admin deletion
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> adminDeleteComment(
            @PathVariable String commentId,
            @RequestParam("adminEmail") String adminEmail) throws Exception {

        try {
            // Force admin deletion
            commentService.deleteComment(commentId, adminEmail, true);
            return ResponseEntity.noContent().build();

        } catch (Exception e) {
            // Log the error for debugging
            System.err.println("Error in admin delete comment: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    // Pin/Unpin comment
    @PostMapping("/{commentId}/toggle-pin")
    public ResponseEntity<NewsComment> togglePinComment(
            @PathVariable String commentId,
            @RequestParam("moderatorEmail") String moderatorEmail) throws Exception {

        NewsComment pinnedComment = commentService.togglePinComment(commentId, moderatorEmail);
        return ResponseEntity.ok(pinnedComment);
    }

    // Get pending comments
    @GetMapping("/pending")
    public ResponseEntity<Page<NewsComment>> getPendingComments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<NewsComment> comments = commentService.getPendingComments(page, size);
        return ResponseEntity.ok(comments);
    }

    // Get reported comments
    @GetMapping("/reported")
    public ResponseEntity<Page<NewsComment>> getReportedComments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<NewsComment> comments = commentService.getReportedComments(page, size);
        return ResponseEntity.ok(comments);
    }

    // Get recent comments across all news
    @GetMapping("/recent")
    public ResponseEntity<List<NewsComment>> getRecentComments() {
        List<NewsComment> comments = commentService.getRecentComments();
        return ResponseEntity.ok(comments);
    }

    // Get comments by user
    @GetMapping("/user/{userEmail}")
    public ResponseEntity<Page<NewsComment>> getCommentsByUser(
            @PathVariable String userEmail,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<NewsComment> comments = commentService.getCommentsByUser(userEmail, page, size);
        return ResponseEntity.ok(comments);
    }

    // Get comment statistics
    @GetMapping("/statistics")
    public ResponseEntity<NewsCommentService.CommentStatistics> getCommentStatistics() {
        NewsCommentService.CommentStatistics stats = commentService.getCommentStatistics();
        return ResponseEntity.ok(stats);
    }

    // Bulk approve comments
    @PostMapping("/bulk-approve")
    public ResponseEntity<String> bulkApproveComments(
            @RequestParam("commentIds") List<String> commentIds,
            @RequestParam("moderatorEmail") String moderatorEmail) {

        try {
            for (String commentId : commentIds) {
                commentService.approveComment(commentId, moderatorEmail);
            }
            return ResponseEntity.ok("Successfully approved " + commentIds.size() + " comments");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error approving comments: " + e.getMessage());
        }
    }

    // Bulk delete comments
    @DeleteMapping("/bulk-delete")
    public ResponseEntity<String> bulkDeleteComments(
            @RequestParam("commentIds") List<String> commentIds,
            @RequestParam("adminEmail") String adminEmail) {

        try {
            for (String commentId : commentIds) {
                commentService.deleteComment(commentId, adminEmail, true);
            }
            return ResponseEntity.ok("Successfully deleted " + commentIds.size() + " comments");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting comments: " + e.getMessage());
        }
    }
}