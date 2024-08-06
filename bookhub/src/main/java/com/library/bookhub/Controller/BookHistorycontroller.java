package com.library.bookhub.Controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import com.library.bookhub.Model.Book;
import com.library.bookhub.Service.BookHistoryService;
import com.library.bookhub.util.JwtTokenUtil;

@Controller
@RequestMapping("/history")
@CrossOrigin(origins = "http://localhost:5173")
public class BookHistorycontroller {

    @Autowired
    private BookHistoryService bookHistoryService;
     @Autowired
    private JwtTokenUtil jwtTokenUtil;


    //Get the history books for that user
    @GetMapping("/user-books/{userId}")
    public ResponseEntity<?> getUserBooks(@RequestHeader(value = "Authorization", required = false) String token,@PathVariable int userId) {
    try {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if(jwtTokenUtil.getRoleFromToken(token) == 1){
            List<Book> books = bookHistoryService.getUniqueBooksForUser(userId);
            return ResponseEntity.ok(books);
    } 
    else
    {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to get book");
    }
}
    catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body("Failed to get book: " + e.getMessage());
    }
}
}