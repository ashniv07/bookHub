package com.library.bookhub.Domain;

import lombok.Data;

@Data

public class UserBooksDto {
    private String bookName;
    private String author;
    private String image;
    private String userName;
    public UserBooksDto(String bookName, String author, String image, String userName) {
        this.bookName = bookName;
        this.author = author;
        this.image = image;
        this.userName = userName;
    }
    
    
    }
    

