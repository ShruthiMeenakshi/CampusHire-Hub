package com.vcet.campushire.admin.companymanagement.service;

import com.vcet.campushire.admin.companymanagement.dto.CompanyHRDTO;
import com.vcet.campushire.admin.companymanagement.exception.CompanyNotFoundException;
import com.vcet.campushire.admin.companymanagement.mapper.CompanyHRMapper;
import com.vcet.campushire.admin.companymanagement.model.Company;
import com.vcet.campushire.admin.companymanagement.model.CompanyHR;
import com.vcet.campushire.admin.companymanagement.repository.CompanyHRRepository;
import com.vcet.campushire.admin.companymanagement.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyHRService {

    private final CompanyHRRepository hrRepository;
    private final CompanyRepository companyRepository;

    public CompanyHRService(CompanyHRRepository hrRepository,
                            CompanyRepository companyRepository) {
        this.hrRepository = hrRepository;
        this.companyRepository = companyRepository;
    }

    public CompanyHRDTO addHR(Long companyId, CompanyHRDTO dto) {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new CompanyNotFoundException("Company not found"));

        if (dto.isPrimaryHr()) {
            hrRepository.unsetPrimaryHR(companyId);
        }

        CompanyHR hr = new CompanyHR();
        hr.setHrName(dto.getHrName());
        hr.setEmail(dto.getEmail());
        hr.setPrimaryHr(dto.isPrimaryHr());
        hr.setActive(true);
        hr.setCompany(company);

        return CompanyHRMapper.toDTO(hrRepository.save(hr));
    }

    public CompanyHRDTO updateHR(Long hrId, CompanyHRDTO dto) {

        CompanyHR hr = hrRepository.findById(hrId)
                .orElseThrow(() -> new CompanyNotFoundException("HR not found"));

        hr.setHrName(dto.getHrName());
        hr.setEmail(dto.getEmail());

        return CompanyHRMapper.toDTO(hrRepository.save(hr));
    }

    public void markPrimaryHR(Long hrId) {

        CompanyHR hr = hrRepository.findById(hrId)
                .orElseThrow(() -> new CompanyNotFoundException("HR not found"));

        hrRepository.unsetPrimaryHR(hr.getCompany().getId());
        hr.setPrimaryHr(true);

        hrRepository.save(hr);
    }

    public void deactivateHR(Long hrId) {

        CompanyHR hr = hrRepository.findById(hrId)
                .orElseThrow(() -> new CompanyNotFoundException("HR not found"));

        hr.setActive(false);
        hrRepository.save(hr);
    }

    public List<CompanyHRDTO> getHRs(Long companyId) {
        return hrRepository.findByCompanyId(companyId)
                .stream()
                .map(CompanyHRMapper::toDTO)
                .collect(Collectors.toList());
    }
}
