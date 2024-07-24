package com.library.bookhub.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.library.bookhub.Domain.loginDto;
import com.library.bookhub.Service.logService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class LogController {

    @Autowired
    private logService logService;

    @PostMapping("/login")
    public ResponseEntity<?> handleLogin(@RequestBody loginDto user) {        
        ResponseEntity<?> response = logService.CheckUser(user);
        return ResponseEntity.status(response.getStatusCode()).body(response.getBody());
    }
    
}
