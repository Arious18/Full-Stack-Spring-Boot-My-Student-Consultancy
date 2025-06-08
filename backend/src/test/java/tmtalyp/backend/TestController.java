package tmtalyp.backend;



import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test")
    public String test() {
        return "API is working";
    }

    @GetMapping("/api/hero-test")
    public String heroTest() {
        return "Hero API is accessible";
    }
    @GetMapping("/api/health")
    public String health() {
        return "OK";
    }

}