package tmtalyp.backend.news;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
public class NewsConfig extends AbstractMongoClientConfiguration {

    @Override
    protected String getDatabaseName() {
        return "newsdb";
    }
}