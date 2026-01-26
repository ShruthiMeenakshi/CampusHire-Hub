package com.vcet.campushire.admin.companymanagement.service;

import com.vcet.campushire.admin.companymanagement.dto.CompanyVisitDTO;
import com.vcet.campushire.admin.companymanagement.exception.CompanyNotFoundException;
import com.vcet.campushire.admin.companymanagement.mapper.CompanyVisitMapper;
import com.vcet.campushire.admin.companymanagement.model.Company;
import com.vcet.campushire.admin.companymanagement.model.CompanyVisit;
import com.vcet.campushire.admin.companymanagement.repository.CompanyRepository;
import com.vcet.campushire.admin.companymanagement.repository.CompanyVisitRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyVisitService {

    private final CompanyVisitRepository visitRepository;
    private final CompanyRepository companyRepository;

    public CompanyVisitService(CompanyVisitRepository visitRepository,
                               CompanyRepository companyRepository) {
        this.visitRepository = visitRepository;
        this.companyRepository = companyRepository;
    }

    public CompanyVisitDTO addVisit(Long companyId, CompanyVisitDTO dto) {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new CompanyNotFoundException("Company not found"));

        CompanyVisit visit = new CompanyVisit();
        visit.setVisitDate(dto.getVisitDate());
        visit.setAcademicYear(dto.getAcademicYear());
        visit.setDriveType(dto.getDriveType());
        visit.setCompany(company);

        return CompanyVisitMapper.toDTO(visitRepository.save(visit));
    }

    public List<CompanyVisitDTO> getVisits(Long companyId) {
        return visitRepository.findByCompanyId(companyId)
                .stream()
                .map(CompanyVisitMapper::toDTO)
                .collect(Collectors.toList());
    }

    public List<CompanyVisitDTO> getVisitsByYear(Long companyId, String year) {
        return visitRepository.findByCompanyIdAndAcademicYear(companyId, year)
                .stream()
                .map(CompanyVisitMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CompanyVisitDTO updateOutcome(Long visitId, CompanyVisitDTO dto) {

        CompanyVisit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new CompanyNotFoundException("Visit not found"));

        visit.setStudentsShortlisted(dto.getStudentsShortlisted());
        visit.setStudentsPlaced(dto.getStudentsPlaced());

        return CompanyVisitMapper.toDTO(visitRepository.save(visit));
    }
}
