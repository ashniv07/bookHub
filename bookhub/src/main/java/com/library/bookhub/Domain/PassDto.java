package com.library.bookhub.Domain;

import lombok.Data;

@Data
public class PassDto {
    private int userId;
    private String oldPassword;
    private String newPassword;
}
