package com.library.bookhub.Service;

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

    public ResponseEntity<String> CheckUser(loginDto user)
    {
        User found = repo.findByUserEmail(user.getUserEmail());
        if(found == null)
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found!!");
        }
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if (passwordEncoder.matches(user.getPassword(), found.getPassword())) {
                return ResponseEntity.ok("Success");
            }
            else
            {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong password");
            }
        }
    }

    

