package com.library.bookhub.Service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.library.bookhub.Domain.loginDto;
import com.library.bookhub.Model.User;
import com.library.bookhub.Repository.LoginRepo;

@Service
public class logService {

    @Autowired
    private LoginRepo repo;

    public ResponseEntity<?> CheckUser(loginDto user) {
        User found = repo.findByUserEmail(user.getUserEmail());
        if (found == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found!!");
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (passwordEncoder.matches(user.getPassword(), found.getPassword())) {
            // Create a map to hold the response data
            Map<String, Object> response = new HashMap<>();
            response.put("roleId", found.getRoleId());
            response.put("message", "Login successful");

            // Return the response with status OK
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong password");
        }
    }
}