package com.library.bookhub.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.library.bookhub.Service.BorrowInfoService;
import com.library.bookhub.util.JwtTokenUtil;
import com.library.bookhub.Domain.BorrowRequestDto;
import com.library.bookhub.Domain.PendingReqDto;
import com.library.bookhub.Domain.UserBooksDto;

@Controller
@RequestMapping("/borrow")
@CrossOrigin(origins = "http://localhost:5173")
public class BorrowController {

    @Autowired
    private BorrowInfoService borrowInfoService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    // Endpoint for users to request a book borrow
    @PostMapping("/request")
    public ResponseEntity<String> requestBookBorrow(@RequestHeader(value = "Authorization", required = false) String token ,@RequestBody BorrowRequestDto borrowRequestDto) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if(jwtTokenUtil.getRoleFromToken(token) == 1){
                borrowInfoService.requestBookBorrow(borrowRequestDto.getBookId(), borrowRequestDto.getUserId());
                return ResponseEntity.ok("Borrow request submitted successfully.");
        } 
        else
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update book");
        }
    }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Failed to soft delete book: " + e.getMessage());
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
    @PatchMapping("/approve/{borrowId}")
    public ResponseEntity<?> approveBorrowRequest(@RequestHeader(value = "Authorization", required = false) String token,@PathVariable int borrowId ) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if(jwtTokenUtil.getRoleFromToken(token) == 0){
                borrowInfoService.approveBorrowRequest(borrowId);
        String bookUrl = borrowInfoService.getBookUrlByBorrowId(borrowId);
        Map<String, String> response = new HashMap<>();
        response.put("url", bookUrl);
        return ResponseEntity.ok(response);
        } 
        else
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update book");
        }

    }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Failed to soft delete book: " + e.getMessage());
        }
    }



     @GetMapping("/pending-requests")
     public ResponseEntity<?> getPendingBorrowRequests(@RequestHeader(value = "Authorization", required = false) String token ) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if(jwtTokenUtil.getRoleFromToken(token) == 0){
                List<PendingReqDto> pendingRequests = borrowInfoService.getPendingBorrowRequests();
                return new ResponseEntity<>(pendingRequests, HttpStatus.OK);
        } 
        else
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update book");
        }

    }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Failed to soft delete book: " + e.getMessage());
        }
    }
    
    

    @GetMapping("/userbook/{userId}")
    public ResponseEntity<List<UserBooksDto>> getBooksByUserId(@PathVariable int userId) {
        List<UserBooksDto> books = borrowInfoService.getAllBooksForUser(userId);
        return ResponseEntity.ok(books);
    }

    
}
