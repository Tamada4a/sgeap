package com.example.sgeap.interfaces;

import com.example.sgeap.dto.InstituteDTO;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InstituteRepository extends MongoRepository<InstituteDTO, String> {
}
