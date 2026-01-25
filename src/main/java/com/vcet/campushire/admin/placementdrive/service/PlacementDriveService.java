package com.vcet.campushire.admin.placementdrive.service;

import java.util.List;

import com.vcet.campushire.admin.placementdrive.dto.DriveStatus;
import com.vcet.campushire.admin.placementdrive.dto.PlacementDriveRequestDTO;
import com.vcet.campushire.admin.placementdrive.dto.PlacementDriveResponseDTO;

public interface PlacementDriveService {

    PlacementDriveResponseDTO createDrive(PlacementDriveRequestDTO request);

    List<PlacementDriveResponseDTO> getAllDrives();

    PlacementDriveResponseDTO getDriveById(String driveId);

    List<PlacementDriveResponseDTO> getDrivesByStatus(DriveStatus status);

    List<PlacementDriveResponseDTO> getDrivesByCompany(String companyId);

    List<PlacementDriveResponseDTO> getDrivesWithPagination(int page, int size);

    PlacementDriveResponseDTO updateDrive(String driveId, PlacementDriveRequestDTO request);

    PlacementDriveResponseDTO closeDrive(String driveId);

    void softDeleteDrive(String driveId);
}
