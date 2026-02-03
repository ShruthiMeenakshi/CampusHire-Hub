package com.vcet.campushire.dto;

public record CompanyStatsDto(
        String companyName,
        long hires,
        Double averagePackageLPA
) {}
