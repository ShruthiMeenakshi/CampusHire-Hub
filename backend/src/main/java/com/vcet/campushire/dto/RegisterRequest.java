package com.vcet.campushire.dto;

import com.vcet.campushire.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterRequest(
        @Email String email,
        String rollNo,
        @NotBlank String password,
        @NotNull Role role,
        @NotBlank String fullName,
        String department
) {}
