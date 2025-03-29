package tmtalyp.backend.Faculty;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/faculties")
@CrossOrigin(origins = "http://localhost:5173")
public class FacultyController {


    private FacultyService facultyService;
    @Autowired
    public FacultyController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    @GetMapping
    public List<Faculty> getAllFaculties() {
        return facultyService.getAllFaculties();
    }

    @GetMapping("/university/{universityId}")
    public List<Faculty> getFacultiesByUniversityId(@PathVariable String universityId) {
        return facultyService.getFacultiesByUniversityId(universityId);
    }

    @PostMapping(consumes = "multipart/form-data")
    public Faculty createFaculty(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") double price,
            @RequestParam("discountPrice") double discountPrice,
            @RequestParam("universityId") String universityId,
            @RequestParam("languages") String languagesJson,
            @RequestParam(value = "image", required = false) MultipartFile image) throws Exception {

        if (universityId == null || universityId.isEmpty()) {
            throw new IllegalArgumentException("University ID is required");
        }

        Faculty faculty = new Faculty();
        faculty.setName(name);
        faculty.setDescription(description);
        faculty.setPrice(price);
        faculty.setDiscountPrice(discountPrice);
        faculty.setUniversityId(universityId);
        faculty.setLanguages(languagesJson); // Assuming this is a JSON string; adjust parsing if needed

        return facultyService.createFaculty(faculty, image);
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public Faculty updateFaculty(
            @PathVariable String id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") double price,
            @RequestParam("discountPrice") double discountPrice,
            @RequestParam("universityId") String universityId,
            @RequestParam("languages") String languagesJson,
            @RequestParam(value = "image", required = false) MultipartFile image) throws Exception {

        if (universityId == null || universityId.isEmpty()) {
            throw new IllegalArgumentException("University ID is required");
        }

        Faculty updatedFaculty = new Faculty();
        updatedFaculty.setName(name);
        updatedFaculty.setDescription(description);
        updatedFaculty.setPrice(price);
        updatedFaculty.setDiscountPrice(discountPrice);
        updatedFaculty.setUniversityId(universityId);
        updatedFaculty.setLanguages(languagesJson); // Adjust parsing if needed

        return facultyService.updateFaculty(id, updatedFaculty, image);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFaculty(@PathVariable String id) throws Exception {
        facultyService.deleteFaculty(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public Faculty getFacultyById(@PathVariable String id) throws Exception {
        return facultyService.getFacultyById(id);
    }
}