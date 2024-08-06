package com.library.bookhub.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.library.bookhub.Domain.loginDto;
import com.library.bookhub.Model.User;
import com.library.bookhub.Repository.LoginRepo;

@Service
public class logService {

    @Autowired
    private LoginRepo repo;

    public int CheckUser(loginDto user) {
        User found = repo.findByUserEmail(user.getUserEmail());
        if (found == null) {
            return -1;
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (passwordEncoder.matches(user.getPassword(), found.getPassword())) {
            int role = found.getRoleId();
            return role;
        } else {
            return -2;
        }
    }
}