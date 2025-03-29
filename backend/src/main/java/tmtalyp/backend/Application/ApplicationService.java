package tmtalyp.backend.Application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tmtalyp.backend.universities.StorageService;


import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final StorageService storageService;
    private final String baseUrl = "https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/";
    @Autowired
    public ApplicationService(ApplicationRepository applicationRepository,
                              StorageService storageService) {
        this.applicationRepository = applicationRepository;
        this.storageService = storageService;
    }

    // Rest of your methods remain the same
    public Application saveApplication(Application application, MultipartFile file) throws Exception {
        if (file != null) {
            StorageService.UploadResult result = storageService.uploadFile(file);
            application.setFileUrl(baseUrl + "my-data/" + result.getFileName());
            application.setFileName(result.getFileName());
        }
        return applicationRepository.save(application);
    }

    public Application getApplicationById(String id) throws Exception {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new Exception("Application not found"));
    }

    public void deleteApplication(String id) throws Exception {
        Application application = getApplicationById(id);
        if (application.getFileName() != null) {
            storageService.deleteFile(application.getFileName());
        }
        applicationRepository.deleteById(id);
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }
}