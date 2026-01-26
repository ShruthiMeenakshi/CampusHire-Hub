package com.vcet.campushire.admin.companymanagement.dto;

public class CompanyHRDTO {

    private Long id;
    private String hrName;
    private String email;
    private boolean primaryHr;

    public CompanyHRDTO() {
    }

    public CompanyHRDTO(Long id, String hrName, String email, boolean primaryHr) {
        this.id = id;
        this.hrName = hrName;
        this.email = email;
        this.primaryHr = primaryHr;
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

    public boolean isPrimaryHr() {
        return primaryHr;
    }

    public void setPrimaryHr(boolean primaryHr) {
        this.primaryHr = primaryHr;
    }
}
