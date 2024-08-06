package com.library.bookhub.Domain;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class PendingReqDto {
    private int borrowId;
    private String bookname;
    private int userId;
    private String userName;
    private LocalDateTime borrowDate;
    public PendingReqDto(int borrowId, String bookname, int userId, String userName, LocalDateTime borrowDate) {
        this.borrowId = borrowId;
        this.bookname = bookname;
        this.userId = userId;
        this.userName = userName;
        this.borrowDate = borrowDate;
    }
   
   



    
}
