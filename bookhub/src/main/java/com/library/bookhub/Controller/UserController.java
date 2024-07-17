package com.library.bookhub.Controller;

import com.library.bookhub.Domain.Userdto;
import com.library.bookhub.Model.User;
import com.library.bookhub.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/reg")
    public String showRegistrationForm() {
        return "reg"; 
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody Userdto user) {
        userService.registerUser(user);
        return "redirect:/success"; 
    }
}
