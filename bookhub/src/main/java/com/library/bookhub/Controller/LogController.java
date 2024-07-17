package com.library.bookhub.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.library.bookhub.Domain.loginDto;
import com.library.bookhub.Model.User;
import com.library.bookhub.Service.logService;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class LogController {

    @Autowired
    private logService logService;

   @PostMapping("/login")
    public ResponseEntity<String> handleLogin(@RequestBody loginDto user) {
        return logService.CheckUser(user);
    
}
}
