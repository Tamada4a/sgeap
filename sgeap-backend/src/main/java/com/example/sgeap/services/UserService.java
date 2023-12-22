package com.example.sgeap.services;

import com.example.sgeap.controller.dto.userController.UserInfoDTO;
import com.example.sgeap.dto.UserDTO;
import com.example.sgeap.exceptions.AppException;
import com.example.sgeap.interfaces.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;


    public UserInfoDTO getUserInfo(String nickname){
        if (!userRepository.existsByNickname(nickname))
            throw new AppException("Неизвестный пользователь", HttpStatus.NOT_FOUND);

        UserDTO userDTO = userRepository.findByNickname(nickname);
        return new UserInfoDTO(userDTO.getName(), userDTO.getSurname(), userDTO.getInstitute(), userDTO.getDirection(), userDTO.getCourse(), userDTO.getGroup());
    }
}
