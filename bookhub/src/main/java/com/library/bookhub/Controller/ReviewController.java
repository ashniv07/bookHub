package com.library.bookhub.Controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import com.library.bookhub.Domain.ReviewDto;
import com.library.bookhub.Model.Review;
import com.library.bookhub.Service.ReviewService;
import com.library.bookhub.util.JwtTokenUtil;

@Controller
@RequestMapping("/review")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;


    @PostMapping("/add")
    public ResponseEntity<String> addReviewForBook(@RequestHeader(value = "Authorization", required = false) String token ,@RequestBody ReviewDto reviewDto) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if(jwtTokenUtil.getRoleFromToken(token) == 1){
                reviewService.addReviewForEachBook(reviewDto.getBookId(), reviewDto.getUserId(), reviewDto.getRating(), reviewDto.getComment());
            return ResponseEntity.ok("Review updated");
        } 
        else
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update book");
        }
    }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Failed to add review: " + e.getMessage());
        }
    }
    

    @GetMapping("/{bookId}")
    public ResponseEntity<?> getReviewsByBookId(@RequestHeader(value = "Authorization", required = false) String token ,@PathVariable int bookId) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if(jwtTokenUtil.getRoleFromToken(token) == 1){
                List<Review> reviews = reviewService.getReviewsByBookId(bookId);
            return ResponseEntity.ok(reviews);
        } 
        else
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update book");
        }
    }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Failed to get review: " + e.getMessage());
        }
    }
 

//Get average rating
        @GetMapping("/average/{bookId}")
        public ResponseEntity<?> getAverageRating(@RequestHeader(value = "Authorization", required = false) String token ,@PathVariable int bookId) {
            try {
                if (token == null || !token.startsWith("Bearer ")) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
                }
                token = token.substring(7);
                if (jwtTokenUtil.isTokenExpired(token)) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
                }
                if(jwtTokenUtil.getRoleFromToken(token) == 1){
                    double averageRating = reviewService.getAverageRating(bookId);
                    return ResponseEntity.ok(averageRating);
            } 
            else
            {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update book");
            }
        }
            catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("Failed to get review: " + e.getMessage());
            }
        }
    }



