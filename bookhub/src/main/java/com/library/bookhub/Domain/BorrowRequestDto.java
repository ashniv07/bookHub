package com.library.bookhub.Domain;

import lombok.Data;

@Data
public class BorrowRequestDto {
    private int bookId;
    private int userId;
    
}
