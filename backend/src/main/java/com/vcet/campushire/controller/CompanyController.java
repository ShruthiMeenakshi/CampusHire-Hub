package com.vcet.campushire.controller;

import com.vcet.campushire.entity.Company;
import com.vcet.campushire.entity.PlacementEvent;
import com.vcet.campushire.service.CompanyService;
import com.vcet.campushire.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    private final CompanyService companyService;
    private final EventService eventService;

    public CompanyController(CompanyService companyService, EventService eventService) {
        this.companyService = companyService;
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<Company>> list() {
        return ResponseEntity.ok(companyService.list());
    }

    @PostMapping
    @PreAuthorize("hasRole('PLACEMENT_HEAD')")
    public ResponseEntity<Company> create(@RequestBody Company c) {
        return ResponseEntity.ok(companyService.create(c));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PLACEMENT_HEAD')")
    public ResponseEntity<Company> update(@PathVariable Long id, @RequestBody Company c) {
        return ResponseEntity.ok(companyService.update(id, c));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PLACEMENT_HEAD')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        companyService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/events")
    public ResponseEntity<List<PlacementEvent>> events(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.eventsByCompany(id));
    }
}
