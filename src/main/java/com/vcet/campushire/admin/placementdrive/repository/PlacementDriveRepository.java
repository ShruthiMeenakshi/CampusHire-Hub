package com.vcet.campushire.admin.placementdrive.repository;

import java.util.List;
import java.util.Optional;

import com.vcet.campushire.admin.placementdrive.dto.DriveStatus;
import com.vcet.campushire.admin.placementdrive.model.PlacementDrive;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlacementDriveRepository extends JpaRepository<PlacementDrive, Long> {

    Optional<PlacementDrive> findByDriveId(String driveId);

    List<PlacementDrive> findByDriveStatusAndIsActiveTrue(DriveStatus status);

    List<PlacementDrive> findByCompanyIdAndIsActiveTrue(String companyId);
}
