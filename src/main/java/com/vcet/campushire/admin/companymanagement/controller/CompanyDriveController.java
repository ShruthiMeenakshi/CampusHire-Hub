package com.vcet.campushire.admin.companymanagement.controller;

import com.vcet.campushire.admin.companymanagement.dto.CompanyDriveDTO;
import com.vcet.campushire.admin.companymanagement.service.CompanyDriveService;
import com.vcet.campushire.admin.companymanagement.util.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/companies/{companyId}/drives")
public class CompanyDriveController {

    private final CompanyDriveService companyDriveService;

    public CompanyDriveController(CompanyDriveService companyDriveService) {
        this.companyDriveService = companyDriveService;
    }

    // POST admin/companies/{companyId}/drives
    @PostMapping
    public ApiResponse<Object> linkDrive(
            @PathVariable Long companyId,
            @RequestBody CompanyDriveDTO dto) {

        return new ApiResponse<>(true,
                "Drive linked successfully",
                companyDriveService.linkDrive(companyId, dto));
    }

    // GET admin/companies/{companyId}/drives
    @GetMapping
    public ApiResponse<Object> getDrives(@PathVariable Long companyId) {
        return new ApiResponse<>(true,
                "Drives fetched successfully",
                companyDriveService.getDrives(companyId));
    }

    // POST admin/companies/{companyId}/drives/clone
    @PostMapping("/clone")
    public ApiResponse<Object> cloneCompanyData(@PathVariable Long companyId) {
        return new ApiResponse<>(true,
                "Company data cloned successfully",
                companyDriveService.cloneCompanyData(companyId));
    }

    // PATCH admin/companies/{companyId}/drives/{id}/archive
    @PatchMapping("/{id}/archive")
    public ApiResponse<Object> archiveDrive(@PathVariable Long id) {
        companyDriveService.archiveDrive(id);
        return new ApiResponse<>(true,
                "Drive archived successfully",
                null);
    }
}
