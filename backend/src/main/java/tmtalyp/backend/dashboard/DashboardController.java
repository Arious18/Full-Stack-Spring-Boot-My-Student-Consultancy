package tmtalyp.backend.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tmtalyp.backend.Application.ApplicationRepository;
import tmtalyp.backend.Auth.user.UserRepository;
import java.util.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = {"http://localhost:5173"})
public class DashboardController {

    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;

    @Autowired
    public DashboardController(UserRepository userRepository, ApplicationRepository applicationRepository) {
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        // Get actual user count
        long totalUsers = userRepository.count();

        // Get actual application count if possible, or use default
        long totalApplications = 0;
        try {
            totalApplications = applicationRepository.count();
        } catch (Exception e) {
            totalApplications = 431225; // Use default if repository not available
        }

        stats.put("totalUsers", totalUsers);
        stats.put("totalApplications", totalApplications);
        stats.put("emailsSent", 11361); // Default value
        stats.put("trafficReceived", 1325134); // Default value

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/user-growth")
    public ResponseEntity<List<Map<String, Object>>> getUserGrowthData() {
        // Generate example data
        List<Map<String, Object>> data = new ArrayList<>();

        LocalDate now = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM");

        // Generate last 12 months of random data
        for (int i = 11; i >= 0; i--) {
            LocalDate date = now.minusMonths(i);
            Map<String, Object> point = new HashMap<>();
            point.put("x", date.format(formatter));
            point.put("y", 50 + Math.random() * 150); // Random value between 50-200
            data.add(point);
        }

        return ResponseEntity.ok(data);
    }

    @GetMapping("/application-by-faculty")
    public ResponseEntity<List<Map<String, Object>>> getApplicationByFaculty() {
        // Generate example data
        List<Map<String, Object>> data = new ArrayList<>();

        String[] faculties = {"Engineering", "Medicine", "Law", "Business", "Arts"};

        for (String faculty : faculties) {
            Map<String, Object> item = new HashMap<>();
            item.put("country", faculty); // Use "country" as this is the indexBy in BarChart
            item.put("Applications", (int)(Math.random() * 100));
            item.put("ApplicationsColor", "hsl(229, 70%, 50%)");
            data.add(item);
        }

        return ResponseEntity.ok(data);
    }

    @GetMapping("/application-by-country")
    public ResponseEntity<List<Map<String, Object>>> getApplicationByCountry() {
        // Generate example data
        List<Map<String, Object>> data = new ArrayList<>();

        // Example country data with ISO codes
        data.add(Map.of("id", "USA", "value", 100));
        data.add(Map.of("id", "CAN", "value", 75));
        data.add(Map.of("id", "GBR", "value", 60));
        data.add(Map.of("id", "DEU", "value", 55));
        data.add(Map.of("id", "FRA", "value", 45));

        return ResponseEntity.ok(data);
    }

    @GetMapping("/recent-applications")
    public ResponseEntity<List<Map<String, Object>>> getRecentApplications() {
        // Return mock transaction data
        List<Map<String, Object>> transactions = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            Map<String, Object> tx = new HashMap<>();
            tx.put("txId", "APP" + (1000 + i));
            tx.put("user", "User " + (i + 1));
            tx.put("date", LocalDate.now().minusDays(i).toString());
            tx.put("cost", 20 + i * 5);
            transactions.add(tx);
        }

        return ResponseEntity.ok(transactions);
    }
}
