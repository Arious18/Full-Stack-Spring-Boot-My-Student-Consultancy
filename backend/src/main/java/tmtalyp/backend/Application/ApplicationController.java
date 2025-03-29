package tmtalyp.backend.Application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tmtalyp.backend.Application.Application;;
import java.util.List;

@RestController
@RequestMapping("/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class ApplicationController {

    private ApplicationRepository applicationRepository;
    private ApplicationService applicationService;
    @Autowired
    public ApplicationController(ApplicationService applicationService ,ApplicationRepository applicationRepository) {
        this.applicationService = applicationService;
        this.applicationRepository = applicationRepository;
    }

  // Ensure this is injected
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Application> submitApplication(
            @RequestParam("name") String name,
            @RequestParam("surname") String surname,
            @RequestParam(value = "middleName", required = false) String middleName,
            @RequestParam("dateOfBirth") String dateOfBirth,
            @RequestParam("uniqueId") String uniqueId,
            @RequestParam(value = "fatherName", required = false) String fatherName,
            @RequestParam(value = "motherName", required = false) String motherName,
            @RequestParam("gender") String gender,
            @RequestParam("chosenUniversity") String chosenUniversity,
            @RequestParam("chosenFaculty") String chosenFaculty,
            @RequestParam("chosenField") String chosenField,
            @RequestParam(value = "finishedSchool", required = false) String finishedSchool,
            @RequestParam("contactInfo") String contactInfo,
            @RequestParam("applicationCountry") String applicationCountry,
            @RequestParam(value = "file", required = false) MultipartFile file) throws Exception {

        Application application = new Application();
        application.setName(name);
        application.setSurname(surname);
        application.setMiddleName(middleName);
        application.setDateOfBirth(dateOfBirth);
        application.setUniqueId(uniqueId);
        application.setFatherName(fatherName);
        application.setMotherName(motherName);
        application.setGender(gender);
        application.setChosenUniversity(chosenUniversity);
        application.setChosenFaculty(chosenFaculty);
        application.setChosenField(chosenField);
        application.setFinishedSchool(finishedSchool);
        application.setContactInfo(contactInfo);
        application.setApplicationCountry(applicationCountry);

        Application savedApplication = applicationService.saveApplication(application, file);
        return ResponseEntity.ok(savedApplication);
    }

    @GetMapping
    public ResponseEntity<List<Application>> getAllApplications() {
        // Use service instead of repository directly
        List<Application> applications = applicationService.getAllApplications(); // Add this method to ApplicationService
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplication(@PathVariable String id) throws Exception {
        Application application = applicationService.getApplicationById(id);
        return ResponseEntity.ok(application);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(@PathVariable String id, @RequestBody Application application) throws Exception {
        Application existingApplication = applicationService.getApplicationById(id);
        application.setId(id); // Ensure ID is set
        Application updatedApplication = applicationService.saveApplication(application, null); // No file update here
        return ResponseEntity.ok(updatedApplication);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable String id) throws Exception {
        applicationService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }


}