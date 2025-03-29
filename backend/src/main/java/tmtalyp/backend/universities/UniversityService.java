package tmtalyp.backend.universities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UniversityService {

    private final UniversityRepository universityRepository;
    private final StorageService storageService;
    private final S3Client s3Client;
    private final String baseUrl = "https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/";

@Autowired
    public UniversityService(UniversityRepository universityRepository,
                             StorageService storageService,
                             S3Client s3Client) {
        this.universityRepository = universityRepository;
        this.storageService = storageService;
        this.s3Client = s3Client;
    }

    public List<University> getAllUniversities() {
        return universityRepository.findAll();
    }

    public University createUniversity(University university, MultipartFile image) throws Exception {
        if (image != null) {
            StorageService.UploadResult result = storageService.uploadFile(image);
            // Update the URL to use the new base URL
            university.setImageUrl(baseUrl + "my-data/" + result.getFileName());
            university.setImageFileName(result.getFileName());
        }
        return universityRepository.save(university);
    }

    public University updateUniversity(String id, University updatedUniversity, MultipartFile image) throws Exception {
        Optional<University> optionalUniversity = universityRepository.findById(id);
        if (optionalUniversity.isPresent()) {
            University university = optionalUniversity.get();
            university.setName(updatedUniversity.getName());
            university.setDescription(updatedUniversity.getDescription());
            university.setAbout(updatedUniversity.getAbout());
            university.setYearlyPrice(updatedUniversity.getYearlyPrice());



            if (image != null) {
                if (university.getImageFileName() != null) {
                    storageService.deleteFile(university.getImageFileName());
                }
                StorageService.UploadResult result = storageService.uploadFile(image);
                // Update the URL to use the new base URL
                university.setImageUrl(baseUrl + "my-data/" + result.getFileName());
                university.setImageFileName(result.getFileName());
            }
            return universityRepository.save(university);
        } else {
            throw new Exception("University not found");
        }
    }

    public void deleteUniversity(String id) throws Exception {
        Optional<University> optionalUniversity = universityRepository.findById(id);
        if (optionalUniversity.isPresent()) {
            University university = optionalUniversity.get();
            if (university.getImageFileName() != null) {
                storageService.deleteFile(university.getImageFileName());
            }
            universityRepository.deleteById(id);
        } else {
            throw new Exception("University not found");
        }
    }


    public String uploadImageToR2(MultipartFile file) throws Exception {
        String bucketName = "my-data";
        String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .acl("public-read")
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

        // Return the new URL format
        return baseUrl + bucketName + "/" + fileName;
    }

    public University getUniversityById(String id) throws Exception {
        Optional<University> optionalUniversity = universityRepository.findById(id);
        if (optionalUniversity.isPresent()) {
            return optionalUniversity.get();
        } else {
            throw new Exception("University not found");
        }
    }
    public List<University> getUniversitiesByCountryId(String countryId) {
        return universityRepository.findByCountryId(countryId);
    }
}