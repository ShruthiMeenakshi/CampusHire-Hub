package com.vcet.campushire.service;

import com.vcet.campushire.entity.Company;
import com.vcet.campushire.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {

    private final CompanyRepository repository;

    public CompanyService(CompanyRepository repository) {
        this.repository = repository;
    }

    public List<Company> list() { return repository.findAll(); }
    public Company create(Company c) { return repository.save(c); }
    public Company update(Long id, Company c) {
        Company existing = repository.findById(id).orElseThrow();
        existing.setName(c.getName());
        existing.setWebsite(c.getWebsite());
        existing.setDetails(c.getDetails());
        return repository.save(existing);
    }
    public void delete(Long id) { repository.deleteById(id); }
}
