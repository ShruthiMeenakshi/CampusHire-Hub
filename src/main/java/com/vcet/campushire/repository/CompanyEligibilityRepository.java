package com.vcet.campushire.repository;

import com.vcet.campushire.model.CompanyEligibility;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyEligibilityRepository extends JpaRepository<CompanyEligibility, Long> {

    Optional<CompanyEligibility> findByCompanyId(Long companyId);
}
