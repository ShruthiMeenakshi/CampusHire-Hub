package com.vcet.campushire.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlacementDriveDTO {
    private Long id;
    private CompanyDTO company;
    private String role;
    private Double packageOffered;
    private Integer numberOfPositions;
    private String driveDate;
    private String location;
    private String description;
    private String status;
    private Double minimumCgpa;
    private Integer maximumBacklogs;
    private String requiredSkills;
}
