package com.vcet.campushire.mapper;

import com.vcet.campushire.dto.CompanyHRDTO;
import com.vcet.campushire.model.CompanyHR;

public class CompanyHRMapper {

    private CompanyHRMapper() {
    }

    public static CompanyHRDTO toDTO(CompanyHR hr) {

        CompanyHRDTO dto = new CompanyHRDTO();
        dto.setId(hr.getId());
        dto.setHrName(hr.getHrName());
        dto.setEmail(hr.getEmail());
        dto.setPhone(hr.getPhone());
        dto.setDesignation(hr.getDesignation());
        dto.setLinkedinUrl(hr.getLinkedinUrl());
        dto.setPrimaryHr(hr.isPrimaryHr());
        dto.setActive(hr.isActive());

        return dto;
    }
}
