package tmtalyp.backend.hero;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/heroes")
public class HeroController {

    private static final Logger logger = LoggerFactory.getLogger(HeroController.class);
    private final HeroService heroService;

    @Autowired
    public HeroController(HeroService heroService) {
        this.heroService = heroService;
        logger.info("HeroController initialized with RequestMapping: /api/heroes");
    }

    @GetMapping
    public ResponseEntity<List<Hero>> getAllHeroes() {
        logger.info("GET /api/heroes - getAllHeroes called");
        try {
            List<Hero> heroes = heroService.getAllHeroes();
            logger.info("Found {} heroes", heroes.size());
            return ResponseEntity.ok(heroes);
        } catch (Exception e) {
            logger.error("Error fetching heroes: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/active")
    public ResponseEntity<List<Hero>> getActiveHeroes() {
        logger.info("GET /api/heroes/active - getActiveHeroes called");
        try {
            List<Hero> heroes = heroService.getActiveHeroes();
            logger.info("Found {} active heroes", heroes.size());
            return ResponseEntity.ok(heroes);
        } catch (Exception e) {
            logger.error("Error fetching active heroes: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hero> getHeroById(@PathVariable String id) {
        logger.info("GET /api/heroes/{} - getHeroById called", id);
        try {
            Optional<Hero> hero = heroService.getHeroById(id);
            return hero.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            logger.error("Error fetching hero by id: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Hero> createHero(
            @RequestParam("header") String header,
            @RequestParam("description") String description,
            @RequestParam(value = "backgroundImage", required = true) MultipartFile backgroundImage,
            @RequestParam(value = "iconImage", required = false) MultipartFile iconImage,
            @RequestParam(value = "order", required = false) Integer order,
            @RequestParam(value = "active", required = false) Boolean active
    ) {
        logger.info("POST /api/heroes - createHero called with header: {}", header);
        try {
            Hero hero = new Hero();
            hero.setHeader(header);
            hero.setDescription(description);
            hero.setOrder(order);
            hero.setActive(active);

            Hero createdHero = heroService.createHero(hero, backgroundImage, iconImage);
            logger.info("Hero created successfully with id: {}", createdHero.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(createdHero);
        } catch (Exception e) {
            logger.error("Error creating hero: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<Hero> updateHero(
            @PathVariable String id,
            @RequestParam("header") String header,
            @RequestParam("description") String description,
            @RequestParam(value = "backgroundImage", required = false) MultipartFile backgroundImage,
            @RequestParam(value = "iconImage", required = false) MultipartFile iconImage,
            @RequestParam(value = "order", required = false) Integer order,
            @RequestParam(value = "active", required = false, defaultValue = "true") Boolean active
    ) {
        logger.info("PUT /api/heroes/{} - updateHero called", id);
        try {
            Hero heroDetails = new Hero();
            heroDetails.setHeader(header);
            heroDetails.setDescription(description);
            heroDetails.setOrder(order);
            heroDetails.setActive(active);

            Hero updatedHero = heroService.updateHero(id, heroDetails, backgroundImage, iconImage);
            logger.info("Hero updated successfully with id: {}", id);
            return ResponseEntity.ok(updatedHero);
        } catch (Exception e) {
            logger.error("Error updating hero: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHero(@PathVariable String id) {
        logger.info("DELETE /api/heroes/{} - deleteHero called", id);
        try {
            heroService.deleteHero(id);
            logger.info("Hero deleted successfully with id: {}", id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            logger.error("Error deleting hero: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}