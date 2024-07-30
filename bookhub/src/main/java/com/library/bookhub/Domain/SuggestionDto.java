package com.library.bookhub.Domain;

import lombok.Data;
@Data
public class SuggestionDto {
    
     private String bookName;

    private String author;

    public SuggestionDto(String bookName, String author) {
        this.bookName = bookName;
        this.author = author;
    }
    
}
