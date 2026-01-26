package com.vcet.campushire.admin.companymanagement.repository;

import com.vcet.campushire.admin.companymanagement.model.CompanyVisit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyVisitRepository extends JpaRepository<CompanyVisit, Long> {

    List<CompanyVisit> findByCompanyId(Long companyId);

    List<CompanyVisit> findByCompanyIdAndAcademicYear(Long companyId, String academicYear);
}
