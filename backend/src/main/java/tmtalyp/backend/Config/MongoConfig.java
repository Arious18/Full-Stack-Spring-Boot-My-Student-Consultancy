package tmtalyp.backend.Config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {

    private static final Logger logger = LoggerFactory.getLogger(MongoConfig.class);

    @Value("${spring.data.mongodb.database:MyData}")
    private String databaseName;

    @Value("${spring.data.mongodb.uri:}")
    private String mongoUri;

    @Value("${spring.data.mongodb.host:localhost}")
    private String mongoHost;

    @Value("${spring.data.mongodb.port:27017}")
    private int mongoPort;

    @Override
    protected String getDatabaseName() {
        return databaseName;
    }

    @Override
    @Bean
    public MongoClient mongoClient() {
        try {
            MongoClientSettings.Builder builder = MongoClientSettings.builder();

            if (mongoUri != null && !mongoUri.trim().isEmpty()) {
                // Using MongoDB Atlas or custom URI
                logger.info("Connecting to MongoDB using URI: {}", mongoUri.replaceAll(":[^:]*@", ":****@"));
                builder.applyConnectionString(new ConnectionString(mongoUri));
            } else {
                // Using local MongoDB
                String connectionString = String.format("mongodb://%s:%d/%s", mongoHost, mongoPort, databaseName);
                logger.info("Connecting to local MongoDB: {}", connectionString);
                builder.applyConnectionString(new ConnectionString(connectionString));
            }

            MongoClient client = MongoClients.create(builder.build());

            // Test the connection
            try {
                client.getDatabase(databaseName).runCommand(new org.bson.Document("ping", 1));
                logger.info("Successfully connected to MongoDB database: {}", databaseName);
            } catch (Exception e) {
                logger.error("Failed to ping MongoDB database: {}", e.getMessage());
            }

            return client;
        } catch (Exception e) {
            logger.error("Failed to create MongoDB client: {}", e.getMessage(), e);
            throw new RuntimeException("MongoDB connection failed", e);
        }
    }

    @Bean
    public MongoTemplate mongoTemplate() throws Exception {
        return new MongoTemplate(mongoClient(), getDatabaseName());
    }
}