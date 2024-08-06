package com.library.bookhub.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.library.bookhub.Domain.Userdto;
import com.library.bookhub.Service.UserService;
import com.library.bookhub.util.JwtTokenUtil;

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

     // Updating user info
     @PatchMapping("/updateUser")
     public ResponseEntity<String> updateUser(@RequestHeader(value = "Authorization", required = false) String token, @RequestBody Userdto user) {
         if (token == null || !token.startsWith("Bearer ")) {
             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
         }
         token = token.substring(7);
         if (jwtTokenUtil.isTokenExpired(token)) {
             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
         }
         try {
             int userId = jwtTokenUtil.getUserIdFromToken(token);
             userService.updateUser(userId, user.getUserName(), user.getUserEmail(), user.getPassword());
             return ResponseEntity.ok("User updated successfully");
         } catch (IllegalArgumentException e) {
             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
         }
     }

     
 }


