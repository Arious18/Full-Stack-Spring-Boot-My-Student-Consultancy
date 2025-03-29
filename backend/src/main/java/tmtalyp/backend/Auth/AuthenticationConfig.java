package tmtalyp.backend.Auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.data.mongodb.core.MongoTemplate;
import tmtalyp.backend.Auth.Jwt.JwtAuthenticationFilter;
import tmtalyp.backend.Auth.Jwt.JwtUtil;
import tmtalyp.backend.Auth.user.UserRepository;
import tmtalyp.backend.Auth.user.UserService;

@Configuration
public class AuthenticationConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserService userService(UserRepository userRepository, PasswordEncoder passwordEncoder, MongoTemplate mongoTemplate) {
        return new UserService(userRepository, passwordEncoder, mongoTemplate);
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(JwtUtil jwtUtil, UserService userService) {
        return new JwtAuthenticationFilter(jwtUtil, userService);
    }
}