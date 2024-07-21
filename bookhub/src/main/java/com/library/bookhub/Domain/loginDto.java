package com.library.bookhub.Domain;

import lombok.Data;

@Data
public class loginDto {

    private String userEmail;
    private String password;
    private int roleId;


    
}
