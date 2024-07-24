package com.library.bookhub.Model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "book")
public class Book {

     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookId;

    private String bookName;

    private String description;

    private String genre;   

    private String author;

    private String type;

    private String edition;

    private LocalDateTime createdAt;

    private int createdBy;

    private LocalDateTime modifiedAt;

    private int modifiedBy;

    private Boolean isDeleted;

    @Column(unique = true)
    private String url;

    private String image;

    public Book orElseThrow(Object object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'orElseThrow'");
    }
    
}
