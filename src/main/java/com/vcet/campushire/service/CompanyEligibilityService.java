package com.vcet.campushire.service;

import com.vcet.campushire.dto.CompanyEligibilityDTO;
import com.vcet.campushire.exception.CompanyNotFoundException;
import com.vcet.campushire.exception.InvalidEligibilityException;
import com.vcet.campushire.mapper.CompanyEligibilityMapper;
import com.vcet.campushire.model.Company;
import com.vcet.campushire.model.CompanyEligibility;
import com.vcet.campushire.repository.CompanyEligibilityRepository;
import com.vcet.campushire.repository.CompanyRepository;
import org.springframework.stereotype.Service;

@Service
public class CompanyEligibilityService {

    private final CompanyEligibilityRepository eligibilityRepository;
    private final CompanyRepository companyRepository;

    public CompanyEligibilityService(CompanyEligibilityRepository eligibilityRepository,
                                     CompanyRepository companyRepository) {
        this.eligibilityRepository = eligibilityRepository;
        this.companyRepository = companyRepository;
    }

    public CompanyEligibilityDTO saveEligibility(Long companyId, CompanyEligibilityDTO dto) {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new CompanyNotFoundException("Company not found"));

        CompanyEligibility eligibility = new CompanyEligibility();
        eligibility.setMinCgpa(dto.getMinCgpa());
        eligibility.setEligibleDepartments(dto.getEligibleDepartments());
        eligibility.setEligibleBatches(dto.getEligibleBatches());
        eligibility.setMaxBacklogs(dto.getMaxBacklogs());
        eligibility.setLocked(false);
        eligibility.setCompany(company);

        return CompanyEligibilityMapper.toDTO(eligibilityRepository.save(eligibility));
    }

    public CompanyEligibilityDTO updateEligibility(Long eligibilityId, CompanyEligibilityDTO dto) {

        CompanyEligibility eligibility = eligibilityRepository.findById(eligibilityId)
                .orElseThrow(() -> new CompanyNotFoundException("Eligibility not found"));

        if (eligibility.isLocked()) {
            throw new InvalidEligibilityException("Eligibility rules are locked");
        }

        eligibility.setMinCgpa(dto.getMinCgpa());
        eligibility.setEligibleDepartments(dto.getEligibleDepartments());
        eligibility.setEligibleBatches(dto.getEligibleBatches());
        eligibility.setMaxBacklogs(dto.getMaxBacklogs());

        return CompanyEligibilityMapper.toDTO(eligibilityRepository.save(eligibility));
    }

    public void lockEligibility(Long eligibilityId) {

        CompanyEligibility eligibility = eligibilityRepository.findById(eligibilityId)
                .orElseThrow(() -> new CompanyNotFoundException("Eligibility not found"));

        eligibility.setLocked(true);
        eligibilityRepository.save(eligibility);
    }

    public CompanyEligibilityDTO getEligibility(Long companyId) {
        return CompanyEligibilityMapper.toDTO(
                eligibilityRepository.findByCompanyId(companyId)
                        .orElseThrow(() -> new CompanyNotFoundException("Eligibility not found"))
        );
    }
}
