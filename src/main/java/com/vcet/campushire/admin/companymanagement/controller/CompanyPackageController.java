package com.vcet.campushire.admin.companymanagement.controller;

import com.vcet.campushire.admin.companymanagement.dto.CompanyPackageDTO;
import com.vcet.campushire.admin.companymanagement.service.CompanyPackageService;
import com.vcet.campushire.admin.companymanagement.util.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/companies/{companyId}/packages")
public class CompanyPackageController {

    private final CompanyPackageService companyPackageService;

    public CompanyPackageController(CompanyPackageService companyPackageService) {
        this.companyPackageService = companyPackageService;
    }

    // POST admin/companies/{companyId}/packages
    @PostMapping
    public ApiResponse<Object> addPackage(
            @PathVariable Long companyId,
            @RequestBody CompanyPackageDTO dto) {

        return new ApiResponse<>(true,
                "Package added successfully",
                companyPackageService.addPackage(companyId, dto));
    }

    // PUT admin/companies/{companyId}/packages/{packageId}
    @PutMapping("/{packageId}")
    public ApiResponse<Object> updatePackage(
            @PathVariable Long packageId,
            @RequestBody CompanyPackageDTO dto) {

        return new ApiResponse<>(true,
                "Package updated successfully",
                companyPackageService.updatePackage(packageId, dto));
    }

    // GET admin/companies/{companyId}/packages
    @GetMapping
    public ApiResponse<Object> getPackages(@PathVariable Long companyId) {
        return new ApiResponse<>(true,
                "Packages fetched successfully",
                companyPackageService.getPackages(companyId));
    }

    // GET admin/companies/{companyId}/packages/stats
    @GetMapping("/stats")
    public ApiResponse<Object> getPackageStats(@PathVariable Long companyId) {
        return new ApiResponse<>(true,
                "Package statistics fetched successfully",
                companyPackageService.getPackageStats(companyId));
    }
}
