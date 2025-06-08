package tmtalyp.backend.news;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import tmtalyp.backend.news.NewsService;

@Component
public class NewsScheduler {

    private final NewsService newsService;

    @Autowired
    public NewsScheduler(NewsService newsService) {
        this.newsService = newsService;
    }

    // Run every 5 minutes to check for scheduled news to publish
    @Scheduled(fixedRate = 300000) // 5 minutes in milliseconds
    public void publishScheduledNews() {
        try {
            newsService.publishScheduledNews();
        } catch (Exception e) {
            // Log error - you might want to use a proper logger here
            System.err.println("Error publishing scheduled news: " + e.getMessage());
        }
    }
}
