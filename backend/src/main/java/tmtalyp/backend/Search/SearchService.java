package tmtalyp.backend.Search;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tmtalyp.backend.Faculty.Faculty;
import tmtalyp.backend.Faculty.FacultyRepository;
import tmtalyp.backend.Field.Field;
import tmtalyp.backend.Field.FieldRepository;
import tmtalyp.backend.countries.Country;
import tmtalyp.backend.countries.CountryRepository;
import tmtalyp.backend.universities.University;
import tmtalyp.backend.universities.UniversityRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Service
public class SearchService {

    @Autowired
    private UniversityRepository universityRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private CountryRepository countryRepository;

    public Map<String, Object> searchAll(String query) {
        Map<String, Object> results = new HashMap<>();

        // Using CompletableFuture for parallel execution
        CompletableFuture<List<University>> universitiesFuture = CompletableFuture.supplyAsync(() ->
                searchUniversities(query));

        CompletableFuture<List<Faculty>> facultiesFuture = CompletableFuture.supplyAsync(() ->
                searchFaculties(query));

        CompletableFuture<List<Field>> fieldsFuture = CompletableFuture.supplyAsync(() ->
                searchFields(query));

        CompletableFuture<List<Country>> countriesFuture = CompletableFuture.supplyAsync(() ->
                searchCountries(query));

        // Wait for all searches to complete
        CompletableFuture.allOf(
                universitiesFuture,
                facultiesFuture,
                fieldsFuture,
                countriesFuture
        ).join();

        // Get results
        results.put("universities", universitiesFuture.join());
        results.put("faculties", facultiesFuture.join());
        results.put("fields", fieldsFuture.join());
        results.put("countries", countriesFuture.join());

        return results;
    }

    public List<University> getAllUniversities() {
        return universityRepository.findAll();
    }

    public List<Faculty> getAllFaculties() {
        return facultyRepository.findAll();
    }

    public List<Field> getAllFields() {
        return fieldRepository.findAll();
    }

    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    public List<University> searchUniversities(String query) {
        if (query == null || query.isEmpty()) {
            return universityRepository.findAll();
        }
        return universityRepository.search(query);
    }

    public List<Faculty> searchFaculties(String query) {
        if (query == null || query.isEmpty()) {
            return facultyRepository.findAll();
        }
        return facultyRepository.search(query);
    }

    public List<Field> searchFields(String query) {
        if (query == null || query.isEmpty()) {
            return fieldRepository.findAll();
        }
        return fieldRepository.search(query);
    }

    public List<Country> searchCountries(String query) {
        if (query == null || query.isEmpty()) {
            return countryRepository.findAll();
        }
        return countryRepository.search(query);
    }
}