package com.library.bookhub.Service;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.library.bookhub.Domain.loginDto;
import com.library.bookhub.Model.User;
import com.library.bookhub.Repository.UserRepo;

@Service
public class logService {

    @Autowired
    private UserRepo repo;

    public ResponseEntity<String> CheckUser(loginDto user)
    {
        User found = repo.findByUserName("da");
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (passwordEncoder.matches(user.getPassword(), found.getPassword())) {

                return ResponseEntity.ok("Success");
 
            }
            else
            {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error message");
            }
        }
    }

    

