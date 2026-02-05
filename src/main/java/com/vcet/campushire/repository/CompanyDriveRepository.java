package com.vcet.campushire.repository;

import com.vcet.campushire.model.CompanyDrive;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyDriveRepository extends JpaRepository<CompanyDrive, Long> {

    List<CompanyDrive> findByCompanyId(Long companyId);
}
