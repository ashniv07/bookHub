package com.library.bookhub.Domain;

import lombok.Data;

@Data
public class ResultDto {

    private int bookId;

    private String bookName;
    private String description;
    private String genre;
    private String author;
    private String type;
    private String edition;
    private String url;
    private String image;
    public ResultDto(int bookId, String bookName, String description, String genre, String author, String type,
            String edition, String url, String image) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.description = description;
        this.genre = genre;
        this.author = author;
        this.type = type;
        this.edition = edition;
        this.url = url;
        this.image = image;
    }

    

}
