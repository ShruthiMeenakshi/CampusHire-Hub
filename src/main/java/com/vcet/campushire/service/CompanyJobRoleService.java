package com.vcet.campushire.service;

import com.vcet.campushire.dto.CompanyJobRoleDTO;
import com.vcet.campushire.exception.CompanyNotFoundException;
import com.vcet.campushire.mapper.CompanyJobRoleMapper;
import com.vcet.campushire.model.Company;
import com.vcet.campushire.model.CompanyJobRole;
import com.vcet.campushire.repository.CompanyJobRoleRepository;
import com.vcet.campushire.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyJobRoleService {

    private final CompanyJobRoleRepository roleRepository;
    private final CompanyRepository companyRepository;

    public CompanyJobRoleService(CompanyJobRoleRepository roleRepository,
                                 CompanyRepository companyRepository) {
        this.roleRepository = roleRepository;
        this.companyRepository = companyRepository;
    }

    public CompanyJobRoleDTO addRole(Long companyId, CompanyJobRoleDTO dto) {

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new CompanyNotFoundException("Company not found"));

        CompanyJobRole role = new CompanyJobRole();
        role.setRoleTitle(dto.getRoleTitle());
        role.setJobDescription(dto.getJobDescription());
        role.setRequiredSkills(dto.getRequiredSkills());
        role.setEmploymentType(dto.getEmploymentType());
        role.setActive(true);
        role.setCompany(company);

        return CompanyJobRoleMapper.toDTO(roleRepository.save(role));
    }

    public CompanyJobRoleDTO updateRole(Long roleId, CompanyJobRoleDTO dto) {

        CompanyJobRole role = roleRepository.findById(roleId)
                .orElseThrow(() -> new CompanyNotFoundException("Role not found"));

        role.setRoleTitle(dto.getRoleTitle());
        role.setJobDescription(dto.getJobDescription());
        role.setRequiredSkills(dto.getRequiredSkills());

        return CompanyJobRoleMapper.toDTO(roleRepository.save(role));
    }

    public void toggleRoleStatus(Long roleId) {

        CompanyJobRole role = roleRepository.findById(roleId)
                .orElseThrow(() -> new CompanyNotFoundException("Role not found"));

        role.setActive(!role.isActive());
        roleRepository.save(role);
    }

    public List<CompanyJobRoleDTO> getRoles(Long companyId) {
        return roleRepository.findByCompanyId(companyId)
                .stream()
                .map(CompanyJobRoleMapper::toDTO)
                .collect(Collectors.toList());
    }
}
