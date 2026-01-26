package com.vcet.campushire.admin.companymanagement.exception;

import com.vcet.campushire.admin.companymanagement.util.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice("com.vcet.campushire.admin.companymanagement")
public class CompanyManagementExceptionHandler  {

    @ExceptionHandler(CompanyNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleCompanyNotFound(
            CompanyNotFoundException ex) {

        return new ResponseEntity<>(
                new ApiResponse<>(false, ex.getMessage(), null),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(DuplicateCompanyException.class)
    public ResponseEntity<ApiResponse<Object>> handleDuplicateCompany(
            DuplicateCompanyException ex) {

        return new ResponseEntity<>(
                new ApiResponse<>(false, ex.getMessage(), null),
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(InvalidEligibilityException.class)
    public ResponseEntity<ApiResponse<Object>> handleInvalidEligibility(
            InvalidEligibilityException ex) {

        return new ResponseEntity<>(
                new ApiResponse<>(false, ex.getMessage(), null),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGenericException(
            Exception ex) {

        return new ResponseEntity<>(
                new ApiResponse<>(false, "Internal Server Error", null),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
