package com.vcet.campushire.admin.placementdrive.exception;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.vcet.campushire.admin.placementdrive.util.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PlacementDriveNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleNotFound(
            RuntimeException ex) {

        return new ResponseEntity<>(
                ApiResponse.failure(ex.getMessage()),
                HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(InvalidDriveStatusException.class)
    public ResponseEntity<ApiResponse<?>> handleInvalidStatus(
            RuntimeException ex) {

        return new ResponseEntity<>(
                ApiResponse.failure(ex.getMessage()),
                HttpStatus.BAD_REQUEST);
    }
}
