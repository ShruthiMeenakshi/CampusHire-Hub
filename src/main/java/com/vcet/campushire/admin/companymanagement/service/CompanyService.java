package com.vcet.campushire.admin.companymanagement.service;

import com.vcet.campushire.admin.companymanagement.dto.CompanyRequestDTO;
import com.vcet.campushire.admin.companymanagement.dto.CompanyResponseDTO;
import com.vcet.campushire.admin.companymanagement.dto.CompanyStatus;
import com.vcet.campushire.admin.companymanagement.exception.CompanyNotFoundException;
import com.vcet.campushire.admin.companymanagement.exception.DuplicateCompanyException;
import com.vcet.campushire.admin.companymanagement.mapper.CompanyMapper;
import com.vcet.campushire.admin.companymanagement.model.Company;
import com.vcet.campushire.admin.companymanagement.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public CompanyResponseDTO createCompany(CompanyRequestDTO dto) {

        if (companyRepository.existsByCompanyName(dto.getCompanyName())) {
            throw new DuplicateCompanyException("Company already exists");
        }

        Company company = CompanyMapper.toEntity(dto);
        company.setStatus(CompanyStatus.ACTIVE);

        return CompanyMapper.toDTO(companyRepository.save(company));
    }

    public CompanyResponseDTO updateCompany(Long companyId, CompanyRequestDTO dto) {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new CompanyNotFoundException("Company not found"));

        company.setCompanyName(dto.getCompanyName());
        company.setIndustry(dto.getIndustry());
        company.setDescription(dto.getDescription());
        company.setWebsite(dto.getWebsite());

        return CompanyMapper.toDTO(companyRepository.save(company));
    }

    public CompanyResponseDTO getCompany(Long companyId) {
        return CompanyMapper.toDTO(
                companyRepository.findById(companyId)
                        .orElseThrow(() -> new CompanyNotFoundException("Company not found"))
        );
    }

    public List<CompanyResponseDTO> getAllCompanies() {
        return companyRepository.findAll()
                .stream()
                .map(CompanyMapper::toDTO)
                .collect(Collectors.toList());
    }

    public void toggleCompanyStatus(Long companyId) {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new CompanyNotFoundException("Company not found"));

        company.setStatus(
                company.getStatus() == CompanyStatus.ACTIVE
                        ? CompanyStatus.INACTIVE
                        : CompanyStatus.ACTIVE
        );

        companyRepository.save(company);
    }
}
