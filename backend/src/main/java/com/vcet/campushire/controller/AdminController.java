package com.vcet.campushire.controller;

import com.vcet.campushire.entity.StudentProfile;
import com.vcet.campushire.service.FilterService;
import com.vcet.campushire.repository.StudentProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final FilterService filterService;
    private final StudentProfileRepository profileRepository;

    public AdminController(FilterService filterService, StudentProfileRepository profileRepository) {
        this.filterService = filterService;
        this.profileRepository = profileRepository;
    }

    @GetMapping("/students")
    @PreAuthorize("hasRole('PLACEMENT_HEAD')")
    public ResponseEntity<List<StudentProfile>> filterStudents(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) Double minCgpa,
            @RequestParam(required = false) Integer maxBacklogs,
            @RequestParam(required = false) String skillContains,
            @RequestParam(required = false) String internshipContains
    ) {
        return ResponseEntity.ok(filterService.filter(department, minCgpa, maxBacklogs, skillContains, internshipContains));
    }

    @GetMapping("/students/all")
    @PreAuthorize("hasRole('PLACEMENT_HEAD')")
    public ResponseEntity<List<StudentProfile>> allStudents() {
        return ResponseEntity.ok(profileRepository.findAll());
    }

    @PutMapping("/students/{id}/lock")
    @PreAuthorize("hasRole('PLACEMENT_HEAD')")
    public ResponseEntity<StudentProfile> lockProfile(@PathVariable Long id, @RequestParam boolean locked) {
        StudentProfile profile = profileRepository.findById(id).orElseThrow();
        profile.setLocked(locked);
        return ResponseEntity.ok(profileRepository.save(profile));
    }

    @GetMapping("/students/export")
    @PreAuthorize("hasRole('PLACEMENT_HEAD')")
    public ResponseEntity<String> exportCsv(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) Double minCgpa,
            @RequestParam(required = false) Integer maxBacklogs,
            @RequestParam(required = false) String skillContains,
            @RequestParam(required = false) String internshipContains
    ) {
        List<StudentProfile> list = filterService.filter(department, minCgpa, maxBacklogs, skillContains, internshipContains);
        StringBuilder sb = new StringBuilder();
        sb.append("id,fullName,department,batch,cgpa,backlogs,skills,internships,eligible\n");
        for (StudentProfile p : list) {
            String name = p.getUser() != null ? p.getUser().getFullName() : "";
            String dept = p.getUser() != null ? p.getUser().getDepartment() : "";
            sb.append(p.getId()).append(',')
                    .append(escapeCsv(name)).append(',')
                    .append(escapeCsv(dept)).append(',')
                    .append(escapeCsv(p.getBatch())).append(',')
                    .append(p.getCgpa() != null ? p.getCgpa() : "").append(',')
                    .append(p.getBacklogs() != null ? p.getBacklogs() : "").append(',')
                    .append(escapeCsv(p.getSkills())).append(',')
                    .append(escapeCsv(p.getInternships())).append(',')
                    .append(p.getEligible() != null ? p.getEligible() : "").append('\n');
        }
        return ResponseEntity.ok()
                .header("Content-Type", "text/csv")
                .header("Content-Disposition", "attachment; filename=shortlist.csv")
                .body(sb.toString());
    }

    private String escapeCsv(String s) {
        if (s == null) return "";
        String escaped = s.replace("\"", "\"\"");
        if (escaped.contains(",") || escaped.contains("\n") || escaped.contains("\r")) {
            return "\"" + escaped + "\"";
        }
        return escaped;
    }
}
