package com.library.bookhub.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.library.bookhub.Model.Review;

@Repository
public interface ReviewRepo extends JpaRepository<Review,Integer> {
    
    
}
