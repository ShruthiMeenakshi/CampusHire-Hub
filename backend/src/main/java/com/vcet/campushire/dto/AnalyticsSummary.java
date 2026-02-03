package com.vcet.campushire.dto;

public record AnalyticsSummary(
        long totalStudents,
        long eligibleStudents,
        long upcomingEvents,
        long pastEvents,
        Double averagePackageLPA,
        Double highestPackageLPA
) {}
