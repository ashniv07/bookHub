package com.library.bookhub.Model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "notification")
public class Notification {

    @Id
      private int id; 
    private String message;
    private int userId; 
    private boolean isRead;
    private LocalDateTime createdAt;
}