package com.vcet.campushire.controller;

import com.vcet.campushire.dto.AnalyticsSummary;
import com.vcet.campushire.dto.CompanyStatsDto;
import com.vcet.campushire.dto.DepartmentStatsDto;
import com.vcet.campushire.dto.PlacementStatsDto;
import com.vcet.campushire.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/summary")
    @PreAuthorize("hasAnyRole('FACULTY','PLACEMENT_HEAD')")
    public ResponseEntity<AnalyticsSummary> summary() {
        return ResponseEntity.ok(analyticsService.getSummary());
    }

    @GetMapping("/placements")
    @PreAuthorize("hasAnyRole('FACULTY','PLACEMENT_HEAD')")
    public ResponseEntity<PlacementStatsDto> placements() {
        return ResponseEntity.ok(analyticsService.getPlacementStats());
    }

    @GetMapping("/company-stats")
    @PreAuthorize("hasAnyRole('FACULTY','PLACEMENT_HEAD')")
    public ResponseEntity<java.util.List<CompanyStatsDto>> companyStats() {
        return ResponseEntity.ok(analyticsService.getCompanyStats());
    }

    @GetMapping("/department-stats")
    @PreAuthorize("hasAnyRole('FACULTY','PLACEMENT_HEAD')")
    public ResponseEntity<java.util.List<DepartmentStatsDto>> departmentStats() {
        return ResponseEntity.ok(analyticsService.getDepartmentStats());
    }
}
