package com.example.sgeap.controller.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class LoginDTO {
    private String nick;
    private char[] password;
    private Boolean isRememberMe;
}
