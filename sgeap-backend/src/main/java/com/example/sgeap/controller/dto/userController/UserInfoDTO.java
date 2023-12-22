package com.example.sgeap.controller.dto.userController;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfoDTO {
    private String name;

    private String surname;

    private String institute;

    private String direction;

    private String course;

    private String group;
}
