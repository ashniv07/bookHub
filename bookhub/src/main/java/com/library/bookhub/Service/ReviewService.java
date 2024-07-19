package com.library.bookhub.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.library.bookhub.Model.Book;
import com.library.bookhub.Model.Review;
import com.library.bookhub.Repository.BookRepo;
import com.library.bookhub.Repository.ReviewRepo;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepo reviewRepository;
    private BookRepo bookRepository;

    public void addReviewForEachBook(int userId, int rating, String comment) {
        List<Book> books = bookRepository.findAll();
        for (Book book : books) {
            Review review = new Review();
            review.setBookId(book.getBookId());
            review.setUserId(userId);
            review.setRating(rating);
            review.setComment(comment);
            reviewRepository.save(review);
        }
    
}}
