package com.vcet.campushire.dto;

public class CompanyPackageDTO {

    private Long id;
    private String roleName;
    private double ctc;
    private double stipend;
    private String workLocation;
    private String bondDetails;

    public CompanyPackageDTO() {
    }

    public CompanyPackageDTO(Long id, String roleName, double ctc, double stipend, String workLocation, String bondDetails) {
        this.id = id;
        this.roleName = roleName;
        this.ctc = ctc;
        this.stipend = stipend;
        this.workLocation = workLocation;
        this.bondDetails = bondDetails;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public double getCtc() {
        return ctc;
    }

    public void setCtc(double ctc) {
        this.ctc = ctc;
    }

    public double getStipend() {
        return stipend;
    }

    public void setStipend(double stipend) {
        this.stipend = stipend;
    }

    public String getWorkLocation() {
        return workLocation;
    }

    public void setWorkLocation(String workLocation) {
        this.workLocation = workLocation;
    }

    public String getBondDetails() {
        return bondDetails;
    }

    public void setBondDetails(String bondDetails) {
        this.bondDetails = bondDetails;
    }
}
