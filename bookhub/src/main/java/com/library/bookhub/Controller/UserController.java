package com.library.bookhub.Controller;

import com.library.bookhub.Domain.Userdto;
import com.library.bookhub.Model.User;
import com.library.bookhub.Service.UserService;
import com.library.bookhub.util.JwtTokenUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;


    //To register
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Userdto user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("success");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    //gettig user info
        @GetMapping("/userinfo")
    public ResponseEntity<?> getAllVehicles(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if(jwtTokenUtil.getRoleFromToken(token) == 0 || jwtTokenUtil.getRoleFromToken(token)==1){
           
            return ResponseEntity.ok().body(userService.getCurrentUser(jwtTokenUtil.getUserIdFromToken(token)));
        }
        else
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doesn't have access to the resource");        
    }


}
