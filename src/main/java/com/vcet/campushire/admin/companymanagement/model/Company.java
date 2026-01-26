package com.vcet.campushire.admin.companymanagement.model;

import com.vcet.campushire.admin.companymanagement.dto.CompanyStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;

    private String industry;

    @Column(length = 2000)
    private String description;

    private String website;

    private String companySize; // STARTUP / MID / MNC

    private String headquarters;

    @Enumerated(EnumType.STRING)
    private CompanyStatus status;

    private LocalDateTime createdAt;

    public Company() {
    }

    public Company(String companyName, String industry, String description,
                   String website, String companySize, String headquarters,
                   CompanyStatus status) {
        this.companyName = companyName;
        this.industry = industry;
        this.description = description;
        this.website = website;
        this.companySize = companySize;
        this.headquarters = headquarters;
        this.status = status;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getCompanySize() {
        return companySize;
    }

    public void setCompanySize(String companySize) {
        this.companySize = companySize;
    }

    public String getHeadquarters() {
        return headquarters;
    }

    public void setHeadquarters(String headquarters) {
        this.headquarters = headquarters;
    }

    public CompanyStatus getStatus() {
        return status;
    }

    public void setStatus(CompanyStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
