package com.springboot.app.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@SuppressWarnings("serial")
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{

    public ResourceNotFoundException() { }

    public ResourceNotFoundException(String entity, Long id) {
        super(entity + " id " + id + " not found");
    }
    
}