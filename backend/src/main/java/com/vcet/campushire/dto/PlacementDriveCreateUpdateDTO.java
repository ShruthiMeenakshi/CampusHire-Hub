package com.vcet.campushire.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlacementDriveCreateUpdateDTO {
    private Long companyId;
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
