package com.vcet.campushire.mapper;

import java.time.LocalDateTime;

import com.vcet.campushire.model.PlacementDrive;
import com.vcet.campushire.dto.DriveStatus;
import com.vcet.campushire.dto.PlacementDriveRequestDTO;
import com.vcet.campushire.dto.PlacementDriveResponseDTO;

public class PlacementDriveMapper {

    public static PlacementDrive toEntity(PlacementDriveRequestDTO dto) {
        PlacementDrive drive = new PlacementDrive();
        drive.setDriveId(dto.getDriveId());
        drive.setCompanyId(dto.getCompanyId());
        drive.setJobRole(dto.getJobRole());
        drive.setCtc(dto.getCtc());
        drive.setDriveDate(dto.getDriveDate());
        drive.setDriveStartTime(dto.getDriveStartTime());
        drive.setDriveEndTime(dto.getDriveEndTime());
        drive.setLocation(dto.getLocation());
        drive.setDescription(dto.getDescription());
        drive.setDriveStatus(DriveStatus.UPCOMING);
        drive.setCreatedBy("ADMIN");
        drive.setCreatedAt(LocalDateTime.now());
        drive.setUpdatedAt(LocalDateTime.now());
        drive.setIsActive(true);
        return drive;
    }

    public static PlacementDriveResponseDTO toResponse(PlacementDrive entity) {
        PlacementDriveResponseDTO dto = new PlacementDriveResponseDTO();
        dto.setDriveId(entity.getDriveId());
        dto.setCompanyId(entity.getCompanyId());
        dto.setJobRole(entity.getJobRole());
        dto.setCtc(entity.getCtc());
        dto.setDriveDate(entity.getDriveDate());
        dto.setDriveStartTime(entity.getDriveStartTime());
        dto.setDriveEndTime(entity.getDriveEndTime());
        dto.setDriveStatus(entity.getDriveStatus());
        dto.setLocation(entity.getLocation());
        dto.setDescription(entity.getDescription());
        return dto;
    }
}
