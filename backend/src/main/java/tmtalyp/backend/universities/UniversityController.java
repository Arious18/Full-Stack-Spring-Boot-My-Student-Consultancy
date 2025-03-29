package tmtalyp.backend.universities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/universities")
@CrossOrigin(origins = "*")
public class UniversityController {


    private UniversityService universityService;
    @Autowired
    public UniversityController(UniversityService universityService) {
        this.universityService = universityService;
    }

    @GetMapping
    public List<University> getAllUniversities() {
        return universityService.getAllUniversities();
    }

    @PostMapping(consumes = "multipart/form-data")
    public University createUniversity(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("about") String about,
            @RequestParam("yearlyPrice") double yearlyPrice,
            @RequestParam(value = "image", required = false) MultipartFile image) throws Exception {
        University university = new University();
        university.setName(name);
        university.setDescription(description);
        university.setAbout(about);
        university.setYearlyPrice(yearlyPrice); // This will map to "price" in frontend
        return universityService.createUniversity(university, image);
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public University updateUniversity(
            @PathVariable String id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("about") String about,
            @RequestParam("yearlyPrice") double yearlyPrice,
            @RequestParam(value = "image", required = false) MultipartFile image) throws Exception {
        University updatedUniversity = new University();
        updatedUniversity.setName(name);
        updatedUniversity.setDescription(description);
        updatedUniversity.setAbout(about);
        updatedUniversity.setYearlyPrice(yearlyPrice);
        return universityService.updateUniversity(id, updatedUniversity, image);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUniversity(@PathVariable String id) throws Exception {
        universityService.deleteUniversity(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public University getUniversityById(@PathVariable String id) throws Exception {
        return universityService.getUniversityById(id);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<String> getUniversityImageUrl(@PathVariable String id) throws Exception {
        University university = universityService.getUniversityById(id);
        return ResponseEntity.ok(university.getImageUrl());
    }
    @GetMapping("/by-country/{countryId}")
    public List<University> getUniversitiesByCountry(@PathVariable String countryId) {
        return universityService.getUniversitiesByCountryId(countryId);
    }
}