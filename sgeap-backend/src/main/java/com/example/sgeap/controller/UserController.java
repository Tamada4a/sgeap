package com.example.sgeap.controller;

import com.example.sgeap.controller.dto.userController.UserInfoDTO;
import com.example.sgeap.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


    @GetMapping("/getUserInfo/{nickname}")
    public ResponseEntity<UserInfoDTO> getUserInfo(@PathVariable("nickname") String nickname){
        return ResponseEntity.ok(userService.getUserInfo(nickname));
    }
}
