// Modify your AwsConfig.java to ensure there's only one S3Client bean
package tmtalyp.backend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

import java.net.URI;

@Configuration
public class AwsConfig {

    @Bean
    @Primary
    public S3Client s3Client() {
        return S3Client.builder()
                .endpointOverride(URI.create(" YOU CLOUDFLARE R2 DATABSE"))
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create("ACCESS KEY", "SECRET KEY ")))
                .region(Region.of("auto"))
                .build();
    }
}
