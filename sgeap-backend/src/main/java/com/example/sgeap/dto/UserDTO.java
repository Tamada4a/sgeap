package com.example.sgeap.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("User")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {
    @Id
    private String nickname;

    private String password;

    private String name;

    private String surname;

    private String direction;

    private String institute;

    private String course;

    private String group;
}
