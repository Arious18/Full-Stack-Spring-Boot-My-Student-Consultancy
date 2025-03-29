package tmtalyp.backend.databaseSeeder;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tmtalyp.backend.team.Team;
import tmtalyp.backend.team.TeamRepository;
import tmtalyp.backend.universities.University;
import tmtalyp.backend.universities.UniversityRepository;

import java.util.List;

@RestController
@RequestMapping("/database")
@RequiredArgsConstructor
public class DatabaseSeeder {

    private final UniversityRepository universityRepository;
    private final TeamRepository teamRepository;

    @PostMapping("/seed")
    public ResponseEntity<String> seedDatabase() {
        if (universityRepository.count() == 0) {
            // Create universities with available constructor
            University harvard = new University();
            harvard.setName("Harvard University");
            harvard.setDescription("One of the most prestigious universities in the world, offering a wide range of academic programs.");
            harvard.setImageFileName("harvard-image");
            harvard.setYearlyPrice(45000);
            harvard.setImageUrl("https://my-data.r2.cloudflarestorage.com/harvard-image");

            University mit = new University();
            mit.setName("MIT");
            mit.setDescription("A leading research institution focused on science, technology, and innovation.");
            mit.setImageFileName("mit-image");
            mit.setYearlyPrice(52000);
            mit.setImageUrl("https://my-data.r2.cloudflarestorage.com/mit-image");

            University stanford = new University();
            stanford.setName("Stanford University");
            stanford.setDescription("Known for its academic strength, wealth, and close proximity to Silicon Valley.");
            stanford.setImageFileName("stanford-image");
            stanford.setYearlyPrice(56000);
            stanford.setImageUrl("https://my-data.r2.cloudflarestorage.com/stanford-image");

            universityRepository.saveAll(List.of(harvard, mit, stanford));
        }

        if (teamRepository.count() == 0) {
            teamRepository.saveAll(List.of(
                    new Team(null, "John Doe", 30, "123-456-7890", "john@example.com", "admin"),
                    new Team(null, "Alice Smith", 27, "987-654-3210", "alice@example.com", "user"),
                    new Team(null, "Bob Brown", 35, "555-666-7777", "bob@example.com", "manager")
            ));
        }

        return ResponseEntity.ok("Database seeded successfully.");
    }
}