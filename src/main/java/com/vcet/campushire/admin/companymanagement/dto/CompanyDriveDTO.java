package com.vcet.campushire.admin.companymanagement.dto;

public class CompanyDriveDTO {

    private Long id;
    private Long placementDriveId;
    private String academicYear;
    private boolean active;
    private boolean archived;

    public CompanyDriveDTO() {
    }

    public CompanyDriveDTO(Long id, Long placementDriveId, String academicYear, boolean active, boolean archived) {
        this.id = id;
        this.placementDriveId = placementDriveId;
        this.academicYear = academicYear;
        this.active = active;
        this.archived = archived;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPlacementDriveId() {
        return placementDriveId;
    }

    public void setPlacementDriveId(Long placementDriveId) {
        this.placementDriveId = placementDriveId;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isArchived() {
        return archived;
    }

    public void setArchived(boolean archived) {
        this.archived = archived;
    }
}
