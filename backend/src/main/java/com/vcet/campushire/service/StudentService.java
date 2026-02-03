package com.vcet.campushire.service;

import com.vcet.campushire.dto.StudentProfileDto;
import com.vcet.campushire.entity.StudentProfile;
import com.vcet.campushire.entity.User;
import com.vcet.campushire.repository.StudentProfileRepository;
import com.vcet.campushire.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    private final StudentProfileRepository profileRepository;
    private final UserRepository userRepository;

    public StudentService(StudentProfileRepository profileRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    public StudentProfile getOrCreateProfileForUsername(String username) {
        User user = userRepository.findByEmail(username)
                .or(() -> userRepository.findByRollNo(username))
                .orElseThrow();
        return profileRepository.findByUser(user).orElseGet(() -> profileRepository.save(StudentProfile.builder()
                .user(user)
                .eligible(Boolean.TRUE)
            .locked(Boolean.FALSE)
                .build()));
    }

    public StudentProfile updateProfile(StudentProfile profile, StudentProfileDto dto) {
        if (Boolean.TRUE.equals(profile.getLocked())) {
            throw new IllegalArgumentException("Profile is locked by admin");
        }
        profile.setBatch(dto.batch());
        profile.setCgpa(dto.cgpa());
        profile.setBacklogs(dto.backlogs());
        profile.setSkills(dto.skills());
        profile.setCertifications(dto.certifications());
        profile.setInternships(dto.internships());
        profile.setProjects(dto.projects());
        profile.setResumeUrl(dto.resumeUrl());
        profile.setEligible(dto.eligible());
        return profileRepository.save(profile);
    }
}
