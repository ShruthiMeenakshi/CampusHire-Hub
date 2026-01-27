package com.vcet.campushire.admin.companymanagement.repository;

import com.vcet.campushire.admin.companymanagement.model.CompanyVisit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CompanyVisitRepository extends JpaRepository<CompanyVisit, Long> {

    @Query("SELECT v FROM CompanyVisit v WHERE v.company.id = :companyId")
    List<CompanyVisit> findByCompanyId(@Param("companyId") Long companyId);


    List<CompanyVisit> findByCompanyIdAndAcademicYear(Long companyId, String academicYear);
}
