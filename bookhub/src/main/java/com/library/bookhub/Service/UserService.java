package com.library.bookhub.Service;

import com.library.bookhub.Model.User;
import com.library.bookhub.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User registerUser(User user) {
        // Check if username already exists
        if (userRepo.findByUserName(user.getUserName()) != null) {
            throw new IllegalArgumentException("Username already exists");
        }

        // Set default values
        user.setRoleId("USER"); // Default role
        user.setCreatedBy(1);   // Example: ID of the creator
        user.setCreatedAt(LocalDateTime.now()); // Current timestamp
        user.setFlag(true);     // Active by default

        // Save the user entity
        return userRepo.save(user);
    }

    // Additional methods can be added for updating users, fetching details, etc.
}
