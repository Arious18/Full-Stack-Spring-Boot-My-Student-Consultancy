package tmtalyp.backend.hero;



import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeroRepository extends MongoRepository<Hero, String> {
    List<Hero> findByActiveTrue();
    List<Hero> findByActiveTrueOrderByOrderAsc();
}