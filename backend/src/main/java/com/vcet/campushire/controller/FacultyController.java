package com.vcet.campushire.controller;

import com.vcet.campushire.entity.StudentProfile;
import com.vcet.campushire.repository.StudentProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    private final StudentProfileRepository profileRepository;

    public FacultyController(StudentProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @GetMapping("/students")
    @PreAuthorize("hasAnyRole('FACULTY','PLACEMENT_HEAD')")
    public ResponseEntity<List<StudentProfile>> listStudents() {
        return ResponseEntity.ok(profileRepository.findAll());
    }

    @GetMapping("/students/{id}")
    @PreAuthorize("hasAnyRole('FACULTY','PLACEMENT_HEAD')")
    public ResponseEntity<StudentProfile> getStudent(@PathVariable Long id) {
        return ResponseEntity.ok(profileRepository.findById(id).orElseThrow());
    }
}
