package com.library.bookhub.Model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="review")
public class Review {

     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewId;
    private int bookId;
    private int userId;
    private int rating;
    private String comment;
    private LocalDateTime createdAt;
}
