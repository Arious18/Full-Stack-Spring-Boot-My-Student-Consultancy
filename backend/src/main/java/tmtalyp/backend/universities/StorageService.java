// Modify StorageService.java
package tmtalyp.backend.universities;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.util.UUID;

@Service
public class StorageService {

    private final S3Client s3Client;
    private final String bucketName = "my-data";
    private final String baseUrl = "https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/";

    @Autowired
    public StorageService(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    // Rest of your methods remain the same
    @Data
    @AllArgsConstructor
    public static class UploadResult {
        private String url;
        private String fileName;
    }

    public UploadResult uploadFile(MultipartFile file) throws Exception {
        String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .contentType(file.getContentType())
                .acl("public-read")
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

        String url = baseUrl + bucketName + "/" + fileName;
        return new UploadResult(url, fileName);
    }

    public void deleteFile(String fileName) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();

        s3Client.deleteObject(deleteObjectRequest);
    }
}