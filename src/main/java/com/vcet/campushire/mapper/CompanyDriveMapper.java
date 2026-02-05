package com.vcet.campushire.mapper;

import com.vcet.campushire.dto.CompanyDriveDTO;
import com.vcet.campushire.model.CompanyDrive;

public class CompanyDriveMapper {

    private CompanyDriveMapper() {
        // Prevent instantiation
    }

    public static CompanyDriveDTO toDTO(CompanyDrive companyDrive) {

        if (companyDrive == null) {
            return null;
        }

        CompanyDriveDTO dto = new CompanyDriveDTO();
        dto.setId(companyDrive.getId());
        dto.setPlacementDriveId(companyDrive.getPlacementDriveId());
        dto.setAcademicYear(companyDrive.getAcademicYear());
        dto.setActive(companyDrive.isActive());
        dto.setArchived(companyDrive.isArchived());

        return dto;
    }

    public static CompanyDrive toEntity(CompanyDriveDTO dto) {

        if (dto == null) {
            return null;
        }

        CompanyDrive companyDrive = new CompanyDrive();
        companyDrive.setPlacementDriveId(dto.getPlacementDriveId());
        companyDrive.setAcademicYear(dto.getAcademicYear());
        companyDrive.setActive(dto.isActive());
        companyDrive.setArchived(dto.isArchived());

        return companyDrive;
    }
}
