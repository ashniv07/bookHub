package com.library.bookhub.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.library.bookhub.Domain.AuthDto;
import com.library.bookhub.Domain.loginDto;
import com.library.bookhub.Model.User;
import com.library.bookhub.Service.UserService;
import com.library.bookhub.Service.logService;
import com.library.bookhub.util.JwtTokenUtil;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class LogController {

    @Autowired
    private logService logService;
    @Autowired
    private UserService userservice;
    @Autowired
    private JwtTokenUtil jwtTokenUtil; 
    @PostMapping("/login")
    public ResponseEntity<?> handleLogin(@RequestBody loginDto user) {     
          
        int role = logService.CheckUser(user);
        if(role == -1 )
            return ResponseEntity.status(404).body("Email not found");
        else if(role ==-2)
            return ResponseEntity.status(404).body("Incorrect Password");
        else
            {
                User u = userservice.findByUserEmail( user.getUserEmail());
                int userid = u.getUserId();
               
                AuthDto a = new AuthDto();
                
                a.setUserId(userid);
                a.setRoleId(role);
                String token = jwtTokenUtil.generateToken(a);
                return ResponseEntity.status(201).body(token);

            }
    }   
    
}
