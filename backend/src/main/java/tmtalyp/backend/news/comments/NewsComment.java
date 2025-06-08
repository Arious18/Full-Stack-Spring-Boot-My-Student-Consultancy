package tmtalyp.backend.news.comments;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "news_comments")
public class NewsComment {
    @Id
    private String id;

    private String newsId;

    private String parentCommentId; // For nested replies

    private String authorName;

    private String authorEmail;

    private String authorAvatar;

    private String authorWebsite;

    private String content;

    // AUTO APPROVE BY DEFAULT
    private boolean isApproved = true;

    private boolean isDeleted = false;

    private boolean isEdited = false;

    private boolean isReported = false;

    private boolean isPinned = false;

    private int likeCount = 0;

    private int dislikeCount = 0;

    private int replyCount = 0;

    // DEFAULT STATUS IS APPROVED
    private String status = "APPROVED";

    private String ipAddress;

    private String userAgent;

    private String moderatorNote;

    // AUTO APPROVAL FIELDS
    private String moderatedBy = "AUTO_APPROVED";

    private LocalDateTime moderatedAt;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    private LocalDateTime editedAt;

    // Nested replies structure
    private List<NewsComment> replies;

    // Rating/voting
    private List<CommentVote> votes;

    // Moderation flags
    private List<CommentFlag> flags;

    @Data
    public static class CommentVote {
        private String userId;
        private String userEmail;
        private String voteType; // LIKE, DISLIKE
        private LocalDateTime votedAt;
        private String ipAddress;
    }

    @Data
    public static class CommentFlag {
        private String flaggedBy;
        private String reason; // SPAM, INAPPROPRIATE, OFFENSIVE, OTHER
        private String description;
        private LocalDateTime flaggedAt;
        private String status; // PENDING, RESOLVED, DISMISSED
    }
}