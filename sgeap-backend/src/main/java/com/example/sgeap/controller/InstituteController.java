package com.example.sgeap.controller;

import com.example.sgeap.dto.InstituteDTO;
import com.example.sgeap.interfaces.InstituteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequiredArgsConstructor
public class InstituteController {
    private final InstituteRepository instituteRepository;


    @GetMapping("/getInstitutes")
    public ResponseEntity<List<InstituteDTO>> getInstitutes() {
        return ResponseEntity.ok(instituteRepository.findAll());
    }
}
