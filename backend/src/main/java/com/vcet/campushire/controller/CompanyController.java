package com.vcet.campushire.controller;

import com.vcet.campushire.entity.Company;
import com.vcet.campushire.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {
    @Autowired
    private CompanyService companyService;

    @GetMapping
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @GetMapping("/{id}")
    public Optional<Company> getCompanyById(@PathVariable Long id) {
        return companyService.getCompanyById(id);
    }

    @PostMapping
    public Company createCompany(@RequestBody Company company) {
        return companyService.saveCompany(company);
    }

    @PutMapping("/{id}")
    public Company updateCompany(@PathVariable Long id, @RequestBody Company company) {
        company.setId(id);
        return companyService.saveCompany(company);
    }

    @DeleteMapping("/{id}")
    public void deleteCompany(@PathVariable Long id) {
        companyService.deleteCompany(id);
    }
}
