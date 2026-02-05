package com.vcet.campushire.controller;

import com.vcet.campushire.dto.CompanyVisitDTO;
import com.vcet.campushire.service.CompanyVisitService;
import com.vcet.campushire.util.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/companies/{companyId}/visits")
public class CompanyVisitController {

    private final CompanyVisitService companyVisitService;

    public CompanyVisitController(CompanyVisitService companyVisitService) {
        this.companyVisitService = companyVisitService;
    }

    // POST admin/companies/{companyId}/visits
    @PostMapping
    public ApiResponse<Object> addVisit(
            @PathVariable Long companyId,
            @RequestBody CompanyVisitDTO dto) {

        return new ApiResponse<>(true,
                "Visit recorded successfully",
                companyVisitService.addVisit(companyId, dto));
    }

    // GET admin/companies/{companyId}/visits
    @GetMapping
    public ApiResponse<Object> getVisits(@PathVariable Long companyId) {
        return new ApiResponse<>(true,
                "Visits fetched successfully",
                companyVisitService.getVisits(companyId));
    }

    // GET admin/companies/{companyId}/visits/{year}
    @GetMapping("/{year}")
    public ApiResponse<Object> getVisitsByYear(
            @PathVariable String year,
            @PathVariable Long companyId) {

        return new ApiResponse<>(true,
                "Visits fetched for year " + year,
                companyVisitService.getVisitsByYear(companyId, year));
    }

    // PUT admin/companies/{companyId}/visits/{visitId}
    @PutMapping("/{visitId}")
    public ApiResponse<Object> updateVisitOutcome(
            @PathVariable Long visitId,
            @RequestBody CompanyVisitDTO dto) {

        return new ApiResponse<>(true,
                "Visit outcome updated successfully",
                companyVisitService.updateOutcome(visitId, dto));
    }
}
