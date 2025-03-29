package tmtalyp.backend.Application;



import org.springframework.data.mongodb.repository.MongoRepository;

public interface ApplicationRepository extends MongoRepository<Application, String> {
    // Add custom queries if needed, e.g., find by uniqueId
}