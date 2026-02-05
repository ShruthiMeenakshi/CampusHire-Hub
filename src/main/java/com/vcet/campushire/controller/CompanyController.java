package com.vcet.campushire.controller;

import com.vcet.campushire.dto.CompanyRequestDTO;
import com.vcet.campushire.service.CompanyService;
import com.vcet.campushire.util.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/companies")
public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    // POST admin/companies
    @PostMapping
    public ApiResponse<Object> createCompany(@RequestBody CompanyRequestDTO dto) {
        return new ApiResponse<>(true,
                "Company created successfully",
                companyService.createCompany(dto));
    }

    // PUT admin/companies/{companyId}
    @PutMapping("/{companyId}")
    public ApiResponse<Object> updateCompany(
            @PathVariable Long companyId,
            @RequestBody CompanyRequestDTO dto) {

        return new ApiResponse<>(true,
                "Company updated successfully",
                companyService.updateCompany(companyId, dto));
    }

    // GET admin/companies/{companyId}
    @GetMapping("/{companyId}")
    public ApiResponse<Object> getCompany(@PathVariable Long companyId) {
        return new ApiResponse<>(true,
                "Company fetched successfully",
                companyService.getCompany(companyId));
    }

    // GET admin/companies
    @GetMapping
    public ApiResponse<Object> getAllCompanies() {
        return new ApiResponse<>(true,
                "Companies fetched successfully",
                companyService.getAllCompanies());
    }

    // PATCH admin/companies/{companyId}/status
    @PatchMapping("/{companyId}/status")
    public ApiResponse<Object> toggleCompanyStatus(@PathVariable Long companyId) {
        companyService.toggleCompanyStatus(companyId);
        return new ApiResponse<>(true,
                "Company status updated successfully",
                null);
    }
}
