package com.vcet.campushire.dto;

public class CompanyHRDTO {

    private Long id;
    private String hrName;
    private String email;
    private String phone;
    private String designation;
    private String linkedinUrl;
    private boolean primaryHr;
    private boolean active;

    public CompanyHRDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHrName() {
        return hrName;
    }

    public void setHrName(String hrName) {
        this.hrName = hrName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public void setLinkedinUrl(String linkedinUrl) {
        this.linkedinUrl = linkedinUrl;
    }

    public boolean isPrimaryHr() {
        return primaryHr;
    }

    public void setPrimaryHr(boolean primaryHr) {
        this.primaryHr = primaryHr;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
