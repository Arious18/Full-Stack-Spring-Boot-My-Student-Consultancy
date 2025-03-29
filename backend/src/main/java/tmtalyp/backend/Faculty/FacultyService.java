package tmtalyp.backend.Faculty;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tmtalyp.backend.universities.StorageService;

import java.util.List;
import java.util.Optional;

@Service
public class FacultyService {


    private FacultyRepository facultyRepository;


    private StorageService storageService;

    @Autowired
    public FacultyService(FacultyRepository facultyRepository, StorageService storageService) {
        this.facultyRepository = facultyRepository;
        this.storageService = storageService;
    }
    private final String baseUrl = "https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/";

    public List<Faculty> getAllFaculties() {
        return facultyRepository.findAll();
    }

    public List<Faculty> getFacultiesByUniversityId(String universityId) {
        return facultyRepository.findByUniversityId(universityId);
    }

    public Faculty createFaculty(Faculty faculty, MultipartFile image) throws Exception {
        if (faculty.getUniversityId() == null || faculty.getUniversityId().isEmpty()) {
            throw new IllegalArgumentException("University ID is required");
        }
        if (image != null) {
            StorageService.UploadResult result = storageService.uploadFile(image);
            faculty.setImageUrl(baseUrl + "my-data/" + result.getFileName());
            faculty.setImageFileName(result.getFileName());
        }
        return facultyRepository.save(faculty);
    }

    public Faculty updateFaculty(String id, Faculty updatedFaculty, MultipartFile image) throws Exception {
        Optional<Faculty> optionalFaculty = facultyRepository.findById(id);
        if (optionalFaculty.isPresent()) {
            Faculty faculty = optionalFaculty.get();
            faculty.setName(updatedFaculty.getName());
            faculty.setDescription(updatedFaculty.getDescription());
            faculty.setPrice(updatedFaculty.getPrice());
            faculty.setDiscountPrice(updatedFaculty.getDiscountPrice());
            faculty.setLanguages(updatedFaculty.getLanguages());
            faculty.setUniversityId(updatedFaculty.getUniversityId());

            if (image != null) {
                if (faculty.getImageFileName() != null) {
                    storageService.deleteFile(faculty.getImageFileName());
                }
                StorageService.UploadResult result = storageService.uploadFile(image);
                faculty.setImageUrl(baseUrl + "my-data/" + result.getFileName());
                faculty.setImageFileName(result.getFileName());
            }
            return facultyRepository.save(faculty);
        } else {
            throw new Exception("Faculty not found");
        }
    }

    public void deleteFaculty(String id) throws Exception {
        Optional<Faculty> optionalFaculty = facultyRepository.findById(id);
        if (optionalFaculty.isPresent()) {
            Faculty faculty = optionalFaculty.get();
            if (faculty.getImageFileName() != null) {
                storageService.deleteFile(faculty.getImageFileName());
            }
            facultyRepository.deleteById(id);
        } else {
            throw new Exception("Faculty not found");
        }
    }

    public Faculty getFacultyById(String id) throws Exception {
        Optional<Faculty> optionalFaculty = facultyRepository.findById(id);
        if (optionalFaculty.isPresent()) {
            return optionalFaculty.get();
        } else {
            throw new Exception("Faculty not found");
        }
    }
}