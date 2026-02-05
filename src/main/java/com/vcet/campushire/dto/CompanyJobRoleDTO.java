package com.vcet.campushire.dto;

public class CompanyJobRoleDTO {

    private Long id;
    private String roleTitle;
    private String jobDescription;
    private String requiredSkills;
    private EmploymentType employmentType;
    private boolean active;

    public CompanyJobRoleDTO() {
    }

    public CompanyJobRoleDTO(Long id, String roleTitle, String jobDescription, String requiredSkills, EmploymentType employmentType, boolean active) {
        this.id = id;
        this.roleTitle = roleTitle;
        this.jobDescription = jobDescription;
        this.requiredSkills = requiredSkills;
        this.employmentType = employmentType;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoleTitle() {
        return roleTitle;
    }

    public void setRoleTitle(String roleTitle) {
        this.roleTitle = roleTitle;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public String getRequiredSkills() {
        return requiredSkills;
    }

    public void setRequiredSkills(String requiredSkills) {
        this.requiredSkills = requiredSkills;
    }

    public EmploymentType getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(EmploymentType employmentType) {
        this.employmentType = employmentType;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
