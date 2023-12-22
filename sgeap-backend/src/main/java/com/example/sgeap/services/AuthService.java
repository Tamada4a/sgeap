package com.example.sgeap.services;

import com.example.sgeap.controller.dto.auth.AuthUserDTO;
import com.example.sgeap.controller.dto.auth.LoginDTO;
import com.example.sgeap.dto.UserDTO;
import com.example.sgeap.exceptions.AppException;
import com.example.sgeap.interfaces.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDTO findByNickname(String nick) {
        if (!userRepository.existsByNickname(nick))
            throw new AppException("Неизвестный пользователь", HttpStatus.NOT_FOUND);

        return userRepository.findByNickname(nick);
    }


    public AuthUserDTO login(LoginDTO loginDTO) {
        if (!userRepository.existsByNickname(loginDTO.getNick()))
            throw new AppException("Неизвестный пользователь", HttpStatus.NOT_FOUND);

        UserDTO user = userRepository.findByNickname(loginDTO.getNick());

        if (passwordEncoder.matches(CharBuffer.wrap(loginDTO.getPassword()), user.getPassword()))
            return toAuthUserDTO(user);
        throw new AppException("Неправильный пароль", HttpStatus.BAD_REQUEST);
    }


    public AuthUserDTO register(UserDTO user) {
        if (userRepository.existsByNickname(user.getNickname()))
            throw new AppException("Пользователь с таким ником уже существует", HttpStatus.BAD_REQUEST);

        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(user.getPassword())));

        UserDTO savedUser = userRepository.save(user);

        return toAuthUserDTO(savedUser);
    }


    private AuthUserDTO toAuthUserDTO(UserDTO user) {
        return new AuthUserDTO(user.getNickname(), "");
    }
}