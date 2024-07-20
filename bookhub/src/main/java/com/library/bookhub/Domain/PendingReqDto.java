package com.library.bookhub.Domain;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class PendingReqDto {
    private String bookname;
    private String userName;
    private LocalDateTime borrowDate;
    public PendingReqDto(String bookname, String userName, LocalDateTime borrowDate) {
        this.bookname = bookname;
        this.userName = userName;
        this.borrowDate = borrowDate;
    }


    
}
