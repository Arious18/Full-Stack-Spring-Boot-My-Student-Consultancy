package tmtalyp.backend.news;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "news")
public class News {
    @Id
    private String id;

    private String title;
    private String subtitle;
    private String content;
    private String summary;

    private String authorName;
    private String authorEmail;
    private String category;
    private List<String> tags;

    private String imageUrl;
    private String imageFileName;
    private String imageCaption;
    private String imageAlt;

    private String socialImageUrl;
    private String socialTitle;
    private String socialDescription;

    private String slug;
    private String status; // DRAFT, PUBLISHED, ARCHIVED, SCHEDULED
    private String priority; // LOW, MEDIUM, HIGH, URGENT

    private boolean isPublished;
    private boolean isFeatured;
    private boolean isBreaking;

    private String source;
    private String sourceUrl;
    private String region;
    private String country;
    private String city;

    private int viewCount;
    private int likeCount;
    private int shareCount;
    private int commentCount;

    // SEO fields
    private String metaTitle;
    private String metaDescription;
    private List<String> metaKeywords;

    // Content sections for rich content
    private List<ContentSection> contentSections;

    // Related content
    private List<String> relatedLinks;
    private List<String> relatedNewsIds;

    // Scheduling
    private LocalDateTime scheduledAt;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    private LocalDateTime publishedAt;
    private String lastModifiedBy;

    @Data
    public static class ContentSection {
        private String type; // TEXT, IMAGE, VIDEO, QUOTE, CODE
        private String title;
        private String content;
        private String imageUrl;
        private String videoUrl;
        private int order;
    }
}