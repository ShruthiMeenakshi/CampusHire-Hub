package com.vcet.campushire.dto;

public record StudentProfileDto(
        String batch,
        Double cgpa,
        Integer backlogs,
        String skills,
        String certifications,
        String internships,
        String projects,
        String resumeUrl,
        Boolean eligible
) {}
