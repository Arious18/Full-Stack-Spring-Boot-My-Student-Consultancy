package tmtalyp.backend.countries;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tmtalyp.backend.universities.University;

import java.util.List;

@RestController
@RequestMapping("/countries")
@CrossOrigin(origins = "*")
public class CountryController {

    private final CountryService countryService;

    @Autowired
    public CountryController(CountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping
    public List<Country> getAllCountries() {
        return countryService.getAllCountries();
    }

    @PostMapping(consumes = "multipart/form-data")
    public Country createCountry(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image) throws Exception {
        Country country = new Country();
        country.setName(name);
        country.setDescription(description);
        return countryService.createCountry(country, image);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCountry(@PathVariable String id) throws Exception {
        countryService.deleteCountry(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/universities")
    public List<University> getUniversitiesByCountry(@PathVariable String id) {
        return countryService.getUniversitiesByCountryId(id);
    }
}