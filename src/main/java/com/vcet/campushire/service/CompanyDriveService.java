package com.vcet.campushire.service;

import com.vcet.campushire.dto.CompanyDriveDTO;
import com.vcet.campushire.exception.CompanyNotFoundException;
import com.vcet.campushire.mapper.CompanyDriveMapper;
import com.vcet.campushire.model.Company;
import com.vcet.campushire.model.CompanyDrive;
import com.vcet.campushire.repository.CompanyDriveRepository;
import com.vcet.campushire.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyDriveService {

    private final CompanyDriveRepository driveRepository;
    private final CompanyRepository companyRepository;

    public CompanyDriveService(CompanyDriveRepository driveRepository,
                               CompanyRepository companyRepository) {
        this.driveRepository = driveRepository;
        this.companyRepository = companyRepository;
    }

    public CompanyDriveDTO linkDrive(Long companyId, CompanyDriveDTO dto) {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new CompanyNotFoundException("Company not found"));

        CompanyDrive drive = new CompanyDrive();
        drive.setPlacementDriveId(dto.getPlacementDriveId());
        drive.setAcademicYear(dto.getAcademicYear());
        drive.setActive(true);
        drive.setArchived(false);
        drive.setCompany(company);

        return CompanyDriveMapper.toDTO(driveRepository.save(drive));
    }

    public List<CompanyDriveDTO> getDrives(Long companyId) {
        return driveRepository.findByCompanyId(companyId)
                .stream()
                .map(CompanyDriveMapper::toDTO)
                .collect(Collectors.toList());
    }

    public Object cloneCompanyData(Long companyId) {
        // placeholder logic
        return "Company data cloned successfully";
    }

    public void archiveDrive(Long id) {

        CompanyDrive drive = driveRepository.findById(id)
                .orElseThrow(() -> new CompanyNotFoundException("Drive not found"));

        drive.setArchived(true);
        drive.setActive(false);
        driveRepository.save(drive);
    }
}
