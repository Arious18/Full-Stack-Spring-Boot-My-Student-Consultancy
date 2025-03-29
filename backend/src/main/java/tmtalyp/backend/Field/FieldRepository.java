package tmtalyp.backend.Field;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FieldRepository extends MongoRepository<Field, String> {
    List<Field> findByFacultyId(String facultyId);

    @Query("{ $or: [ " +
            "{ 'name': { $regex: ?0, $options: 'i' } }, " +
            "{ 'description': { $regex: ?0, $options: 'i' } } " +
            "] }")
    List<Field> search(String query);
}