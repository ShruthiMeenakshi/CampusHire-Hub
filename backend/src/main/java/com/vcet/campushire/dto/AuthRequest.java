package com.vcet.campushire.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthRequest(
        @NotBlank String username, // email or rollNo
        @NotBlank String password
) {}
