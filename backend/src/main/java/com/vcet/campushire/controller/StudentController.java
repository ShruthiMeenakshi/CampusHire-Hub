package com.vcet.campushire.controller;

import com.vcet.campushire.dto.StudentProfileDto;
import com.vcet.campushire.entity.StudentProfile;
import com.vcet.campushire.service.StudentService;
import com.vcet.campushire.service.FileStorageService;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final StudentService studentService;
    private final FileStorageService fileStorageService;

    public StudentController(StudentService studentService, FileStorageService fileStorageService) {
        this.studentService = studentService;
        this.fileStorageService = fileStorageService;
    }

    @GetMapping("/profile")
    public ResponseEntity<StudentProfile> getProfile(Authentication authentication) {
        StudentProfile profile = studentService.getOrCreateProfileForUsername(authentication.getName());
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<StudentProfile> updateProfile(Authentication authentication,
                                                       @RequestBody StudentProfileDto dto) {
        StudentProfile profile = studentService.getOrCreateProfileForUsername(authentication.getName());
        return ResponseEntity.ok(studentService.updateProfile(profile, dto));
    }

    @PostMapping("/resume")
    public ResponseEntity<StudentProfile> uploadResume(Authentication authentication,
                                                       @RequestParam("file") MultipartFile file) throws Exception {
        StudentProfile profile = studentService.getOrCreateProfileForUsername(authentication.getName());
        String url = fileStorageService.saveResume(file, profile.getUser().getId());
        profile.setResumeUrl(url);
        return ResponseEntity.ok(studentService.updateProfile(profile, new StudentProfileDto(
                profile.getBatch(), profile.getCgpa(), profile.getBacklogs(), profile.getSkills(), profile.getCertifications(),
                profile.getInternships(), profile.getProjects(), url, profile.getEligible()
        )));
    }
}
