package com.vcet.campushire.dto;

import java.time.LocalDate;

public record EventDto(
        String companyName,
        String role,
        Double packageLPA,
        LocalDate eventDate,
        String details
) {}
