package com.vcet.campushire.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyDTO {
    private Long id;
    private String name;
    private String description;
    private String website;
    private String industry;
    private Integer totalHires;
}
