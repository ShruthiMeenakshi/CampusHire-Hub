package com.vcet.campushire.admin.companymanagement.controller;

import com.vcet.campushire.admin.companymanagement.dto.CompanyEligibilityDTO;
import com.vcet.campushire.admin.companymanagement.service.CompanyEligibilityService;
import com.vcet.campushire.admin.companymanagement.util.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/companies/{companyId}/eligibility")
public class CompanyEligibilityController {

    private final CompanyEligibilityService companyEligibilityService;

    public CompanyEligibilityController(CompanyEligibilityService companyEligibilityService) {
        this.companyEligibilityService = companyEligibilityService;
    }

    // POST admin/companies/{companyId}/eligibility
    @PostMapping
    public ApiResponse<Object> saveEligibility(
            @PathVariable Long companyId,
            @RequestBody CompanyEligibilityDTO dto) {

        return new ApiResponse<>(true,
                "Eligibility saved successfully",
                companyEligibilityService.saveEligibility(companyId, dto));
    }

    // PUT admin/companies/{companyId}/eligibility/{eligibilityId}
    @PutMapping("/{eligibilityId}")
    public ApiResponse<Object> updateEligibility(
            @PathVariable Long eligibilityId,
            @RequestBody CompanyEligibilityDTO dto) {

        return new ApiResponse<>(true,
                "Eligibility updated successfully",
                companyEligibilityService.updateEligibility(eligibilityId, dto));
    }

    // PATCH admin/companies/{companyId}/eligibility/{eligibilityId}/lock
    @PatchMapping("/{eligibilityId}/lock")
    public ApiResponse<Object> lockEligibility(@PathVariable Long eligibilityId) {
        companyEligibilityService.lockEligibility(eligibilityId);
        return new ApiResponse<>(true,
                "Eligibility locked successfully",
                null);
    }

    // GET admin/companies/{companyId}/eligibility
    @GetMapping
    public ApiResponse<Object> getEligibility(@PathVariable Long companyId) {
        return new ApiResponse<>(true,
                "Eligibility fetched successfully",
                companyEligibilityService.getEligibility(companyId));
    }
}
