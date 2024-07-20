package com.library.bookhub.Domain;

import lombok.Data;

@Data
public class BookDto {

    private String bookName;

    private String description;

    private String genre;

    private String author;

    private String type;

    private String edition;
    private String url;

    private String image;
    
}
