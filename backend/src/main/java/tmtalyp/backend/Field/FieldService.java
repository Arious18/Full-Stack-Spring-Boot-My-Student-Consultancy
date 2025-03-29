package tmtalyp.backend.Field;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tmtalyp.backend.universities.StorageService;

import java.util.List;
import java.util.Optional;

@Service
public class FieldService {

    private final FieldRepository fieldRepository;
    private final StorageService storageService;
    private final String baseUrl = "https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/";
@Autowired
    public FieldService(FieldRepository fieldRepository,
                        StorageService storageService) {
        this.fieldRepository = fieldRepository;
        this.storageService = storageService;
    }
    public List<Field> getAllFields() {
        return fieldRepository.findAll();
    }

    public List<Field> getFieldsByFacultyId(String facultyId) {
        return fieldRepository.findByFacultyId(facultyId);
    }

    public Field createField(Field field, MultipartFile image) throws Exception {
        if (field.getFacultyId() == null || field.getFacultyId().isEmpty()) {
            throw new IllegalArgumentException("Faculty ID is required");
        }
        if (image != null) {
            StorageService.UploadResult result = storageService.uploadFile(image);
            field.setImageUrl(baseUrl + "my-data/" + result.getFileName());
            field.setImageFileName(result.getFileName());
        }
        return fieldRepository.save(field);
    }

    public Field updateField(String id, Field updatedField, MultipartFile image) throws Exception {
        Optional<Field> optionalField = fieldRepository.findById(id);
        if (optionalField.isPresent()) {
            Field field = optionalField.get();
            field.setName(updatedField.getName());
            field.setDescription(updatedField.getDescription());
            field.setPrice(updatedField.getPrice());
            field.setDiscountPrice(updatedField.getDiscountPrice());
            field.setLanguages(updatedField.getLanguages());
            field.setFacultyId(updatedField.getFacultyId());

            if (image != null) {
                if (field.getImageFileName() != null) {
                    storageService.deleteFile(field.getImageFileName());
                }
                StorageService.UploadResult result = storageService.uploadFile(image);
                field.setImageUrl(baseUrl + "my-data/" + result.getFileName());
                field.setImageFileName(result.getFileName());
            }
            return fieldRepository.save(field);
        } else {
            throw new Exception("Field not found");
        }
    }

    public void deleteField(String id) throws Exception {
        Optional<Field> optionalField = fieldRepository.findById(id);
        if (optionalField.isPresent()) {
            Field field = optionalField.get();
            if (field.getImageFileName() != null) {
                storageService.deleteFile(field.getImageFileName());
            }
            fieldRepository.deleteById(id);
        } else {
            throw new Exception("Field not found");
        }
    }

    public Field getFieldById(String id) throws Exception {
        Optional<Field> optionalField = fieldRepository.findById(id);
        if (optionalField.isPresent()) {
            return optionalField.get();
        } else {
            throw new Exception("Field not found");
        }
    }
}