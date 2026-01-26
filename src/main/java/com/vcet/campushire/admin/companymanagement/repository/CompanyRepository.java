package com.vcet.campushire.admin.companymanagement.repository;

import com.vcet.campushire.admin.companymanagement.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    boolean existsByCompanyName(String companyName);
}
