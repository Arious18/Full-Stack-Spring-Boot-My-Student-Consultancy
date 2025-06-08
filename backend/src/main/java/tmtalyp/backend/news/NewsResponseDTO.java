
// DTO classes for API responses
package tmtalyp.backend.news;

import java.time.LocalDateTime;
import java.util.List;

public class NewsResponseDTO {
    private String id;
    private String title;
    private String subtitle;
    private String content;
    private String summary;
    private String authorName;
    private String category;
    private List<String> tags;
    private String imageUrl;
    private String slug;
    private boolean isPublished;
    private boolean isFeatured;
    private boolean isBreaking;
    private int viewCount;
    private int likeCount;
    private int shareCount;
    private int commentCount;
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructors, getters, and setters
    public NewsResponseDTO() {}

    // Getters and setters for all fields
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public boolean isPublished() { return isPublished; }
    public void setPublished(boolean published) { isPublished = published; }

    public boolean isFeatured() { return isFeatured; }
    public void setFeatured(boolean featured) { isFeatured = featured; }

    public boolean isBreaking() { return isBreaking; }
    public void setBreaking(boolean breaking) { isBreaking = breaking; }

    public int getViewCount() { return viewCount; }
    public void setViewCount(int viewCount) { this.viewCount = viewCount; }

    public int getLikeCount() { return likeCount; }
    public void setLikeCount(int likeCount) { this.likeCount = likeCount; }

    public int getShareCount() { return shareCount; }
    public void setShareCount(int shareCount) { this.shareCount = shareCount; }

    public int getCommentCount() { return commentCount; }
    public void setCommentCount(int commentCount) { this.commentCount = commentCount; }

    public LocalDateTime getPublishedAt() { return publishedAt; }
    public void setPublishedAt(LocalDateTime publishedAt) { this.publishedAt = publishedAt; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}