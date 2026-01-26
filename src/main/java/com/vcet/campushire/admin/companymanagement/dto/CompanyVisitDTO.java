package com.vcet.campushire.admin.companymanagement.dto;

import java.time.LocalDate;

public class CompanyVisitDTO {

    private Long id;
    private LocalDate visitDate;
    private String academicYear;
    private DriveType driveType;
    private int studentsShortlisted;
    private int studentsPlaced;

    public CompanyVisitDTO() {
    }

    public CompanyVisitDTO(Long id, LocalDate visitDate, String academicYear, DriveType driveType, int studentsShortlisted, int studentsPlaced) {
        this.id = id;
        this.visitDate = visitDate;
        this.academicYear = academicYear;
        this.driveType = driveType;
        this.studentsShortlisted = studentsShortlisted;
        this.studentsPlaced = studentsPlaced;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(LocalDate visitDate) {
        this.visitDate = visitDate;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public DriveType getDriveType() {
        return driveType;
    }

    public void setDriveType(DriveType driveType) {
        this.driveType = driveType;
    }

    public int getStudentsShortlisted() {
        return studentsShortlisted;
    }

    public void setStudentsShortlisted(int studentsShortlisted) {
        this.studentsShortlisted = studentsShortlisted;
    }

    public int getStudentsPlaced() {
        return studentsPlaced;
    }

    public void setStudentsPlaced(int studentsPlaced) {
        this.studentsPlaced = studentsPlaced;
    }
}
