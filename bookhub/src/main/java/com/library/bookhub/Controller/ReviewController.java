package com.library.bookhub.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.library.bookhub.Service.ReviewService;

@Controller
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add")
    public ResponseEntity<String> addReviewForBook(@RequestParam int bookId, @RequestParam int userId, @RequestParam int rating, @RequestParam String comment) {
        try {
            reviewService.addReviewForEachBook(bookId, userId, rating, comment);
            return new ResponseEntity<>("Review added for the selected book.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add review: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    

}}
