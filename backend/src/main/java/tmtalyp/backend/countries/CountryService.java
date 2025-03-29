package tmtalyp.backend.countries;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tmtalyp.backend.universities.StorageService;
import tmtalyp.backend.universities.University;
import tmtalyp.backend.universities.UniversityService;

import java.util.List;
import java.util.Optional;

@Service
public class CountryService {

    private final CountryRepository countryRepository;
    private final UniversityService universityService;
    private final StorageService storageService;

    @Autowired
    public CountryService(CountryRepository countryRepository,
                          UniversityService universityService,
                          StorageService storageService) {
        this.countryRepository = countryRepository;
        this.universityService = universityService;
        this.storageService = storageService;
    }

    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    public Country createCountry(Country country, MultipartFile image) throws Exception {
        if (image != null) {
            StorageService.UploadResult result = storageService.uploadFile(image);
            country.setImageUrl(result.getUrl());
            country.setImageFileName(result.getFileName());
        }
        return countryRepository.save(country);
    }

    public List<University> getUniversitiesByCountryId(String countryId) {
        return universityService.getUniversitiesByCountryId(countryId);
    }

    public void deleteCountry(String id) throws Exception {
        Optional<Country> optionalCountry = countryRepository.findById(id);
        if (optionalCountry.isPresent()) {
            Country country = optionalCountry.get();
            if (country.getImageFileName() != null) {
                storageService.deleteFile(country.getImageFileName());
            }
            countryRepository.deleteById(id);
        } else {
            throw new Exception("Country not found");
        }
    }
}