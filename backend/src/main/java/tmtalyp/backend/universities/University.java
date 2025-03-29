package tmtalyp.backend.universities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "universities")
public class University {
    @Id
    private String id;
    private String name;
    private String description;
    private String about;
    private String imageUrl;
    private String imageFileName;
    private double yearlyPrice;
    private Double discountPrice;
    private String countryId;



}