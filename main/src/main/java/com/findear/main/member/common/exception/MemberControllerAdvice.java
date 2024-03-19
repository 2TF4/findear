package com.findear.main.member.common.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class MemberControllerAdvice {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleAllException(Exception e) {
        e.printStackTrace();
        return ResponseEntity
                .internalServerError()
                .build();
    }
}
