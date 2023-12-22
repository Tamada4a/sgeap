package com.example.sgeap.interfaces;

import com.example.sgeap.dto.UserDTO;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserDTO, String> {
    UserDTO findByNickname(final String nickname);

    boolean existsByNickname(final String nickname);
}
