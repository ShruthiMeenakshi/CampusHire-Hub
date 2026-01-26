package com.vcet.campushire.admin.companymanagement.mapper;

import com.vcet.campushire.admin.companymanagement.dto.CompanyHRDTO;
import com.vcet.campushire.admin.companymanagement.model.CompanyHR;

public class CompanyHRMapper {

    private CompanyHRMapper() {
    }

    public static CompanyHRDTO toDTO(CompanyHR hr) {
        CompanyHRDTO dto = new CompanyHRDTO();
        dto.setId(hr.getId());
        dto.setHrName(hr.getHrName());
        dto.setEmail(hr.getEmail());
        dto.setPrimaryHr(hr.isPrimaryHr());
        return dto;
    }
}
