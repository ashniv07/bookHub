package com.library.bookhub.Controller;

import com.library.bookhub.Model.Notification;
import com.library.bookhub.Service.NotificationService;
import com.library.bookhub.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/notification")
@CrossOrigin(origins = "http://localhost:5173")

public class NotificationController {

    @Autowired
    private NotificationService notifService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    // Create a new notification
    @PostMapping("/create")
    public ResponseEntity<String> createNotification(
        @RequestHeader(value = "Authorization", required = false) String token,
        @RequestBody Notification notification
    ) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if (jwtTokenUtil.getRoleFromToken(token) == 1 || jwtTokenUtil.getRoleFromToken(token) == 0) {
                notifService.createNotification(notification.getUserId(), notification.getMessage());
                return ResponseEntity.ok("Notification created successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to create notification");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Failed to create notification: " + e.getMessage());
        }
    }

    // Retrieve all notifications for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserNotifications(
        @RequestHeader(value = "Authorization", required = false) String token,
        @PathVariable int userId
    ) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if (jwtTokenUtil.getRoleFromToken(token) == 1) {
                List<Notification> notifications = notifService.getUserNotifications(userId);
                return ResponseEntity.ok(notifications);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to view notifications");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Failed to retrieve notifications: " + e.getMessage());
        }
    }

    // Mark a notification as read
    @PutMapping("/read/{notificationId}")
    public ResponseEntity<String> markAsRead(
        @RequestHeader(value = "Authorization", required = false) String token,
        @PathVariable int notificationId
    ) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if (jwtTokenUtil.getRoleFromToken(token) == 1) {
                notifService.markAsRead(notificationId);
                return ResponseEntity.ok("Notification marked as read.");
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to mark notification as read");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error marking notification as read: " + e.getMessage());
        }
    }
    @DeleteMapping("/delete/{notificationId}")
    public ResponseEntity<String> deleteNotification(
        @RequestHeader(value = "Authorization", required = false) String token,
        @PathVariable int notificationId
    ) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if (jwtTokenUtil.getRoleFromToken(token) == 1) {
                notifService.deleteNotification(notificationId);
                return ResponseEntity.ok("Notification deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to delete notification");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting notification: " + e.getMessage());
        }
    }
    @PostMapping("/notify-newsletter/{bookId}")
    public ResponseEntity<String> notifyNewsletter(
        @RequestHeader(value = "Authorization", required = false) String token,
        @PathVariable int bookId
    ) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if (jwtTokenUtil.getRoleFromToken(token) == 1 ||jwtTokenUtil.getRoleFromToken(token) == 0) {
                boolean isNotified = notifService.notifyBookRemoval(bookId);
        if (isNotified) {
            return ResponseEntity.ok("Notification sent to the newsletter about the book removal.");
        } else {
            return ResponseEntity.status(500).body("Failed to notify the newsletter.");
        }
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to delete notification");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting notification: " + e.getMessage());
        }
    }
}

