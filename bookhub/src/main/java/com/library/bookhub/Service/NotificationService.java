package com.library.bookhub.Service;

import com.library.bookhub.Model.Notification;
import com.library.bookhub.Repository.NotificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepo notificationRepo;

    public void createNotification(int userId, String message) {
        Notification notification = new Notification();
        notification.setUserId(userId);
        notification.setMessage(message);
        notification.setRead(false);  // Default value
        notification.setCreatedAt(LocalDateTime.now());  // Set current timestamp
        notificationRepo.save(notification);
    }

    public List<Notification> getUserNotifications(int userId) {
        return notificationRepo.findByUserIdOrderByCreatedAtDesc(userId); // Ensure ordering by creation time
    }

    public void markAsRead(int notificationId) {
        Notification notification = notificationRepo.findById(notificationId).orElse(null);
        if (notification != null) {
            notification.setRead(true);
            notificationRepo.save(notification);
        }
    }
}
