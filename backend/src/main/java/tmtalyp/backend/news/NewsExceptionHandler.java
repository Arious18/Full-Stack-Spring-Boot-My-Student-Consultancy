package tmtalyp.backend.news;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class NewsExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex, WebRequest request) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        response.put("error", "Internal Server Error");
        response.put("message", ex.getMessage());
        response.put("path", request.getDescription(false));

        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NewsNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleNewsNotFoundException(NewsNotFoundException ex, WebRequest request) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.NOT_FOUND.value());
        response.put("error", "News Not Found");
        response.put("message", ex.getMessage());
        response.put("path", request.getDescription(false));

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CommentNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleCommentNotFoundException(CommentNotFoundException ex, WebRequest request) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.NOT_FOUND.value());
        response.put("error", "Comment Not Found");
        response.put("message", ex.getMessage());
        response.put("path", request.getDescription(false));

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<Map<String, Object>> handleUnauthorizedAccessException(UnauthorizedAccessException ex, WebRequest request) {
        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.UNAUTHORIZED.value());
        response.put("error", "Unauthorized Access");
        response.put("message", ex.getMessage());
        response.put("path", request.getDescription(false));

        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }
}

// Custom exceptions
class NewsNotFoundException extends RuntimeException {
    public NewsNotFoundException(String message) {
        super(message);
    }
}

class CommentNotFoundException extends RuntimeException {
    public CommentNotFoundException(String message) {
        super(message);
    }
}

class UnauthorizedAccessException extends RuntimeException {
    public UnauthorizedAccessException(String message) {
        super(message);
    }
}