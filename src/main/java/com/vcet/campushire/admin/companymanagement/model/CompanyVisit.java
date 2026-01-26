package com.vcet.campushire.admin.companymanagement.model;

import com.vcet.campushire.admin.companymanagement.dto.DriveType;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "company_visits")
public class CompanyVisit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate visitDate;
    private String academicYear;

    @Enumerated(EnumType.STRING)
    private DriveType driveType;

    private int studentsShortlisted;
    private int studentsPlaced;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    public CompanyVisit() {
    }

    public CompanyVisit(Long id, LocalDate visitDate, String academicYear, DriveType driveType, int studentsShortlisted, int studentsPlaced, Company company) {
        this.id = id;
        this.visitDate = visitDate;
        this.academicYear = academicYear;
        this.driveType = driveType;
        this.studentsShortlisted = studentsShortlisted;
        this.studentsPlaced = studentsPlaced;
        this.company = company;
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

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}
