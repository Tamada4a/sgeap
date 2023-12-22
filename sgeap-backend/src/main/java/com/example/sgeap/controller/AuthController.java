package com.example.sgeap.controller;

import com.example.sgeap.controller.dto.auth.AuthUserDTO;
import com.example.sgeap.controller.dto.auth.LoginDTO;
import com.example.sgeap.dto.UserDTO;
import com.example.sgeap.jwt.UserAuthProvider;
import com.example.sgeap.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final UserAuthProvider userAuthProvider;


    @PostMapping("/login")
    public ResponseEntity<AuthUserDTO> login(@RequestBody LoginDTO loginDTO) {
        AuthUserDTO authUser = authService.login(loginDTO);
        authUser.setToken(userAuthProvider.createToken(authUser.getNickname(), loginDTO.getIsRememberMe()));

        return ResponseEntity.ok(authUser);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthUserDTO> register(@RequestBody UserDTO userDTO) {
        AuthUserDTO authUser = authService.register(userDTO);
        authUser.setToken(userAuthProvider.createToken(userDTO.getNickname(), false));

        return ResponseEntity.created(URI.create("/" + authUser.getNickname())).body(authUser);
    }
}
