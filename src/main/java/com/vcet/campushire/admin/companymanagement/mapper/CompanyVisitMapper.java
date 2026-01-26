package com.vcet.campushire.admin.companymanagement.mapper;

import com.vcet.campushire.admin.companymanagement.dto.CompanyVisitDTO;
import com.vcet.campushire.admin.companymanagement.model.CompanyVisit;

public class CompanyVisitMapper {

    private CompanyVisitMapper() {
    }

    public static CompanyVisitDTO toDTO(CompanyVisit visit) {
        CompanyVisitDTO dto = new CompanyVisitDTO();
        dto.setId(visit.getId());
        dto.setVisitDate(visit.getVisitDate());
        dto.setAcademicYear(visit.getAcademicYear());
        dto.setDriveType(visit.getDriveType());
        dto.setStudentsShortlisted(visit.getStudentsShortlisted());
        dto.setStudentsPlaced(visit.getStudentsPlaced());
        return dto;
    }
}
