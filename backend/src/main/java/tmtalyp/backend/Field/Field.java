package tmtalyp.backend.Field;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "fields")
public class Field {
    @Id
    private String id;
    private String name;
    private String description;
    private double price;
    private double discountPrice;
    private String languages; // JSON string or adjust to a Map if needed
    private String facultyId; // Reference to the faculty this field belongs to
    private String imageUrl;
    private String imageFileName;
}