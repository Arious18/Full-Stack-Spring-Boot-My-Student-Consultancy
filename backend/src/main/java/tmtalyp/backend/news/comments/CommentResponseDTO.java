package tmtalyp.backend.news.comments;

import java.time.LocalDateTime;
import java.util.List;

public class CommentResponseDTO {
    private String id;
    private String newsId;
    private String parentCommentId;
    private String authorName;
    private String content;
    private boolean isApproved;
    private boolean isPinned;
    private int likeCount;
    private int replyCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<CommentResponseDTO> replies;

    // Constructors
    public CommentResponseDTO() {}

    // Getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNewsId() { return newsId; }
    public void setNewsId(String newsId) { this.newsId = newsId; }

    public String getParentCommentId() { return parentCommentId; }
    public void setParentCommentId(String parentCommentId) { this.parentCommentId = parentCommentId; }

    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public boolean isApproved() { return isApproved; }
    public void setApproved(boolean approved) { isApproved = approved; }

    public boolean isPinned() { return isPinned; }
    public void setPinned(boolean pinned) { isPinned = pinned; }

    public int getLikeCount() { return likeCount; }
    public void setLikeCount(int likeCount) { this.likeCount = likeCount; }

    public int getReplyCount() { return replyCount; }
    public void setReplyCount(int replyCount) { this.replyCount = replyCount; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public List<CommentResponseDTO> getReplies() { return replies; }
    public void setReplies(List<CommentResponseDTO> replies) { this.replies = replies; }
}