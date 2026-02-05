package com.vcet.campushire.repository;

import com.vcet.campushire.model.CompanyHR;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CompanyHRRepository extends JpaRepository<CompanyHR, Long> {

    List<CompanyHR> findByCompanyId(Long companyId);

    @Modifying
    @Query("UPDATE CompanyHR hr SET hr.primaryHr = false WHERE hr.company.id = :companyId")
    void unsetPrimaryHR(Long companyId);
}
