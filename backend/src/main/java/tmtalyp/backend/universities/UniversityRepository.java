package tmtalyp.backend.universities;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UniversityRepository extends MongoRepository<University, String> {
    List<University> findByCountryId(String countryId);


    @Query("SELECT u FROM University u WHERE " +
            "LOWER(u.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(u.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(u.about) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<University> search(@Param("query") String query);

}