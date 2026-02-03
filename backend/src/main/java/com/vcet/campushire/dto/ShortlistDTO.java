package com.vcet.campushire.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShortlistDTO {
    private Long id;
    private StudentDTO student;
    private PlacementDriveDTO placementDrive;
    private String status;
    private String shortlistedAt;
}
