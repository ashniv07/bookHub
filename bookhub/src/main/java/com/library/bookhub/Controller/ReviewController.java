package com.library.bookhub.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.library.bookhub.Domain.ReviewDto;
import com.library.bookhub.Model.Review;
import com.library.bookhub.Service.ReviewService;

@Controller
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add")
    public ResponseEntity<String> addReviewForBook(@RequestBody ReviewDto reviewDto) {
        try {
            reviewService.addReviewForEachBook(reviewDto.getBookId(), reviewDto.getUserId(), reviewDto.getRating(), reviewDto.getComment());
            return ResponseEntity.ok("Review updated");
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add review: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<List<Review>> getReviewsByBookId(@PathVariable int bookId) {
        try {
            List<Review> reviews = reviewService.getReviewsByBookId(bookId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
}}
