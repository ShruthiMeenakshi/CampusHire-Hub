package com.vcet.campushire.admin.companymanagement.dto;

public class CompanyResponseDTO {

    private Long id;
    private String companyName;
    private String industry;
    private String status;

    public CompanyResponseDTO() {
    }

    public CompanyResponseDTO(Long id, String companyName, String industry, String status) {
        this.id = id;
        this.companyName = companyName;
        this.industry = industry;
        this.status = status;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
