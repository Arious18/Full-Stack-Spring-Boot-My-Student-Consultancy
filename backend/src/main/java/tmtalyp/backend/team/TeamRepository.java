package tmtalyp.backend.team;


import org.springframework.context.annotation.Primary;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Primary
public interface TeamRepository extends MongoRepository<Team, String> {
    Optional<Team> findByEmail(String email);
}