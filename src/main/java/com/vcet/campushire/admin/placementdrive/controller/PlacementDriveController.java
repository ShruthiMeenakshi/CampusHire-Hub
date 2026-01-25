package com.vcet.campushire.admin.placementdrive.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vcet.campushire.admin.placementdrive.dto.DriveStatus;
import com.vcet.campushire.admin.placementdrive.dto.PlacementDriveRequestDTO;
import com.vcet.campushire.admin.placementdrive.dto.PlacementDriveResponseDTO;
import com.vcet.campushire.admin.placementdrive.service.PlacementDriveService;
import com.vcet.campushire.admin.placementdrive.util.ApiResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/placement-drives")
public class PlacementDriveController {

    private final PlacementDriveService service;

    public PlacementDriveController(PlacementDriveService service) {
        this.service = service;
    }

    // 1️⃣ CREATE DRIVE
    @PostMapping
    public ResponseEntity<ApiResponse<?>> createDrive(
            @Valid @RequestBody PlacementDriveRequestDTO request) {

        return new ResponseEntity<>(
                ApiResponse.success(service.createDrive(request)),
                HttpStatus.CREATED
        );
    }

    // 2️⃣ GET ALL DRIVES
    @GetMapping
    public ResponseEntity<ApiResponse<List<PlacementDriveResponseDTO>>> getAllDrives() {
        return ResponseEntity.ok(
                ApiResponse.success(service.getAllDrives())
        );
    }

    // 3️⃣ GET SINGLE DRIVE BY ID
    @GetMapping("/{driveId}")
    public ResponseEntity<ApiResponse<PlacementDriveResponseDTO>> getDriveById(
            @PathVariable String driveId) {

        return ResponseEntity.ok(
                ApiResponse.success(service.getDriveById(driveId))
        );
    }

    // 4️⃣ FILTER DRIVES BY STATUS
    @GetMapping("/status/{status}")
    public ResponseEntity<ApiResponse<List<PlacementDriveResponseDTO>>> getDrivesByStatus(
            @PathVariable DriveStatus status) {

        return ResponseEntity.ok(
                ApiResponse.success(service.getDrivesByStatus(status))
        );
    }

    // 5️⃣ SEARCH DRIVES BY COMPANY
    @GetMapping("/company/{companyId}")
    public ResponseEntity<ApiResponse<List<PlacementDriveResponseDTO>>> getDrivesByCompany(
            @PathVariable String companyId) {

        return ResponseEntity.ok(
                ApiResponse.success(service.getDrivesByCompany(companyId))
        );
    }

    // 6️⃣ PAGINATION
    @GetMapping("/page")
    public ResponseEntity<ApiResponse<List<PlacementDriveResponseDTO>>> getDrivesWithPagination(
            @RequestParam int page,
            @RequestParam int size) {

        return ResponseEntity.ok(
                ApiResponse.success(service.getDrivesWithPagination(page, size))
        );
    }

    // 7️⃣ UPDATE DRIVE
    @PutMapping("/{driveId}")
    public ResponseEntity<ApiResponse<?>> updateDrive(
            @PathVariable String driveId,
            @Valid @RequestBody PlacementDriveRequestDTO request) {

        return ResponseEntity.ok(
                ApiResponse.success(service.updateDrive(driveId, request))
        );
    }

    // 8️⃣ CLOSE DRIVE
    @PutMapping("/{driveId}/close")
    public ResponseEntity<ApiResponse<?>> closeDrive(
            @PathVariable String driveId) {

        return ResponseEntity.ok(
                ApiResponse.success(service.closeDrive(driveId))
        );
    }

    // 9️⃣ SOFT DELETE DRIVE
    @DeleteMapping("/{driveId}")
    public ResponseEntity<ApiResponse<?>> softDeleteDrive(
            @PathVariable String driveId) {

        service.softDeleteDrive(driveId);
        return ResponseEntity.ok(
                ApiResponse.success("Drive soft-deleted successfully")
        );
    }
}
