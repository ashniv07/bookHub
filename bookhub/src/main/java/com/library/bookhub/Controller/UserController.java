package com.library.bookhub.Controller;

import com.library.bookhub.Domain.Userdto;
import com.library.bookhub.Model.User;
import com.library.bookhub.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/reg")
    public String showRegistrationForm() {
        return "reg"; 
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Userdto user) {
        userService.registerUser(user);
        return ResponseEntity.ok("success");
        }

    
}
