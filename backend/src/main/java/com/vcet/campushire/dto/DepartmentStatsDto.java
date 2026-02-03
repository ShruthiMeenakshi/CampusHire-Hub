package com.vcet.campushire.dto;

public record DepartmentStatsDto(
        String department,
        long totalStudents,
        long placed,
        long unplaced
) {}
