package com.example.sgeap.dto;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document("Institute")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InstituteDTO {
    @Id
    private String name;

    private ArrayList<String> directions;
}
