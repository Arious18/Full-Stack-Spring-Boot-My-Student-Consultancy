package tmtalyp.backend.hero;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tmtalyp.backend.universities.StorageService;

import java.util.List;
import java.util.Optional;

@Service
public class HeroService {

    private final HeroRepository heroRepository;
    private final StorageService storageService;  // Changed to use StorageService from universities package
    private final String baseUrl = "https://pub-cab830fe342c4f9480be11e8b3347409.r2.dev/my-data/";

    @Autowired
    public HeroService(HeroRepository heroRepository, StorageService storageService) {
        this.heroRepository = heroRepository;
        this.storageService = storageService;
    }

    public List<Hero> getAllHeroes() {
        return heroRepository.findAll();
    }

    public List<Hero> getActiveHeroes() {
        return heroRepository.findByActiveTrueOrderByOrderAsc();
    }

    public Optional<Hero> getHeroById(String id) {
        return heroRepository.findById(id);
    }

    public Hero createHero(Hero hero, MultipartFile backgroundImage, MultipartFile iconImage) throws Exception {
        // Handle background image upload
        if (backgroundImage != null && !backgroundImage.isEmpty()) {
            StorageService.UploadResult result = storageService.uploadFile(backgroundImage);
            hero.setBackgroundImage(baseUrl + result.getFileName());
            hero.setBackgroundImageFileName(result.getFileName());
        }

        // Handle icon image upload (optional)
        if (iconImage != null && !iconImage.isEmpty()) {
            StorageService.UploadResult result = storageService.uploadFile(iconImage);
            hero.setIconImage(baseUrl + result.getFileName());
            hero.setIconImageFileName(result.getFileName());
        }

        // Count existing heroes for default order
        if (hero.getOrder() == null) {
            long count = heroRepository.count();
            hero.setOrder((int) count + 1);
        }

        // Set active status if not provided
        if (hero.getActive() == null) {
            hero.setActive(true);
        }

        return heroRepository.save(hero);
    }

    public Hero updateHero(String id, Hero heroDetails, MultipartFile backgroundImage, MultipartFile iconImage) throws Exception {
        Optional<Hero> heroOptional = heroRepository.findById(id);
        if (heroOptional.isEmpty()) {
            throw new RuntimeException("Hero not found with id: " + id);
        }

        Hero existingHero = heroOptional.get();
        existingHero.setHeader(heroDetails.getHeader());
        existingHero.setDescription(heroDetails.getDescription());
        existingHero.setOrder(heroDetails.getOrder());
        existingHero.setActive(heroDetails.getActive());

        // Handle background image upload
        if (backgroundImage != null && !backgroundImage.isEmpty()) {
            // Delete existing background image if present
            if (existingHero.getBackgroundImageFileName() != null) {
                storageService.deleteFile(existingHero.getBackgroundImageFileName());
            }

            StorageService.UploadResult result = storageService.uploadFile(backgroundImage);
            existingHero.setBackgroundImage(baseUrl + result.getFileName());
            existingHero.setBackgroundImageFileName(result.getFileName());
        }

        // Handle icon image upload (optional)
        if (iconImage != null && !iconImage.isEmpty()) {
            // Delete existing icon image if present
            if (existingHero.getIconImageFileName() != null) {
                storageService.deleteFile(existingHero.getIconImageFileName());
            }

            StorageService.UploadResult result = storageService.uploadFile(iconImage);
            existingHero.setIconImage(baseUrl + result.getFileName());
            existingHero.setIconImageFileName(result.getFileName());
        }

        return heroRepository.save(existingHero);
    }

    public void deleteHero(String id) throws Exception {
        Optional<Hero> heroOptional = heroRepository.findById(id);
        if (heroOptional.isEmpty()) {
            throw new RuntimeException("Hero not found with id: " + id);
        }

        Hero hero = heroOptional.get();

        // Delete associated images from storage
        if (hero.getBackgroundImageFileName() != null) {
            storageService.deleteFile(hero.getBackgroundImageFileName());
        }

        if (hero.getIconImageFileName() != null) {
            storageService.deleteFile(hero.getIconImageFileName());
        }

        heroRepository.deleteById(id);
    }
}