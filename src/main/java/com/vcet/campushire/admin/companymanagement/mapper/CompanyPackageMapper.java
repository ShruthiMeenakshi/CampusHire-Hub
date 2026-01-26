package com.vcet.campushire.admin.companymanagement.mapper;

import com.vcet.campushire.admin.companymanagement.dto.CompanyPackageDTO;
import com.vcet.campushire.admin.companymanagement.model.CompanyPackage;

public class CompanyPackageMapper {

    private CompanyPackageMapper() {
    }

    public static CompanyPackageDTO toDTO(CompanyPackage pkg) {
        CompanyPackageDTO dto = new CompanyPackageDTO();
        dto.setId(pkg.getId());
        dto.setRoleName(pkg.getRoleName());
        dto.setCtc(pkg.getCtc());
        dto.setStipend(pkg.getStipend());
        dto.setWorkLocation(pkg.getWorkLocation());
        dto.setBondDetails(pkg.getBondDetails());
        return dto;
    }
}
