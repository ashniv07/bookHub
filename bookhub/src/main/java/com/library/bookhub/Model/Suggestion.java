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
@Table(name = "suggestion")
public class Suggestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "suggestion_id") 
    private int suggestionId;

    @Column(name = "bookName") 
    private String bookName;

    @Column(name = "authorName")
    private String author;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

}
