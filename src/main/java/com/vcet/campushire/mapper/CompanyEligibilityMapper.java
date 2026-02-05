package com.vcet.campushire.mapper;

import com.vcet.campushire.dto.CompanyEligibilityDTO;
import com.vcet.campushire.model.CompanyEligibility;

public class CompanyEligibilityMapper {

    private CompanyEligibilityMapper() {
    }

    public static CompanyEligibilityDTO toDTO(CompanyEligibility eligibility) {
        CompanyEligibilityDTO dto = new CompanyEligibilityDTO();
        dto.setId(eligibility.getId());
        dto.setMinCgpa(eligibility.getMinCgpa());
        dto.setEligibleDepartments(eligibility.getEligibleDepartments());
        dto.setEligibleBatches(eligibility.getEligibleBatches());
        dto.setMaxBacklogs(eligibility.getMaxBacklogs());
        dto.setLocked(eligibility.isLocked());
        return dto;
    }
}
