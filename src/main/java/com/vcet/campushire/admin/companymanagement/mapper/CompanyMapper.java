package com.vcet.campushire.admin.companymanagement.mapper;

import com.vcet.campushire.admin.companymanagement.dto.CompanyRequestDTO;
import com.vcet.campushire.admin.companymanagement.dto.CompanyResponseDTO;
import com.vcet.campushire.admin.companymanagement.dto.CompanyStatus;
import com.vcet.campushire.admin.companymanagement.model.Company;

public class CompanyMapper {

    private CompanyMapper() {
    }

    public static Company toEntity(CompanyRequestDTO dto) {

        Company company = new Company();
        company.setCompanyName(dto.getCompanyName());
        company.setIndustry(dto.getIndustry());
        company.setDescription(dto.getDescription());
        company.setWebsite(dto.getWebsite());
        company.setCompanySize(dto.getCompanySize());
        company.setHeadquarters(dto.getHeadquarters());
        company.setStatus(CompanyStatus.ACTIVE);

        return company;
    }

    public static CompanyResponseDTO toDTO(Company company) {

        CompanyResponseDTO dto = new CompanyResponseDTO();
        dto.setId(company.getId());
        dto.setCompanyName(company.getCompanyName());
        dto.setIndustry(company.getIndustry());
        dto.setCompanySize(company.getCompanySize());
        dto.setHeadquarters(company.getHeadquarters());
        dto.setStatus(company.getStatus().name());
        dto.setCreatedAt(company.getCreatedAt());

        return dto;
    }
}
