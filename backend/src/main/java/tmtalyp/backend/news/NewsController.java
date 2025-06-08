package tmtalyp.backend.news;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/news")
@CrossOrigin(origins = "http://localhost:5173")
public class NewsController {

    private final NewsService newsService;

    @Autowired
    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    // Create new news
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<News> createNews(
            @RequestParam("title") String title,
            @RequestParam("subtitle") String subtitle,
            @RequestParam("content") String content,
            @RequestParam("summary") String summary,
            @RequestParam("authorName") String authorName,
            @RequestParam("authorEmail") String authorEmail,
            @RequestParam("category") String category,
            @RequestParam(value = "tags", required = false) List<String> tags,
            @RequestParam(value = "imageCaption", required = false) String imageCaption,
            @RequestParam(value = "imageAlt", required = false) String imageAlt,
            @RequestParam(value = "status", defaultValue = "DRAFT") String status,
            @RequestParam(value = "priority", defaultValue = "MEDIUM") String priority,
            @RequestParam(value = "source", required = false) String source,
            @RequestParam(value = "sourceUrl", required = false) String sourceUrl,
            @RequestParam(value = "region", required = false) String region,
            @RequestParam(value = "country", required = false) String country,
            @RequestParam(value = "city", required = false) String city,
            @RequestParam(value = "isFeatured", defaultValue = "false") boolean isFeatured,
            @RequestParam(value = "isBreaking", defaultValue = "false") boolean isBreaking,
            @RequestParam(value = "metaTitle", required = false) String metaTitle,
            @RequestParam(value = "metaDescription", required = false) String metaDescription,
            @RequestParam(value = "metaKeywords", required = false) List<String> metaKeywords,
            @RequestParam(value = "socialTitle", required = false) String socialTitle,
            @RequestParam(value = "socialDescription", required = false) String socialDescription,
            @RequestParam(value = "scheduledAt", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime scheduledAt,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "socialImage", required = false) MultipartFile socialImage) throws Exception {

        News news = new News();
        news.setTitle(title);
        news.setSubtitle(subtitle);
        news.setContent(content);
        news.setSummary(summary);
        news.setAuthorName(authorName);
        news.setAuthorEmail(authorEmail);
        news.setCategory(category);
        news.setTags(tags);
        news.setImageCaption(imageCaption);
        news.setImageAlt(imageAlt);
        news.setStatus(status);
        news.setPriority(priority);
        news.setSource(source);
        news.setSourceUrl(sourceUrl);
        news.setRegion(region);
        news.setCountry(country);
        news.setCity(city);
        news.setFeatured(isFeatured);
        news.setBreaking(isBreaking);
        news.setMetaTitle(metaTitle);
        news.setMetaDescription(metaDescription);
        news.setMetaKeywords(metaKeywords);
        news.setSocialTitle(socialTitle);
        news.setSocialDescription(socialDescription);
        news.setScheduledAt(scheduledAt);

        News createdNews = newsService.createNews(news, image, socialImage);
        return ResponseEntity.ok(createdNews);
    }

    // Update existing news
    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<News> updateNews(
            @PathVariable String id,
            @RequestParam("title") String title,
            @RequestParam("subtitle") String subtitle,
            @RequestParam("content") String content,
            @RequestParam("summary") String summary,
            @RequestParam("authorName") String authorName,
            @RequestParam("authorEmail") String authorEmail,
            @RequestParam("category") String category,
            @RequestParam(value = "tags", required = false) List<String> tags,
            @RequestParam(value = "imageCaption", required = false) String imageCaption,
            @RequestParam(value = "imageAlt", required = false) String imageAlt,
            @RequestParam(value = "status", defaultValue = "DRAFT") String status,
            @RequestParam(value = "priority", defaultValue = "MEDIUM") String priority,
            @RequestParam(value = "source", required = false) String source,
            @RequestParam(value = "sourceUrl", required = false) String sourceUrl,
            @RequestParam(value = "region", required = false) String region,
            @RequestParam(value = "country", required = false) String country,
            @RequestParam(value = "city", required = false) String city,
            @RequestParam(value = "isFeatured", defaultValue = "false") boolean isFeatured,
            @RequestParam(value = "isBreaking", defaultValue = "false") boolean isBreaking,
            @RequestParam(value = "metaTitle", required = false) String metaTitle,
            @RequestParam(value = "metaDescription", required = false) String metaDescription,
            @RequestParam(value = "metaKeywords", required = false) List<String> metaKeywords,
            @RequestParam(value = "socialTitle", required = false) String socialTitle,
            @RequestParam(value = "socialDescription", required = false) String socialDescription,
            @RequestParam(value = "lastModifiedBy", required = false) String lastModifiedBy,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "socialImage", required = false) MultipartFile socialImage) throws Exception {

        News updatedNews = new News();
        updatedNews.setTitle(title);
        updatedNews.setSubtitle(subtitle);
        updatedNews.setContent(content);
        updatedNews.setSummary(summary);
        updatedNews.setAuthorName(authorName);
        updatedNews.setAuthorEmail(authorEmail);
        updatedNews.setCategory(category);
        updatedNews.setTags(tags);
        updatedNews.setImageCaption(imageCaption);
        updatedNews.setImageAlt(imageAlt);
        updatedNews.setStatus(status);
        updatedNews.setPriority(priority);
        updatedNews.setSource(source);
        updatedNews.setSourceUrl(sourceUrl);
        updatedNews.setRegion(region);
        updatedNews.setCountry(country);
        updatedNews.setCity(city);
        updatedNews.setFeatured(isFeatured);
        updatedNews.setBreaking(isBreaking);
        updatedNews.setMetaTitle(metaTitle);
        updatedNews.setMetaDescription(metaDescription);
        updatedNews.setMetaKeywords(metaKeywords);
        updatedNews.setSocialTitle(socialTitle);
        updatedNews.setSocialDescription(socialDescription);
        updatedNews.setLastModifiedBy(lastModifiedBy);

        News result = newsService.updateNews(id, updatedNews, image, socialImage);
        return ResponseEntity.ok(result);
    }

    // Get all news with pagination and sorting
    @GetMapping
    public ResponseEntity<Page<News>> getAllNews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        Page<News> news = newsService.getAllNews(page, size, sortBy, sortDir);
        return ResponseEntity.ok(news);
    }

    // Get published news with pagination
    @GetMapping("/published")
    public ResponseEntity<Page<News>> getPublishedNews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<News> news = newsService.getPublishedNews(page, size);
        return ResponseEntity.ok(news);
    }

    // Get news by category
    @GetMapping("/category/{category}")
    public ResponseEntity<Page<News>> getNewsByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<News> news = newsService.getNewsByCategory(category, page, size);
        return ResponseEntity.ok(news);
    }

    // Get news by ID
    @GetMapping("/{id}")
    public ResponseEntity<News> getNewsById(@PathVariable String id) throws Exception {
        News news = newsService.getNewsById(id);
        return ResponseEntity.ok(news);
    }

    // Get news by slug
    @GetMapping("/slug/{slug}")
    public ResponseEntity<News> getNewsBySlug(@PathVariable String slug) throws Exception {
        News news = newsService.getNewsBySlug(slug);
        return ResponseEntity.ok(news);
    }

    // Delete news
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable String id) throws Exception {
        newsService.deleteNews(id);
        return ResponseEntity.noContent().build();
    }

    // Search news
    @GetMapping("/search")
    public ResponseEntity<Page<News>> searchNews(
            @RequestParam("query") String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<News> news = newsService.searchNews(query, page, size);
        return ResponseEntity.ok(news);
    }

    // Advanced search with filters
    @GetMapping("/search/advanced")
    public ResponseEntity<Page<News>> advancedSearchNews(
            @RequestParam("query") String query,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "author", required = false) String author,
            @RequestParam(value = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(value = "endDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<News> news = newsService.searchNewsWithFilters(query, category, author, startDate, endDate, page, size);
        return ResponseEntity.ok(news);
    }

    // Get featured news
    @GetMapping("/featured")
    public ResponseEntity<List<News>> getFeaturedNews() {
        List<News> news = newsService.getFeaturedNews();
        return ResponseEntity.ok(news);
    }

    // Get breaking news
    @GetMapping("/breaking")
    public ResponseEntity<List<News>> getBreakingNews() {
        List<News> news = newsService.getBreakingNews();
        return ResponseEntity.ok(news);
    }

    // Get popular news
    @GetMapping("/popular")
    public ResponseEntity<List<News>> getPopularNews() {
        List<News> news = newsService.getPopularNews();
        return ResponseEntity.ok(news);
    }

    // Get recent news
    @GetMapping("/recent")
    public ResponseEntity<List<News>> getRecentNews() {
        List<News> news = newsService.getRecentNews();
        return ResponseEntity.ok(news);
    }

    // Get related news
    @GetMapping("/{id}/related")
    public ResponseEntity<List<News>> getRelatedNews(
            @PathVariable String id,
            @RequestParam(value = "tags", required = false) List<String> tags) {
        List<News> news = newsService.getRelatedNews(id, tags);
        return ResponseEntity.ok(news);
    }

    // Increment view count
    @PostMapping("/{id}/view")
    public ResponseEntity<Void> incrementViewCount(@PathVariable String id) {
        newsService.incrementViewCount(id);
        return ResponseEntity.ok().build();
    }

    // Increment like count
    @PostMapping("/{id}/like")
    public ResponseEntity<Void> incrementLikeCount(@PathVariable String id) {
        newsService.incrementLikeCount(id);
        return ResponseEntity.ok().build();
    }

    // Increment share count
    @PostMapping("/{id}/share")
    public ResponseEntity<Void> incrementShareCount(@PathVariable String id) {
        newsService.incrementShareCount(id);
        return ResponseEntity.ok().build();
    }

    // Get news statistics
    @GetMapping("/statistics")
    public ResponseEntity<NewsService.NewsStatistics> getNewsStatistics() {
        NewsService.NewsStatistics stats = newsService.getNewsStatistics();
        return ResponseEntity.ok(stats);
    }
}