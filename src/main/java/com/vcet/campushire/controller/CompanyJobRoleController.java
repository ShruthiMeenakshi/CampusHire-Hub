package com.vcet.campushire.controller;

import com.vcet.campushire.dto.CompanyJobRoleDTO;
import com.vcet.campushire.service.CompanyJobRoleService;
import com.vcet.campushire.util.ApiResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/companies/{companyId}/roles")
public class CompanyJobRoleController {

    private final CompanyJobRoleService companyJobRoleService;

    public CompanyJobRoleController(CompanyJobRoleService companyJobRoleService) {
        this.companyJobRoleService = companyJobRoleService;
    }

    // POST admin/companies/{companyId}/roles
    @PostMapping
    public ApiResponse<Object> addRole(
            @PathVariable Long companyId,
            @RequestBody CompanyJobRoleDTO dto) {

        return new ApiResponse<>(true,
                "Job role added successfully",
                companyJobRoleService.addRole(companyId, dto));
    }

    // PUT admin/companies/{companyId}/roles/{roleId}
    @PutMapping("/{roleId}")
    public ApiResponse<Object> updateRole(
            @PathVariable Long roleId,
            @RequestBody CompanyJobRoleDTO dto) {

        return new ApiResponse<>(true,
                "Job role updated successfully",
                companyJobRoleService.updateRole(roleId, dto));
    }

    // PATCH admin/companies/{companyId}/roles/{roleId}/status
    @PatchMapping("/{roleId}/status")
    public ApiResponse<Object> toggleRoleStatus(@PathVariable Long roleId) {
        companyJobRoleService.toggleRoleStatus(roleId);
        return new ApiResponse<>(true,
                "Job role status updated successfully",
                null);
    }

    // GET admin/companies/{companyId}/roles
    @GetMapping
    public ApiResponse<Object> getRoles(@PathVariable Long companyId) {
        return new ApiResponse<>(true,
                "Job roles fetched successfully",
                companyJobRoleService.getRoles(companyId));
    }
}
