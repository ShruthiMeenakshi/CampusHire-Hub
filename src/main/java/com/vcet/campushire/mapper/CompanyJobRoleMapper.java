package com.vcet.campushire.mapper;

import com.vcet.campushire.dto.CompanyJobRoleDTO;
import com.vcet.campushire.model.CompanyJobRole;

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
