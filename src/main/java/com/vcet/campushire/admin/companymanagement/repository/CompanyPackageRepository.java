package com.vcet.campushire.admin.companymanagement.repository;

import com.vcet.campushire.admin.companymanagement.model.CompanyPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface CompanyPackageRepository extends JpaRepository<CompanyPackage, Long> {

    List<CompanyPackage> findByCompanyId(Long companyId);

    @Query("""
        SELECT 
            MIN(p.ctc) AS min,
            MAX(p.ctc) AS max,
            AVG(p.ctc) AS avg
        FROM CompanyPackage p
        WHERE p.company.id = :companyId
    """)
    Map<String, Double> calculateStats(Long companyId);
}
