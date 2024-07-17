package com.library.bookhub.Service;

import com.library.bookhub.Domain.Userdto;
import com.library.bookhub.Model.User;
import com.library.bookhub.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;


    public void registerUser(Userdto user) {
        User u = new User();
        u.setUserName(user.getUserName());
        u.setUserEmail(user.getUserEmail());

        BCryptPasswordEncoder encodedPassword = new BCryptPasswordEncoder();
       
        u.setPassword(encodedPassword.encode(user.getPassword()));
        u.setRoleId("USER"); 
        u.setCreatedBy(1);  
        u.setCreatedAt(LocalDateTime.now()); 
        u.setFlag(true);     

        userRepo.save(u);
    }

}
