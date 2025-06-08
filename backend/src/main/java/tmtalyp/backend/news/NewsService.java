package tmtalyp.backend.news;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tmtalyp.backend.universities.StorageService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.ArrayList;
import java.util.stream.Collectors;

@Service
public class NewsService {

    private final NewsRepository newsRepository;
    private final StorageService storageService;
    private final String baseUrl = "https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/";

    @Autowired
    public NewsService(NewsRepository newsRepository, StorageService storageService) {
        this.newsRepository = newsRepository;
        this.storageService = storageService;
    }

    // Create new news
    public News createNews(News news, MultipartFile image, MultipartFile socialImage) throws Exception {
        // Generate slug from title
        news.setSlug(generateSlug(news.getTitle()));

        // Handle main image upload
        if (image != null && !image.isEmpty()) {
            StorageService.UploadResult result = storageService.uploadFile(image);
            news.setImageUrl(baseUrl + "my-data/" + result.getFileName());
            news.setImageFileName(result.getFileName());
        }

        // Handle social media image upload
        if (socialImage != null && !socialImage.isEmpty()) {
            StorageService.UploadResult socialResult = storageService.uploadFile(socialImage);
            news.setSocialImageUrl(baseUrl + "my-data/" + socialResult.getFileName());
        }

        // Set default values
        news.setCreatedAt(LocalDateTime.now());
        news.setUpdatedAt(LocalDateTime.now());
        news.setViewCount(0);
        news.setLikeCount(0);
        news.setShareCount(0);
        news.setCommentCount(0);

        if (news.getStatus() == null) {
            news.setStatus("DRAFT");
        }

        if (news.getPriority() == null) {
            news.setPriority("MEDIUM");
        }

        // Set published date if status is PUBLISHED
        if ("PUBLISHED".equals(news.getStatus()) && news.getPublishedAt() == null) {
            news.setPublishedAt(LocalDateTime.now());
            news.setPublished(true);
        }

        return newsRepository.save(news);
    }

    // Update existing news
    public News updateNews(String id, News updatedNews, MultipartFile image, MultipartFile socialImage) throws Exception {
        Optional<News> optionalNews = newsRepository.findById(id);
        if (optionalNews.isEmpty()) {
            throw new Exception("News not found with id: " + id);
        }

        News news = optionalNews.get();

        // Update basic fields
        news.setTitle(updatedNews.getTitle());
        news.setSubtitle(updatedNews.getSubtitle());
        news.setContent(updatedNews.getContent());
        news.setSummary(updatedNews.getSummary());
        news.setAuthorName(updatedNews.getAuthorName());
        news.setAuthorEmail(updatedNews.getAuthorEmail());
        news.setCategory(updatedNews.getCategory());
        news.setTags(updatedNews.getTags());
        news.setImageCaption(updatedNews.getImageCaption());
        news.setImageAlt(updatedNews.getImageAlt());
        news.setStatus(updatedNews.getStatus());
        news.setPriority(updatedNews.getPriority());
        news.setSource(updatedNews.getSource());
        news.setSourceUrl(updatedNews.getSourceUrl());
        news.setRegion(updatedNews.getRegion());
        news.setCountry(updatedNews.getCountry());
        news.setCity(updatedNews.getCity());
        news.setContentSections(updatedNews.getContentSections());
        news.setRelatedLinks(updatedNews.getRelatedLinks());
        news.setRelatedNewsIds(updatedNews.getRelatedNewsIds());

        // Update SEO fields
        news.setMetaTitle(updatedNews.getMetaTitle());
        news.setMetaDescription(updatedNews.getMetaDescription());
        news.setMetaKeywords(updatedNews.getMetaKeywords());

        // Update social media fields
        news.setSocialTitle(updatedNews.getSocialTitle());
        news.setSocialDescription(updatedNews.getSocialDescription());

        // Update boolean flags
        news.setFeatured(updatedNews.isFeatured());
        news.setBreaking(updatedNews.isBreaking());

        // Handle slug update if title changed
        if (!news.getTitle().equals(updatedNews.getTitle())) {
            news.setSlug(generateSlug(updatedNews.getTitle()));
        }

        // Handle main image update
        if (image != null && !image.isEmpty()) {
            // Delete old image if exists
            if (news.getImageFileName() != null) {
                storageService.deleteFile(news.getImageFileName());
            }
            StorageService.UploadResult result = storageService.uploadFile(image);
            news.setImageUrl(baseUrl + "my-data/" + result.getFileName());
            news.setImageFileName(result.getFileName());
        }

        // Handle social image update
        if (socialImage != null && !socialImage.isEmpty()) {
            StorageService.UploadResult socialResult = storageService.uploadFile(socialImage);
            news.setSocialImageUrl(baseUrl + "my-data/" + socialResult.getFileName());
        }

        // Update timestamps
        news.setUpdatedAt(LocalDateTime.now());
        news.setLastModifiedBy(updatedNews.getLastModifiedBy());

        // Handle publication status
        if ("PUBLISHED".equals(updatedNews.getStatus()) && !news.isPublished()) {
            news.setPublished(true);
            news.setPublishedAt(LocalDateTime.now());
        } else if (!"PUBLISHED".equals(updatedNews.getStatus()) && news.isPublished()) {
            news.setPublished(false);
        }

        return newsRepository.save(news);
    }

    // Get all news with pagination
    public Page<News> getAllNews(int page, int size, String sortBy, String sortDir) {
        Sort sort = Sort.by(Sort.Direction.fromString(sortDir), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        return newsRepository.findAll(pageable);
    }

    // Get published news with pagination
    public Page<News> getPublishedNews(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return newsRepository.findByIsPublishedTrueOrderByPublishedAtDesc(pageable);
    }

    // Get news by category
    public Page<News> getNewsByCategory(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return newsRepository.findByIsPublishedTrueAndCategoryOrderByPublishedAtDesc(category, pageable);
    }

    // Get news by ID
    public News getNewsById(String id) throws Exception {
        Optional<News> optionalNews = newsRepository.findById(id);
        if (optionalNews.isEmpty()) {
            throw new Exception("News not found with id: " + id);
        }
        return optionalNews.get();
    }

    // Get news by slug
    public News getNewsBySlug(String slug) throws Exception {
        Optional<News> optionalNews = newsRepository.findBySlug(slug);
        if (optionalNews.isEmpty()) {
            throw new Exception("News not found with slug: " + slug);
        }

        // Increment view count
        News news = optionalNews.get();
        news.setViewCount(news.getViewCount() + 1);
        newsRepository.save(news);

        return news;
    }

    // Delete news
    public void deleteNews(String id) throws Exception {
        Optional<News> optionalNews = newsRepository.findById(id);
        if (optionalNews.isEmpty()) {
            throw new Exception("News not found with id: " + id);
        }

        News news = optionalNews.get();

        // Delete associated image files
        if (news.getImageFileName() != null) {
            storageService.deleteFile(news.getImageFileName());
        }

        newsRepository.deleteById(id);
    }

    // Search news
    public Page<News> searchNews(String query, int page, int size) {
        if (query == null || query.trim().isEmpty()) {
            return getPublishedNews(page, size);
        }

        Pageable pageable = PageRequest.of(page, size);
        return newsRepository.searchPublishedNews(query.trim(), pageable);
    }

    // Advanced search with filters
    public Page<News> searchNewsWithFilters(String query, String category, String author,
                                            LocalDateTime startDate, LocalDateTime endDate,
                                            int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        if (category != null && !category.trim().isEmpty()) {
            return newsRepository.searchPublishedNewsByCategory(query, category, pageable);
        }

        return searchNews(query, page, size);
    }

    // Get featured news
    public List<News> getFeaturedNews() {
        return newsRepository.findByIsPublishedTrueAndIsFeaturedTrueOrderByPublishedAtDesc();
    }

    // Get breaking news
    public List<News> getBreakingNews() {
        return newsRepository.findByIsPublishedTrueAndIsBreakingTrueOrderByPublishedAtDesc();
    }

    // Get popular news
    public List<News> getPopularNews() {
        return newsRepository.findTop10ByIsPublishedTrueOrderByViewCountDesc();
    }

    // Get recent news
    public List<News> getRecentNews() {
        return newsRepository.findTop20ByIsPublishedTrueOrderByPublishedAtDesc();
    }

    // Get related news
    public List<News> getRelatedNews(String newsId, List<String> tags) {
        if (tags == null || tags.isEmpty()) {
            return new ArrayList<>();
        }
        return newsRepository.findRelatedNewsByTags(tags, newsId);
    }

    // Update view count
    public void incrementViewCount(String newsId) {
        Optional<News> optionalNews = newsRepository.findById(newsId);
        if (optionalNews.isPresent()) {
            News news = optionalNews.get();
            news.setViewCount(news.getViewCount() + 1);
            newsRepository.save(news);
        }
    }

    // Update like count
    public void incrementLikeCount(String newsId) {
        Optional<News> optionalNews = newsRepository.findById(newsId);
        if (optionalNews.isPresent()) {
            News news = optionalNews.get();
            news.setLikeCount(news.getLikeCount() + 1);
            newsRepository.save(news);
        }
    }

    // Update share count
    public void incrementShareCount(String newsId) {
        Optional<News> optionalNews = newsRepository.findById(newsId);
        if (optionalNews.isPresent()) {
            News news = optionalNews.get();
            news.setShareCount(news.getShareCount() + 1);
            newsRepository.save(news);
        }
    }

    // Update comment count
    public void updateCommentCount(String newsId, int commentCount) {
        Optional<News> optionalNews = newsRepository.findById(newsId);
        if (optionalNews.isPresent()) {
            News news = optionalNews.get();
            news.setCommentCount(commentCount);
            newsRepository.save(news);
        }
    }

    // Publish scheduled news
    public void publishScheduledNews() {
        List<News> scheduledNews = newsRepository.findByStatusAndScheduledAtLessThanEqual("SCHEDULED", LocalDateTime.now());
        for (News news : scheduledNews) {
            news.setStatus("PUBLISHED");
            news.setPublished(true);
            news.setPublishedAt(LocalDateTime.now());
            newsRepository.save(news);
        }
    }

    // Get news statistics
    public NewsStatistics getNewsStatistics() {
        NewsStatistics stats = new NewsStatistics();
        stats.setTotalNews(newsRepository.count());
        stats.setPublishedNews(newsRepository.countByIsPublishedTrue());
        stats.setDraftNews(newsRepository.countByStatus("DRAFT"));
        stats.setArchivedNews(newsRepository.countByStatus("ARCHIVED"));
        return stats;
    }

    // Generate unique slug from title
    private String generateSlug(String title) {
        if (title == null || title.trim().isEmpty()) {
            return UUID.randomUUID().toString();
        }

        String slug = title.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");

        // Check if slug already exists
        Optional<News> existingNews = newsRepository.findBySlug(slug);
        if (existingNews.isPresent()) {
            slug = slug + "-" + System.currentTimeMillis();
        }

        return slug;
    }

    // Inner class for statistics
    public static class NewsStatistics {
        private long totalNews;
        private long publishedNews;
        private long draftNews;
        private long archivedNews;

        // Getters and setters
        public long getTotalNews() { return totalNews; }
        public void setTotalNews(long totalNews) { this.totalNews = totalNews; }

        public long getPublishedNews() { return publishedNews; }
        public void setPublishedNews(long publishedNews) { this.publishedNews = publishedNews; }

        public long getDraftNews() { return draftNews; }
        public void setDraftNews(long draftNews) { this.draftNews = draftNews; }

        public long getArchivedNews() { return archivedNews; }
        public void setArchivedNews(long archivedNews) { this.archivedNews = archivedNews; }
    }
}