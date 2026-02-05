package com.vcet.campushire.dto;

public class CompanyEligibilityDTO {

    private Long id;
    private double minCgpa;
    private String eligibleDepartments;
    private String eligibleBatches;
    private int maxBacklogs;
    private boolean locked;

    public CompanyEligibilityDTO() {
    }

    public CompanyEligibilityDTO(Long id, double minCgpa, String eligibleDepartments, String eligibleBatches, int maxBacklogs, boolean locked) {
        this.id = id;
        this.minCgpa = minCgpa;
        this.eligibleDepartments = eligibleDepartments;
        this.eligibleBatches = eligibleBatches;
        this.maxBacklogs = maxBacklogs;
        this.locked = locked;
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
}
