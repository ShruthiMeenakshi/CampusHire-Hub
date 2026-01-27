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

    @Column(name = "academic_year")
    private String academicYear;

    @Column(name = "drive_type")
    @Enumerated(EnumType.STRING)
    private DriveType driveType;

    @Column(name = "students_shortlisted")
    private int studentsShortlisted;

    @Column(name = "students_placed")
    private int studentsPlaced;

    @Column(name = "visit_date")
    private LocalDate visitDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    public CompanyVisit() {
    }

    // 🔽 GETTERS & SETTERS (CRITICAL)
    public Long getId() {
        return id;
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

    public LocalDate getVisitDate() {
        return visitDate;
    }

    public void setVisitDate(LocalDate visitDate) {
        this.visitDate = visitDate;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}
