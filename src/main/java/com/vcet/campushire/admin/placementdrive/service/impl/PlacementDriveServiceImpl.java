package com.vcet.campushire.admin.placementdrive.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.vcet.campushire.admin.placementdrive.dto.DriveStatus;
import com.vcet.campushire.admin.placementdrive.dto.PlacementDriveRequestDTO;
import com.vcet.campushire.admin.placementdrive.dto.PlacementDriveResponseDTO;
import com.vcet.campushire.admin.placementdrive.exception.InvalidDriveStatusException;
import com.vcet.campushire.admin.placementdrive.exception.PlacementDriveNotFoundException;
import com.vcet.campushire.admin.placementdrive.mapper.PlacementDriveMapper;
import com.vcet.campushire.admin.placementdrive.model.PlacementDrive;
import com.vcet.campushire.admin.placementdrive.repository.PlacementDriveRepository;
import com.vcet.campushire.admin.placementdrive.service.PlacementDriveService;

@Service
public class PlacementDriveServiceImpl implements PlacementDriveService {

    private final PlacementDriveRepository repository;

    //  REQUIRED constructor (Spring injects dependency here)
    public PlacementDriveServiceImpl(PlacementDriveRepository repository) {
        this.repository = repository;
    }

    @Override
    public PlacementDriveResponseDTO createDrive(PlacementDriveRequestDTO request) {
        PlacementDrive drive = PlacementDriveMapper.toEntity(request);
        return PlacementDriveMapper.toResponse(repository.save(drive));
    }

    @Override
    public PlacementDriveResponseDTO updateDrive(
            String driveId,
            PlacementDriveRequestDTO request) {

        PlacementDrive drive = repository.findByDriveId(driveId)
                .orElseThrow(() ->
                        new PlacementDriveNotFoundException("Drive not found"));

        if (drive.getDriveStatus() == DriveStatus.CLOSED) {
            throw new InvalidDriveStatusException(
                    "Closed drive cannot be updated");
        }

        drive.setJobRole(request.getJobRole());
        drive.setCtc(request.getCtc());
        drive.setDriveDate(request.getDriveDate());
        drive.setDriveStartTime(request.getDriveStartTime());
        drive.setDriveEndTime(request.getDriveEndTime());
        drive.setLocation(request.getLocation());
        drive.setDescription(request.getDescription());
        drive.setUpdatedAt(LocalDateTime.now());

        return PlacementDriveMapper.toResponse(repository.save(drive));
    }

    @Override
    public PlacementDriveResponseDTO closeDrive(String driveId) {

        PlacementDrive drive = repository.findByDriveId(driveId)
                .orElseThrow(() ->
                        new PlacementDriveNotFoundException("Drive not found"));

        drive.setDriveStatus(DriveStatus.CLOSED);
        drive.setIsActive(false);
        drive.setUpdatedAt(LocalDateTime.now());

        return PlacementDriveMapper.toResponse(repository.save(drive));
    }

    @Override
    public List<PlacementDriveResponseDTO> getAllDrives() {

        return repository.findAll()
                .stream()
                .map(PlacementDriveMapper::toResponse)
                .toList();
    }

    @Override
    public PlacementDriveResponseDTO getDriveById(String driveId) {
        PlacementDrive drive = repository.findByDriveId(driveId)
                .orElseThrow(() -> new PlacementDriveNotFoundException("Drive not found"));

        return PlacementDriveMapper.toResponse(drive);
    }

    @Override
    public List<PlacementDriveResponseDTO> getDrivesByStatus(DriveStatus status) {
        return repository.findByDriveStatusAndIsActiveTrue(status)
                .stream()
                .map(PlacementDriveMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<PlacementDriveResponseDTO> getDrivesByCompany(String companyId) {
        return repository.findByCompanyIdAndIsActiveTrue(companyId)
                .stream()
                .map(PlacementDriveMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<PlacementDriveResponseDTO> getDrivesWithPagination(int page, int size) {
        return repository.findAll(PageRequest.of(page, size))
                .getContent()
                .stream()
                .map(PlacementDriveMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void softDeleteDrive(String driveId) {
        PlacementDrive drive = repository.findByDriveId(driveId)
                .orElseThrow(() -> new PlacementDriveNotFoundException("Drive not found"));

        drive.setIsActive(false);
        repository.save(drive);
    }
}
