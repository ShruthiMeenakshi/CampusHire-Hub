package com.vcet.campushire.admin.placementdrive.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class PlacementDriveResponseDTO {

    private String driveId;
    private String companyId;
    private String jobRole;
    private Double ctc;
    private LocalDate driveDate;
    private LocalTime driveStartTime;
    private LocalTime driveEndTime;
    private DriveStatus driveStatus;
    private String location;
    private String description;

    public PlacementDriveResponseDTO() {}

    // Getters & Setters

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
}
