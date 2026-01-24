package com.vcet.campushire.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeetCodeStatsDTO {
    private Long id;
    private Integer totalSolved;
    private Integer easySolved;
    private Integer mediumSolved;
    private Integer hardSolved;
    private Double acceptanceRate;
    private String lastUpdated;
}
