package com.library.bookhub.Service;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.library.bookhub.Model.Review;
import com.library.bookhub.Repository.ReviewRepo;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepo reviewRepository;

    public void addReviewForEachBook(int bookId, int userId, int rating, String comment) {
            Review review = new Review();
            review.setBookId(bookId);
            review.setUserId(userId);
            review.setRating(rating);
            review.setComment(comment);
            review.setCreatedAt(LocalDateTime.now());
            reviewRepository.save(review);
        }

        
        public List<Review> getReviewsByBookId(int bookId) {
            return reviewRepository.findByBookId(bookId);
        }


        public double getAverageRating(int bookId) {
            List<Review> reviews = reviewRepository.findByBookId(bookId);
            if (reviews.isEmpty()) return 0;
            double sum = reviews.stream().mapToInt(Review::getRating).sum();
            return sum / reviews.size();
        }
}
