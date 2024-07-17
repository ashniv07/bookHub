package com.library.bookhub.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.library.bookhub.Model.User;

@Repository
public interface LoginRepo extends JpaRepository<User,Integer>{
    User findByUserEmail(String userEmail);
    
}
