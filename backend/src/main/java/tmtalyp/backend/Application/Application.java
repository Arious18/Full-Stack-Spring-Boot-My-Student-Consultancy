package tmtalyp.backend.Application;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "applications")
public class Application {
    @Id
    private String id;
    private String name;
    private String surname;
    private String middleName; // Optional
    private String dateOfBirth;
    private String uniqueId; // Passport or Citizenship ID
    private String fatherName; // Optional
    private String motherName; // Optional
    private String gender;
    private String chosenUniversity; // University ID reference
    private String chosenFaculty; // Faculty ID reference
    private String chosenField; // Field ID reference
    private String finishedSchool; // Optional
    private String contactInfo; // Phone or Email
    private String applicationCountry;
    private String fileUrl; // URL to uploaded file
    private String fileName; // Name of the uploaded file
}