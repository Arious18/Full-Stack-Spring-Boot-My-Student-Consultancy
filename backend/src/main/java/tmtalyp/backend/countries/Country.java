package tmtalyp.backend.countries;



import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "countries")
public class Country {
    @Id
    private String id;
    private String name;
    private String description;
    private String imageUrl;
    private String imageFileName;
    private List<String> universityIds; // IDs of universities in this country
}
