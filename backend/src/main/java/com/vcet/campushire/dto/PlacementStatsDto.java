package com.vcet.campushire.dto;

public record PlacementStatsDto(
        long totalStudents,
        long placed,
        long unplaced,
        double placedPercentage
) {}
