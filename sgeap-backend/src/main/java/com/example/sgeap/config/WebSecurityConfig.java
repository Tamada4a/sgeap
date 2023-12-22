package com.example.sgeap.config;

import com.example.sgeap.jwt.JwtAuthFilter;
import com.example.sgeap.jwt.UserAuthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig implements WebMvcConfigurer {

    private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;
    private final UserAuthProvider userAuthProvider;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.exceptionHandling(exception -> exception.authenticationEntryPoint(userAuthenticationEntryPoint))
                .addFilterBefore(new JwtAuthFilter(userAuthProvider), BasicAuthenticationFilter.class)
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((req) -> req
                        .requestMatchers(HttpMethod.POST,
                                "/auth/login",
                                "/auth",
                                "/auth/register").permitAll()
                        .requestMatchers(HttpMethod.GET,
                                "/getUserInfo/*",
                                "/getInstitutes").permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }
}