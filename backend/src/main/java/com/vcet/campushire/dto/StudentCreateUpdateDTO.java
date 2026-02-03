package com.vcet.campushire.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentCreateUpdateDTO {
    private String firstName;
    private String lastName;
    private String department;
    private Integer batch;
    private Double cgpa;
    private Integer backlogs;
    private String bio;
    private String skills;
    private String certifications;
    private String internships;
    private String projects;
    private String leetcodeUsername;
    private Boolean placementEligible;
}
