package com.library.bookhub.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "borrow_info")
public class BorrowInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int borrowId;
    private int bookId;
    private int userId;
    private LocalDateTime borrowDate;
    private boolean accessGranted;
    private LocalDateTime accessCutDate;
    private boolean flag; //Here flag is true is req is pending else it is false 
}

