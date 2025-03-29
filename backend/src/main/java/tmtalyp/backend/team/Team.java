package tmtalyp.backend.team;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "Team")
public class Team {
    @Id
    private String id;
    private String name;
    private int age;
    private String phone;
    private String email;
    private String access;

    // ✅ Parametreli Constructor (Use String for id)
    public Team(String id, String name, int age, String phone, String email, String access) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.email = email;
        this.access = access;
    }

    // ✅ Default Constructor (Spring Data MongoDB needs this)
    public Team() {}
}
