package com.vcet.campushire.service;

import com.vcet.campushire.entity.StudentProfile;
import com.vcet.campushire.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FilterService {

    private final StudentProfileRepository profileRepository;

    public FilterService(StudentProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public List<StudentProfile> filter(String department, Double minCgpa, Integer maxBacklogs, String skillContains, String internshipContains) {
        return profileRepository.findAll().stream()
                .filter(p -> department == null || (p.getUser() != null && department.equalsIgnoreCase(p.getUser().getDepartment())))
                .filter(p -> minCgpa == null || (p.getCgpa() != null && p.getCgpa() >= minCgpa))
                .filter(p -> maxBacklogs == null || (p.getBacklogs() != null && p.getBacklogs() <= maxBacklogs))
                .filter(p -> skillContains == null || (p.getSkills() != null && p.getSkills().toLowerCase().contains(skillContains.toLowerCase())))
                .filter(p -> internshipContains == null || (p.getInternships() != null && p.getInternships().toLowerCase().contains(internshipContains.toLowerCase())))
                .collect(Collectors.toList());
    }
}
