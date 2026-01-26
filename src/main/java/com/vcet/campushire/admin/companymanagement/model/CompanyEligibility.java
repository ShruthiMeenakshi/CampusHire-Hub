package com.vcet.campushire.admin.companymanagement.model;

import jakarta.persistence.*;

@Entity
@Table(name = "company_eligibility")
public class CompanyEligibility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double minCgpa;
    private String eligibleDepartments;
    private String eligibleBatches;
    private int maxBacklogs;
    private boolean locked;

    @OneToOne
    @JoinColumn(name = "company_id")
    private Company company;

    public CompanyEligibility() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getMinCgpa() {
        return minCgpa;
    }

    public void setMinCgpa(double minCgpa) {
        this.minCgpa = minCgpa;
    }

    public String getEligibleDepartments() {
        return eligibleDepartments;
    }

    public void setEligibleDepartments(String eligibleDepartments) {
        this.eligibleDepartments = eligibleDepartments;
    }

    public String getEligibleBatches() {
        return eligibleBatches;
    }

    public void setEligibleBatches(String eligibleBatches) {
        this.eligibleBatches = eligibleBatches;
    }

    public int getMaxBacklogs() {
        return maxBacklogs;
    }

    public void setMaxBacklogs(int maxBacklogs) {
        this.maxBacklogs = maxBacklogs;
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}
