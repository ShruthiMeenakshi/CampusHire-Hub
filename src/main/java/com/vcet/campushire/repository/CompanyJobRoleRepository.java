package com.vcet.campushire.repository;

import com.vcet.campushire.model.CompanyJobRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyJobRoleRepository extends JpaRepository<CompanyJobRole, Long> {

    List<CompanyJobRole> findByCompanyId(Long companyId);
}
