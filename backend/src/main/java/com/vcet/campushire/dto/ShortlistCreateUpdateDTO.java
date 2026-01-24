package com.vcet.campushire.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShortlistCreateUpdateDTO {
    private Long studentId;
    private Long placementDriveId;
    private String status;
}
