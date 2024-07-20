package com.library.bookhub.Domain;

import lombok.Data;

@Data
public class ReviewDto {
    private int bookId;
    private int userId;
    private int rating;
    private String comment;
    
}
