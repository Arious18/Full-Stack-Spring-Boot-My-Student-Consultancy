package tmtalyp.backend.Auth.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import tmtalyp.backend.Auth.Jwt.JwtUtil;

import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserService userService, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        Optional<User> user = userService.findById(id);
        return user.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(id, userDetails);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        logger.info("Register request received: email={}, name={}", user.getEmail(), user.getName());
        try {
            user.getRoles().add("USER");
            User savedUser = userService.registerUser(user);
            String token = jwtUtil.generateToken(savedUser.getEmail());
            AuthResponse response = new AuthResponse(token, savedUser.getId(),
                    savedUser.getName(), savedUser.getEmail(), "user", savedUser.getRoles(), "/dashboard");
            logger.info("User registered successfully: {}", savedUser.getEmail());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            logger.error("Registration failed: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        logger.info("Login attempt for email: {}", loginRequest.getEmail());
        Optional<User> userOpt = userService.findByEmail(loginRequest.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                String token = jwtUtil.generateToken(user.getEmail());

                String role = user.getRoles().contains("ADMIN") ? "admin" : "user";
                String redirectUrl = "/dashboard";

                logger.info("Login successful for email: {} with role: {}", loginRequest.getEmail(), role);
                AuthResponse response = new AuthResponse(token, user.getId(),
                        user.getName(), user.getEmail(), role, user.getRoles(), redirectUrl);
                return ResponseEntity.ok(response);
            } else {
                logger.warn("Invalid password for email: {}", loginRequest.getEmail());
            }
        } else {
            logger.warn("User not found for email: {}", loginRequest.getEmail());
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    // Update admin registration to require admin role for access
    @PostMapping("/register-admin")
    @PreAuthorize("hasRole('ADMIN')")  // Only existing admins can create new admins
    public ResponseEntity<?> registerAdmin(@RequestBody User user) {
        logger.info("Admin register request: email={}", user.getEmail());

        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.getRoles().add("ADMIN"); // Add admin role
            User savedUser = userService.save(user);

            String token = jwtUtil.generateToken(savedUser.getEmail());
            AuthResponse response = new AuthResponse(token, savedUser.getId(),
                    savedUser.getName(), savedUser.getEmail(), "admin", savedUser.getRoles(), "/dashboard");

            logger.info("Admin registered successfully: {}", savedUser.getEmail());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            logger.error("Admin registration failed: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Add a new endpoint for first admin creation (should be disabled in production)
    @PostMapping("/setup-admin")
    public ResponseEntity<?> setupFirstAdmin(@RequestBody User user) {
        logger.info("First admin setup request: email={}", user.getEmail());

        // Check if any admin exists already
        if (userService.adminExists()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Admin already exists. Use register-admin endpoint.");
        }

        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.getRoles().add("ADMIN");
            User savedUser = userService.save(user);

            String token = jwtUtil.generateToken(savedUser.getEmail());
            AuthResponse response = new AuthResponse(token, savedUser.getId(),
                    savedUser.getName(), savedUser.getEmail(), "admin", savedUser.getRoles(), "/dashboard");

            logger.info("First admin set up successfully: {}", savedUser.getEmail());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            logger.error("First admin setup failed: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}