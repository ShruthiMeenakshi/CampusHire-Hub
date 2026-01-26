package com.vcet.campushire.admin.companymanagement.mapper;

import com.vcet.campushire.admin.companymanagement.dto.CompanyJobRoleDTO;
import com.vcet.campushire.admin.companymanagement.model.CompanyJobRole;

public class CompanyJobRoleMapper {

    private CompanyJobRoleMapper() {
    }

    public static CompanyJobRoleDTO toDTO(CompanyJobRole role) {
        CompanyJobRoleDTO dto = new CompanyJobRoleDTO();
        dto.setId(role.getId());
        dto.setRoleTitle(role.getRoleTitle());
        dto.setJobDescription(role.getJobDescription());
        dto.setRequiredSkills(role.getRequiredSkills());
        dto.setEmploymentType(role.getEmploymentType());
        dto.setActive(role.isActive());
        return dto;
    }


}
