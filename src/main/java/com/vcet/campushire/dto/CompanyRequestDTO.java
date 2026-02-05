package com.vcet.campushire.dto;

public class CompanyRequestDTO {

    private String companyName;
    private String industry;
    private String description;
    private String website;
    private String companySize;
    private String headquarters;

    public CompanyRequestDTO() {
    }

    public CompanyRequestDTO(String companyName, String industry, String description, String website, String companySize, String headquarters) {
        this.companyName = companyName;
        this.industry = industry;
        this.description = description;
        this.website = website;
        this.companySize = companySize;
        this.headquarters = headquarters;
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
}
