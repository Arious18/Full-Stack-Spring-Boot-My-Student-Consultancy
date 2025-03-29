package tmtalyp.backend.Search;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tmtalyp.backend.Faculty.Faculty;
import tmtalyp.backend.Field.Field;
import tmtalyp.backend.countries.Country;
import tmtalyp.backend.universities.University;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Configure as needed for production
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchAll(@RequestParam String query) {
        Map<String, Object> results = searchService.searchAll(query);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/universities")
    public ResponseEntity<List<University>> getAllUniversities() {
        List<University> universities = searchService.getAllUniversities();
        return ResponseEntity.ok(universities);
    }

    @GetMapping("/faculties")
    public ResponseEntity<List<Faculty>> getAllFaculties() {
        List<Faculty> faculties = searchService.getAllFaculties();
        return ResponseEntity.ok(faculties);
    }

    @GetMapping("/fields")
    public ResponseEntity<List<Field>> getAllFields() {
        List<Field> fields = searchService.getAllFields();
        return ResponseEntity.ok(fields);
    }

    @GetMapping("/countries")
    public ResponseEntity<List<Country>> getAllCountries() {
        List<Country> countries = searchService.getAllCountries();
        return ResponseEntity.ok(countries);
    }

    @GetMapping("/universities/search")
    public ResponseEntity<List<University>> searchUniversities(@RequestParam String query) {
        List<University> universities = searchService.searchUniversities(query);
        return ResponseEntity.ok(universities);
    }

    @GetMapping("/faculties/search")
    public ResponseEntity<List<Faculty>> searchFaculties(@RequestParam String query) {
        List<Faculty> faculties = searchService.searchFaculties(query);
        return ResponseEntity.ok(faculties);
    }

    @GetMapping("/fields/search")
    public ResponseEntity<List<Field>> searchFields(@RequestParam String query) {
        List<Field> fields = searchService.searchFields(query);
        return ResponseEntity.ok(fields);
    }

    @GetMapping("/countries/search")
    public ResponseEntity<List<Country>> searchCountries(@RequestParam String query) {
        List<Country> countries = searchService.searchCountries(query);
        return ResponseEntity.ok(countries);
    }
}