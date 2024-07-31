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


    //To check if user exists
    public boolean isUsernameExists(String username) {
        return userRepo.findByUserName(username) != null;
    }


    //Geting current user
    public User getCurrentUser(int i) {
        return userRepo.findByUserId(i);
    }


    //Registering user
    public void registerUser(Userdto user) {
        if (isUsernameExists(user.getUserName())) {
            throw new IllegalArgumentException("Username already exists");
        }
        User u = new User();
        u.setUserName(user.getUserName());
        u.setUserEmail(user.getUserEmail());
        u.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        u.setRoleId(1);
        u.setCreatedBy(1);
        u.setCreatedAt(LocalDateTime.now());
        u.setFlag(true);
        userRepo.save(u);
    }


    //For login
    public User findByUserEmail(String userEmail) {
        return userRepo.findByUserEmail(userEmail);
    }
}
