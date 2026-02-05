package com.vcet.campushire.model;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.vcet.campushire.dto.DriveStatus;

import jakarta.persistence.*;

@Entity
@Table(name = "placement_drives")
public class PlacementDrive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String driveId;

    @Column(nullable = false)
    private String companyId;

    @Column(nullable = false)
    private String jobRole;

    @Column(nullable = false)
    private Double ctc;

    private LocalDate driveDate;
    private LocalTime driveStartTime;
    private LocalTime driveEndTime;

    @Enumerated(EnumType.STRING)
    private DriveStatus driveStatus;

    private String location;
    private String description;

    private String createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean isActive;

    public PlacementDrive() {}

    // Getters and Setters (ALL)

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDriveId() { return driveId; }
    public void setDriveId(String driveId) { this.driveId = driveId; }

    public String getCompanyId() { return companyId; }
    public void setCompanyId(String companyId) { this.companyId = companyId; }

    public String getJobRole() { return jobRole; }
    public void setJobRole(String jobRole) { this.jobRole = jobRole; }

    public Double getCtc() { return ctc; }
    public void setCtc(Double ctc) { this.ctc = ctc; }

    public LocalDate getDriveDate() { return driveDate; }
    public void setDriveDate(LocalDate driveDate) { this.driveDate = driveDate; }

    public LocalTime getDriveStartTime() { return driveStartTime; }
    public void setDriveStartTime(LocalTime driveStartTime) { this.driveStartTime = driveStartTime; }

    public LocalTime getDriveEndTime() { return driveEndTime; }
    public void setDriveEndTime(LocalTime driveEndTime) { this.driveEndTime = driveEndTime; }

    public DriveStatus getDriveStatus() { return driveStatus; }
    public void setDriveStatus(DriveStatus driveStatus) { this.driveStatus = driveStatus; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }
}
