package tmtalyp.backend.Faculty;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "faculties")
public class Faculty {
    @Id
    private String id;
    private String name;
    private String description;
    private double price;
    private double discountPrice;
    private String languages; // Map of language name to percentage
    private String universityId; // Reference to the university this faculty belongs to
    private String imageUrl;
    private String imageFileName;
}