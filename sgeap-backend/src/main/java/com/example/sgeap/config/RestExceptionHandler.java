package com.example.sgeap.config;

import com.example.sgeap.exceptions.AppException;
import com.example.sgeap.exceptions.ErrorDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(value = {AppException.class})
    @ResponseBody
    public ResponseEntity<ErrorDTO> handlerException(AppException exception) {
        return ResponseEntity.status(exception.getCode())
                .body(ErrorDTO.builder().message(exception.getMessage()).build());
    }
}
