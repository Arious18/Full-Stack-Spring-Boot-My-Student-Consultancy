package tmtalyp.backend.Search;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import tmtalyp.backend.Faculty.Faculty;
import tmtalyp.backend.Faculty.FacultyRepository;
import tmtalyp.backend.Field.Field;
import tmtalyp.backend.Field.FieldRepository;
import tmtalyp.backend.countries.Country;
import tmtalyp.backend.countries.CountryRepository;
import tmtalyp.backend.universities.University;
import tmtalyp.backend.universities.UniversityRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
public class DataInitializer {

    @Autowired
    private UniversityRepository universityRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private FieldRepository fieldRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Bean
    @Profile("dev") // Only run in dev profile
    public CommandLineRunner initData() {
        return args -> {
            // Check if data already exists
            if (universityRepository.count() > 0) {
                return; // Skip initialization if data exists
            }

            // Create countries
            Country usa = new Country();
            usa.setName("United States");
            usa.setDescription("A country in North America");
            usa.setImageUrl("/images/countries/usa.jpg");
            usa.setImageFileName("usa.jpg");
            usa.setUniversityIds(new ArrayList<>());

            Country uk = new Country();
            uk.setName("United Kingdom");
            uk.setDescription("A country in Europe");
            uk.setImageUrl("/images/countries/uk.jpg");
            uk.setImageFileName("uk.jpg");
            uk.setUniversityIds(new ArrayList<>());

            Country germany = new Country();
            germany.setName("Germany");
            germany.setDescription("A country in Europe");
            germany.setImageUrl("/images/countries/germany.jpg");
            germany.setImageFileName("germany.jpg");
            germany.setUniversityIds(new ArrayList<>());

            Country france = new Country();
            france.setName("France");
            france.setDescription("A country in Europe");
            france.setImageUrl("/images/countries/france.jpg");
            france.setImageFileName("france.jpg");
            france.setUniversityIds(new ArrayList<>());

            Country japan = new Country();
            japan.setName("Japan");
            japan.setDescription("A country in Asia");
            japan.setImageUrl("/images/countries/japan.jpg");
            japan.setImageFileName("japan.jpg");
            japan.setUniversityIds(new ArrayList<>());

            List<Country> countries = Arrays.asList(usa, uk, germany, france, japan);
            countryRepository.saveAll(countries);

            // Create universities
            University harvard = new University();
            harvard.setName("Harvard University");
            harvard.setDescription("A private Ivy League research university in Cambridge, Massachusetts");
            harvard.setAbout("Founded in 1636, Harvard is the oldest institution of higher education in the United States.");
            harvard.setImageUrl("/images/universities/harvard.jpg");
            harvard.setImageFileName("harvard.jpg");
            harvard.setYearlyPrice(50000.0);
            harvard.setDiscountPrice(45000.0);
            harvard.setCountryId(usa.getId());

            University mit = new University();
            mit.setName("MIT");
            mit.setDescription("A private research university in Cambridge, Massachusetts");
            mit.setAbout("MIT is a world-class educational institution.");
            mit.setImageUrl("/images/universities/mit.jpg");
            mit.setImageFileName("mit.jpg");
            mit.setYearlyPrice(52000.0);
            mit.setDiscountPrice(49000.0);
            mit.setCountryId(usa.getId());

            University oxford = new University();
            oxford.setName("Oxford University");
            oxford.setDescription("A collegiate research university in Oxford, England");
            oxford.setAbout("Oxford is the oldest university in the English-speaking world.");
            oxford.setImageUrl("/images/universities/oxford.jpg");
            oxford.setImageFileName("oxford.jpg");
            oxford.setYearlyPrice(40000.0);
            oxford.setDiscountPrice(38000.0);
            oxford.setCountryId(uk.getId());

            University tokyo = new University();
            tokyo.setName("Tokyo University");
            tokyo.setDescription("A public research university in Tokyo, Japan");
            tokyo.setAbout("One of the most prestigious universities in Asia.");
            tokyo.setImageUrl("/images/universities/tokyo.jpg");
            tokyo.setImageFileName("tokyo.jpg");
            tokyo.setYearlyPrice(30000.0);
            tokyo.setDiscountPrice(28000.0);
            tokyo.setCountryId(japan.getId());

            List<University> universities = Arrays.asList(harvard, mit, oxford, tokyo);
            universityRepository.saveAll(universities);

            // Update country universityIds
            usa.getUniversityIds().add(harvard.getId());
            usa.getUniversityIds().add(mit.getId());
            uk.getUniversityIds().add(oxford.getId());
            japan.getUniversityIds().add(tokyo.getId());
            countryRepository.saveAll(countries);

            // Create faculties
            Faculty arts = new Faculty();
            arts.setName("Faculty of Arts and Sciences");
            arts.setDescription("Harvard's largest academic division");
            arts.setPrice(20000.0);
            arts.setDiscountPrice(18000.0);
            arts.setLanguages("{'English': 100}");
            arts.setUniversityId(harvard.getId());
            arts.setImageUrl("/images/faculties/harvard-arts.jpg");
            arts.setImageFileName("harvard-arts.jpg");

            Faculty engineering = new Faculty();
            engineering.setName("School of Engineering");
            engineering.setDescription("MIT's engineering school");
            engineering.setPrice(25000.0);
            engineering.setDiscountPrice(23000.0);
            engineering.setLanguages("{'English': 100}");
            engineering.setUniversityId(mit.getId());
            engineering.setImageUrl("/images/faculties/mit-engineering.jpg");
            engineering.setImageFileName("mit-engineering.jpg");

            Faculty history = new Faculty();
            history.setName("Faculty of History");
            history.setDescription("Oxford's history department");
            history.setPrice(18000.0);
            history.setDiscountPrice(16000.0);
            history.setLanguages("{'English': 100}");
            history.setUniversityId(oxford.getId());
            history.setImageUrl("/images/faculties/oxford-history.jpg");
            history.setImageFileName("oxford-history.jpg");

            Faculty science = new Faculty();
            science.setName("Faculty of Science");
            science.setDescription("Tokyo University's science division");
            science.setPrice(15000.0);
            science.setDiscountPrice(13500.0);
            science.setLanguages("{'Japanese': 80, 'English': 20}");
            science.setUniversityId(tokyo.getId());
            science.setImageUrl("/images/faculties/tokyo-science.jpg");
            science.setImageFileName("tokyo-science.jpg");

            Faculty business = new Faculty();
            business.setName("Harvard Business School");
            business.setDescription("Harvard's graduate business school");
            business.setPrice(30000.0);
            business.setDiscountPrice(27000.0);
            business.setLanguages("{'English': 100}");
            business.setUniversityId(harvard.getId());
            business.setImageUrl("/images/faculties/harvard-business.jpg");
            business.setImageFileName("harvard-business.jpg");

            Faculty humanities = new Faculty();
            humanities.setName("School of Humanities");
            humanities.setDescription("MIT's humanities division");
            humanities.setPrice(19000.0);
            humanities.setDiscountPrice(17000.0);
            humanities.setLanguages("{'English': 100}");
            humanities.setUniversityId(mit.getId());
            humanities.setImageUrl("/images/faculties/mit-humanities.jpg");
            humanities.setImageFileName("mit-humanities.jpg");

            List<Faculty> faculties = Arrays.asList(arts, engineering, history, science, business, humanities);
            facultyRepository.saveAll(faculties);

            // Create fields
            Field computerScience = new Field();
            computerScience.setName("Computer Science");
            computerScience.setDescription("Study of computers and computational systems");
            computerScience.setPrice(12000.0);
            computerScience.setDiscountPrice(11000.0);
            computerScience.setLanguages("{'English': 100}");
            computerScience.setFacultyId(engineering.getId());
            computerScience.setImageUrl("/images/fields/computer-science.jpg");
            computerScience.setImageFileName("computer-science.jpg");

            Field economics = new Field();
            economics.setName("Economics");
            economics.setDescription("Social science of production, distribution, and consumption");
            economics.setPrice(10000.0);
            economics.setDiscountPrice(9000.0);
            economics.setLanguages("{'English': 100}");
            economics.setFacultyId(arts.getId());
            economics.setImageUrl("/images/fields/economics.jpg");
            economics.setImageFileName("economics.jpg");

            Field medievalHistory = new Field();
            medievalHistory.setName("Medieval History");
            medievalHistory.setDescription("Study of the medieval period");
            medievalHistory.setPrice(9000.0);
            medievalHistory.setDiscountPrice(8000.0);
            medievalHistory.setLanguages("{'English': 100}");
            medievalHistory.setFacultyId(history.getId());
            medievalHistory.setImageUrl("/images/fields/medieval-history.jpg");
            medievalHistory.setImageFileName("medieval-history.jpg");

            Field physics = new Field();
            physics.setName("Physics");
            physics.setDescription("Study of matter, energy, and the fundamental forces");
            physics.setPrice(11000.0);
            physics.setDiscountPrice(10000.0);
            physics.setLanguages("{'Japanese': 70, 'English': 30}");
            physics.setFacultyId(science.getId());
            physics.setImageUrl("/images/fields/physics.jpg");
            physics.setImageFileName("physics.jpg");

            Field businessAdmin = new Field();
            businessAdmin.setName("Business Administration");
            businessAdmin.setDescription("Study of business management");
            businessAdmin.setPrice(15000.0);
            businessAdmin.setDiscountPrice(13500.0);
            businessAdmin.setLanguages("{'English': 100}");
            businessAdmin.setFacultyId(business.getId());
            businessAdmin.setImageUrl("/images/fields/business-admin.jpg");
            businessAdmin.setImageFileName("business-admin.jpg");

            Field mathematics = new Field();
            mathematics.setName("Mathematics");
            mathematics.setDescription("Study of numbers, quantity, structure, space, and change");
            mathematics.setPrice(10000.0);
            mathematics.setDiscountPrice(9000.0);
            mathematics.setLanguages("{'English': 100}");
            mathematics.setFacultyId(engineering.getId());
            mathematics.setImageUrl("/images/fields/mathematics.jpg");
            mathematics.setImageFileName("mathematics.jpg");

            Field philosophy = new Field();
            philosophy.setName("Philosophy");
            philosophy.setDescription("Study of fundamental questions about existence, knowledge, ethics");
            philosophy.setPrice(8000.0);
            philosophy.setDiscountPrice(7000.0);
            philosophy.setLanguages("{'English': 100}");
            philosophy.setFacultyId(humanities.getId());
            philosophy.setImageUrl("/images/fields/philosophy.jpg");
            philosophy.setImageFileName("philosophy.jpg");

            List<Field> fields = Arrays.asList(computerScience, economics, medievalHistory, physics, businessAdmin, mathematics, philosophy);
            fieldRepository.saveAll(fields);
        };
    }
}