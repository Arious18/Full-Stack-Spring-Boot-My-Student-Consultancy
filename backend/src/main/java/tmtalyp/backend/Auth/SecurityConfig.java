package tmtalyp.backend.Auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import tmtalyp.backend.Auth.Jwt.JwtAuthenticationFilter;
import tmtalyp.backend.Auth.Jwt.JwtUtil;
import tmtalyp.backend.Auth.user.UserService;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    @Lazy
    private UserService userService;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(jwtUtil, userService);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Options should be permitted for CORS
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Public endpoints
                        .requestMatchers("/api/health").permitAll()
                        .requestMatchers("/api/test").permitAll()
                        .requestMatchers("/api/hero-test").permitAll()
                        .requestMatchers("/auth/login").permitAll()
                        .requestMatchers("/auth/register").permitAll()
                        .requestMatchers("/auth/setup-admin").permitAll()
                        .requestMatchers("/debug/**").permitAll()

                        // Countries endpoints - make sure these are public
                        .requestMatchers(HttpMethod.GET, "/countries").permitAll()
                        .requestMatchers(HttpMethod.GET, "/countries/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/countries/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/countries/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/countries/**").hasAuthority("ROLE_ADMIN")

                        // API Countries endpoints
                        .requestMatchers(HttpMethod.GET, "/api/countries").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/countries/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/countries/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/countries/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/countries/**").hasAuthority("ROLE_ADMIN")

                        // Search components
                        .requestMatchers(HttpMethod.GET, "/universities/search").permitAll()
                        .requestMatchers(HttpMethod.GET, "/faculties/search").permitAll()
                        .requestMatchers(HttpMethod.GET, "/fields/search").permitAll()
                        .requestMatchers(HttpMethod.GET, "/countries/search").permitAll()
                        .requestMatchers(HttpMethod.GET, "/*/search").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/*/search").permitAll()

                        // Universities endpoints - public for GET, admin for modifications
                        .requestMatchers(HttpMethod.GET, "/universities").permitAll()
                        .requestMatchers(HttpMethod.GET, "/universities/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/universities/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/universities/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/universities/**").hasAuthority("ROLE_ADMIN")

                        // API Universities endpoints
                        .requestMatchers(HttpMethod.GET, "/api/universities").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/universities/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/universities/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/universities/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/universities/**").hasAuthority("ROLE_ADMIN")

                        // Faculties endpoints - similar pattern
                        .requestMatchers(HttpMethod.GET, "/faculties").permitAll()
                        .requestMatchers(HttpMethod.GET, "/faculties/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/faculties/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/faculties/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/faculties/**").hasAuthority("ROLE_ADMIN")

                        // API Faculties endpoints
                        .requestMatchers(HttpMethod.GET, "/api/faculties").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/faculties/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/faculties/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/faculties/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/faculties/**").hasAuthority("ROLE_ADMIN")

                        // Fields endpoints - similar pattern
                        .requestMatchers(HttpMethod.GET, "/fields").permitAll()
                        .requestMatchers(HttpMethod.GET, "/fields/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/fields/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/fields/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/fields/**").hasAuthority("ROLE_ADMIN")

                        // API Fields endpoints
                        .requestMatchers(HttpMethod.GET, "/api/fields").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/fields/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/fields/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/fields/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/fields/**").hasAuthority("ROLE_ADMIN")

                        // Heroes endpoints - similar pattern
                        .requestMatchers(HttpMethod.GET, "/api/heroes").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/heroes/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/heroes/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/heroes/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/heroes/**").hasAuthority("ROLE_ADMIN")

                        // Jobs endpoints - public for GET, admin for modifications
                        .requestMatchers(HttpMethod.GET, "/api/jobs").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/jobs/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/jobs/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/jobs/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/jobs/**").hasAuthority("ROLE_ADMIN")

                        // News endpoints - public for GET, admin for modifications
                        .requestMatchers(HttpMethod.GET, "/api/news").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/news/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/news/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/news/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/news/**").hasAuthority("ROLE_ADMIN")

                        // Protected endpoints
                        .requestMatchers("/auth/register-admin").hasAuthority("ROLE_ADMIN")
                        .requestMatchers("/admin/**").hasAuthority("ROLE_ADMIN")
                        .requestMatchers("/profilePage").authenticated()
                        .requestMatchers("/users/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/auth/{id}").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/auth/{id}").authenticated()
                        .requestMatchers("/dashboard").hasAuthority("ROLE_ADMIN")

                        // Everything else requires authentication
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(
                "http://localhost:5173"
        ));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With", "Accept"));
        config.setExposedHeaders(List.of("Authorization"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
