package tmtalyp.backend.dashboard;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tmtalyp.backend.Application.Application;
import tmtalyp.backend.Application.ApplicationRepository;
import tmtalyp.backend.Auth.user.User;
import tmtalyp.backend.Auth.user.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;

    @Autowired
    public DashboardService(UserRepository userRepository, ApplicationRepository applicationRepository) {
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
    }

    /**
     * Get overall dashboard statistics
     */
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        // Total users count
        long totalUsers = userRepository.count();
        stats.put("totalUsers", totalUsers);

        // Total applications count
        long totalApplications = applicationRepository.count();
        stats.put("totalApplications", totalApplications);

        // Email statistics - in a real application, you'd query an email service
        // For now, using a placeholder value
        stats.put("emailsSent", 11361);

        // Traffic statistics - in a real application, you'd query analytics
        // For now, using a placeholder value
        stats.put("trafficReceived", 1325134);

        return stats;
    }

    /**
     * Get user growth data over the last 12 months
     */
    public List<Map<String, Object>> getUserGrowthData() {
        List<Map<String, Object>> result = new ArrayList<>();

        // Get all users
        List<User> allUsers = userRepository.findAll();

        // Set up date format and current date
        DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("MMM");
        LocalDate now = LocalDate.now();

        // Create a map to store users per month
        Map<String, Integer> usersPerMonth = new HashMap<>();

        // Initialize with past 12 months
        for (int i = 11; i >= 0; i--) {
            String monthKey = now.minusMonths(i).format(monthFormatter);
            usersPerMonth.put(monthKey, 0);
        }

        // Count users by month of creation
        for (User user : allUsers) {
            LocalDateTime createdDate = user.getCreatedDate();
            // Skip users with no creation date
            if (createdDate == null) continue;

            // Only count users from the last 12 months
            LocalDate creationDate = createdDate.toLocalDate();
            if (creationDate.isAfter(now.minusMonths(12))) {
                String monthKey = creationDate.format(monthFormatter);
                usersPerMonth.put(monthKey, usersPerMonth.getOrDefault(monthKey, 0) + 1);
            }
        }

        // Convert the map to the format expected by the frontend
        for (int i = 11; i >= 0; i--) {
            String monthKey = now.minusMonths(i).format(monthFormatter);
            Map<String, Object> dataPoint = new HashMap<>();
            dataPoint.put("x", monthKey);
            dataPoint.put("y", usersPerMonth.getOrDefault(monthKey, 0));
            result.add(dataPoint);
        }

        return result;
    }

    /**
     * Get application data by faculty
     */
    public List<Map<String, Object>> getApplicationByFaculty() {
        List<Map<String, Object>> result = new ArrayList<>();

        // Get all applications
        List<Application> applications = applicationRepository.findAll();

        // Group applications by faculty
        Map<String, Long> facultyCounts = applications.stream()
                .filter(app -> app.getChosenFaculty() != null && !app.getChosenFaculty().isEmpty())
                .collect(Collectors.groupingBy(
                        Application::getChosenFaculty,
                        Collectors.counting()
                ));

        // Convert to the format expected by the bar chart
        for (Map.Entry<String, Long> entry : facultyCounts.entrySet()) {
            Map<String, Object> dataPoint = new HashMap<>();
            dataPoint.put("country", entry.getKey()); // "country" is used as the indexBy in BarChart
            dataPoint.put("Applications", entry.getValue());
            dataPoint.put("ApplicationsColor", "hsl(229, 70%, 50%)");
            result.add(dataPoint);
        }

        return result;
    }

    /**
     * Get application data by country
     */
    public List<Map<String, Object>> getApplicationByCountry() {
        List<Map<String, Object>> result = new ArrayList<>();

        // Get all applications
        List<Application> applications = applicationRepository.findAll();

        // Group applications by country
        Map<String, Long> countryCounts = applications.stream()
                .filter(app -> app.getApplicationCountry() != null && !app.getApplicationCountry().isEmpty())
                .collect(Collectors.groupingBy(
                        Application::getApplicationCountry,
                        Collectors.counting()
                ));

        // Define ISO country code mapping - in a real app, you'd use a library for this
        Map<String, String> countryToIso = new HashMap<>();
        countryToIso.put("United States", "USA");
        countryToIso.put("Canada", "CAN");
        countryToIso.put("United Kingdom", "GBR");
        countryToIso.put("Germany", "DEU");
        countryToIso.put("France", "FRA");
        // Add more mappings as needed

        // Convert to the format expected by the geography chart
        for (Map.Entry<String, Long> entry : countryCounts.entrySet()) {
            String country = entry.getKey();
            Long count = entry.getValue();

            // Get ISO code, defaulting to the country name if not found
            String isoCode = countryToIso.getOrDefault(country, country);

            Map<String, Object> dataPoint = new HashMap<>();
            dataPoint.put("id", isoCode);
            dataPoint.put("value", count);
            result.add(dataPoint);
        }

        return result;
    }

    /**
     * Get recent applications for the transactions list
     */
    public List<Map<String, Object>> getRecentApplications() {
        List<Map<String, Object>> result = new ArrayList<>();

        // Get all applications, limit to 10 most recent
        List<Application> applications = applicationRepository.findAll();

        // Sort by creation date (if available)
        // Note: This assumes Application has a createdAt field
        // If not, you would need to modify this logic

        // For this example, we'll just take the first 10 applications
        List<Application> recentApplications = applications.stream()
                .limit(10)
                .collect(Collectors.toList());

        // Convert to the format expected by the frontend
        for (int i = 0; i < recentApplications.size(); i++) {
            Application app = recentApplications.get(i);
            Map<String, Object> dataPoint = new HashMap<>();

            dataPoint.put("txId", "APP" + (1000 + i));
            dataPoint.put("user", app.getName() + " " + app.getSurname());
            dataPoint.put("date", app.getDateOfBirth()); // Using dateOfBirth as a placeholder
            dataPoint.put("cost", 20 + i * 5); // Placeholder value

            result.add(dataPoint);
        }

        return result;
    }
}