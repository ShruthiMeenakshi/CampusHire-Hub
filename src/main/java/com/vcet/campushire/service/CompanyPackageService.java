package com.vcet.campushire.service;

import com.vcet.campushire.dto.CompanyPackageDTO;
import com.vcet.campushire.exception.CompanyNotFoundException;
import com.vcet.campushire.mapper.CompanyPackageMapper;
import com.vcet.campushire.model.Company;
import com.vcet.campushire.model.CompanyPackage;
import com.vcet.campushire.repository.CompanyPackageRepository;
import com.vcet.campushire.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CompanyPackageService {

    private final CompanyPackageRepository packageRepository;
    private final CompanyRepository companyRepository;

    public CompanyPackageService(CompanyPackageRepository packageRepository,
                                 CompanyRepository companyRepository) {
        this.packageRepository = packageRepository;
        this.companyRepository = companyRepository;
    }

    public CompanyPackageDTO addPackage(Long companyId, CompanyPackageDTO dto) {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new CompanyNotFoundException("Company not found"));

        CompanyPackage pkg = new CompanyPackage();
        pkg.setRoleName(dto.getRoleName());
        pkg.setCtc(dto.getCtc());
        pkg.setStipend(dto.getStipend());
        pkg.setWorkLocation(dto.getWorkLocation());
        pkg.setBondDetails(dto.getBondDetails());
        pkg.setCompany(company);

        return CompanyPackageMapper.toDTO(packageRepository.save(pkg));
    }

    public CompanyPackageDTO updatePackage(Long packageId, CompanyPackageDTO dto) {

        CompanyPackage pkg = packageRepository.findById(packageId)
                .orElseThrow(() -> new CompanyNotFoundException("Package not found"));

        pkg.setCtc(dto.getCtc());
        pkg.setStipend(dto.getStipend());
        pkg.setBondDetails(dto.getBondDetails());

        return CompanyPackageMapper.toDTO(packageRepository.save(pkg));
    }

    public List<CompanyPackageDTO> getPackages(Long companyId) {
        return packageRepository.findByCompanyId(companyId)
                .stream()
                .map(CompanyPackageMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Map<String, Double> getPackageStats(Long companyId) {
        return packageRepository.calculateStats(companyId);
    }
}
