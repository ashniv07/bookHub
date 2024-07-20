package com.library.bookhub.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.library.bookhub.Model.BorrowInfo;
import com.library.bookhub.Service.BorrowInfoService;
import com.library.bookhub.Domain.BorrowRequestDto;
import com.library.bookhub.Domain.PendingReqDto;

@Controller
@RequestMapping("/borrow")
@CrossOrigin(origins = "http://localhost:5173")
public class BorrowController {

    @Autowired
    private BorrowInfoService borrowInfoService;

    // Endpoint for users to request a book borrow
    @PostMapping("/request")
    public ResponseEntity<String> requestBookBorrow(@RequestBody BorrowRequestDto borrowRequestDto) {
        try {
            borrowInfoService.requestBookBorrow(borrowRequestDto.getBookId(), borrowRequestDto.getUserId());
            return ResponseEntity.ok("Borrow request submitted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to submit borrow request: " + e.getMessage());
        }
    }

    // // Endpoint for admins to get all pending borrow requests
    // @GetMapping("/admin/pending-requests")
    // public ResponseEntity<List<BorrowInfo>> getPendingBorrowRequests() {
    //     try {
    //         List<BorrowInfo> pendingRequests = borrowInfoService.getPendingBorrowRequests();
    //         return ResponseEntity.ok(pendingRequests);
    //     } catch (Exception e) {
    //         return ResponseEntity.status(500).body(null);
    //     }
    // }

    // Endpoint for admins to approve a borrow request
    @PatchMapping("/admin/approve/{borrowId}")
    public ResponseEntity<String> approveBorrowRequest(@PathVariable int borrowId) {
        try {
            borrowInfoService.approveBorrowRequest(borrowId);
            return ResponseEntity.ok("Borrow request approved.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to approve borrow request: " + e.getMessage());
        }
    }

     @GetMapping("/pending-requests")
    public ResponseEntity<List<PendingReqDto>> getPendingBorrowRequests() {
        List<PendingReqDto> pendingRequests = borrowInfoService.getPendingBorrowRequests();
        return new ResponseEntity<>(pendingRequests, HttpStatus.OK);
    }
}
