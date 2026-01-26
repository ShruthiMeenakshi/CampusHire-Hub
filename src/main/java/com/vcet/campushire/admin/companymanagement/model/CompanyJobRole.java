package com.vcet.campushire.admin.companymanagement.model;

import com.vcet.campushire.admin.companymanagement.dto.EmploymentType;
import jakarta.persistence.*;

@Entity
@Table(name = "company_job_roles")
public class CompanyJobRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roleTitle;
    private String jobDescription;
    private String requiredSkills;

    @Enumerated(EnumType.STRING)
    private EmploymentType employmentType; // INTERN / FTE / CONTRACT

    private boolean active;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    public CompanyJobRole(Long id, String roleTitle, String jobDescription, String requiredSkills, EmploymentType employmentType, boolean active, Company company) {
        this.id = id;
        this.roleTitle = roleTitle;
        this.jobDescription = jobDescription;
        this.requiredSkills = requiredSkills;
        this.employmentType = employmentType;
        this.active = active;
        this.company = company;
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

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}
