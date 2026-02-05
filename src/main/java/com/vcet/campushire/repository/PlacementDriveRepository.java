package com.vcet.campushire.repository;

import java.util.List;
import java.util.Optional;

import com.vcet.campushire.dto.DriveStatus;
import com.vcet.campushire.model.PlacementDrive;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlacementDriveRepository extends JpaRepository<PlacementDrive, Long> {

    Optional<PlacementDrive> findByDriveId(String driveId);

    List<PlacementDrive> findByDriveStatusAndIsActiveTrue(DriveStatus status);

    List<PlacementDrive> findByCompanyIdAndIsActiveTrue(String companyId);
}
