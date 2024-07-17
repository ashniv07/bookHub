package com.library.bookhub.Controller;

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
        return "reg"; // Assuming "reg" is your HTML form name or template name
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute User user) {
        userService.registerUser(user);
        return "redirect:/success"; // Redirect to a success page or another endpoint
    }
}
