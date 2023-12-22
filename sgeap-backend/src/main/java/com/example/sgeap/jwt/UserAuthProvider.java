package com.example.sgeap.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.sgeap.dto.UserDTO;
import com.example.sgeap.services.AuthService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class UserAuthProvider {

    @Value("${security.jwt.token.secret-key:secret-value}")
    private String secretKey;

    private final AuthService authService;


    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }


    public String createToken(String login, Boolean isRememberMe) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 3_600_000);
        if (isRememberMe)
            return JWT.create()
                    .withIssuer(login)
                    .withIssuedAt(now)
                    .sign(Algorithm.HMAC256(secretKey));

        return JWT.create()
                .withIssuer(login)
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .sign(Algorithm.HMAC256(secretKey));
    }


    public Authentication validateToken(String token) {
        JWTVerifier jwtVerifier = JWT.require(Algorithm.HMAC256(secretKey)).build();

        DecodedJWT decodedJWT = jwtVerifier.verify(token);

        UserDTO user = authService.findByNickname(decodedJWT.getIssuer());

        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
    }
}