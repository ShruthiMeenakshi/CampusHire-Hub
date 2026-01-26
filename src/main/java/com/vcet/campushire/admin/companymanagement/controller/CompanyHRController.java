package com.vcet.campushire.admin.companymanagement.controller;

import com.vcet.campushire.admin.companymanagement.dto.CompanyHRDTO;
import com.vcet.campushire.admin.companymanagement.service.CompanyHRService;
import com.vcet.campushire.admin.companymanagement.util.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/companies/{companyId}/hr")
public class CompanyHRController {

    private final CompanyHRService companyHRService;

    public CompanyHRController(CompanyHRService companyHRService) {
        this.companyHRService = companyHRService;
    }

    // POST admin/companies/{companyId}/hr
    @PostMapping
    public ApiResponse<Object> addHR(
            @PathVariable Long companyId,
            @RequestBody CompanyHRDTO dto) {

        return new ApiResponse<>(true,
                "HR added successfully",
                companyHRService.addHR(companyId, dto));
    }

    // PUT admin/companies/{companyId}/hr/{hrId}
    @PutMapping("/{hrId}")
    public ApiResponse<Object> updateHR(
            @PathVariable Long hrId,
            @RequestBody CompanyHRDTO dto) {

        return new ApiResponse<>(true,
                "HR updated successfully",
                companyHRService.updateHR(hrId, dto));
    }

    // PATCH admin/companies/{companyId}/hr/{hrId}/primary
    @PatchMapping("/{hrId}/primary")
    public ApiResponse<Object> markPrimaryHR(@PathVariable Long hrId) {
        companyHRService.markPrimaryHR(hrId);
        return new ApiResponse<>(true,
                "Primary HR updated successfully",
                null);
    }

    // PATCH admin/companies/{companyId}/hr/{hrId}/deactivate
    @PatchMapping("/{hrId}/deactivate")
    public ApiResponse<Object> deactivateHR(@PathVariable Long hrId) {
        companyHRService.deactivateHR(hrId);
        return new ApiResponse<>(true,
                "HR deactivated successfully",
                null);
    }

    // GET admin/companies/{companyId}/hr
    @GetMapping
    public ApiResponse<Object> getHRs(@PathVariable Long companyId) {
        return new ApiResponse<>(true,
                "HR list fetched successfully",
                companyHRService.getHRs(companyId));
    }
}
