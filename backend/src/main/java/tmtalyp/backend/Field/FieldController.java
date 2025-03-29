package tmtalyp.backend.Field;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/fields")
@CrossOrigin(origins = "*")
public class FieldController {


    private FieldService fieldService;
    @Autowired
    public FieldController(FieldService fieldService) {
        this.fieldService = fieldService;
    }

    @GetMapping
    public List<Field> getAllFields() {
        return fieldService.getAllFields();
    }

    @GetMapping("/faculty/{facultyId}")
    public List<Field> getFieldsByFacultyId(@PathVariable String facultyId) {
        return fieldService.getFieldsByFacultyId(facultyId);
    }

    @PostMapping(consumes = "multipart/form-data")
    public Field createField(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") double price,
            @RequestParam("discountPrice") double discountPrice,
            @RequestParam("facultyId") String facultyId,
            @RequestParam("languages") String languagesJson,
            @RequestParam(value = "image", required = false) MultipartFile image) throws Exception {

        if (facultyId == null || facultyId.isEmpty()) {
            throw new IllegalArgumentException("Faculty ID is required");
        }

        Field field = new Field();
        field.setName(name);
        field.setDescription(description);
        field.setPrice(price);
        field.setDiscountPrice(discountPrice);
        field.setFacultyId(facultyId);
        field.setLanguages(languagesJson);

        return fieldService.createField(field, image);
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public Field updateField(
            @PathVariable String id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") double price,
            @RequestParam("discountPrice") double discountPrice,
            @RequestParam("facultyId") String facultyId,
            @RequestParam("languages") String languagesJson,
            @RequestParam(value = "image", required = false) MultipartFile image) throws Exception {

        if (facultyId == null || facultyId.isEmpty()) {
            throw new IllegalArgumentException("Faculty ID is required");
        }

        Field updatedField = new Field();
        updatedField.setName(name);
        updatedField.setDescription(description);
        updatedField.setPrice(price);
        updatedField.setDiscountPrice(discountPrice);
        updatedField.setFacultyId(facultyId);
        updatedField.setLanguages(languagesJson);

        return fieldService.updateField(id, updatedField, image);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteField(@PathVariable String id) throws Exception {
        fieldService.deleteField(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public Field getFieldById(@PathVariable String id) throws Exception {
        return fieldService.getFieldById(id);
    }
}