package com.vcet.campushire.service;

import com.vcet.campushire.dto.CreateShortlistRequest;
import com.vcet.campushire.entity.Shortlist;
import com.vcet.campushire.entity.StudentProfile;
import com.vcet.campushire.repository.ShortlistRepository;
import com.vcet.campushire.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ShortlistService {

    private final ShortlistRepository shortlistRepository;
    private final StudentProfileRepository profileRepository;

    public ShortlistService(ShortlistRepository shortlistRepository, StudentProfileRepository profileRepository) {
        this.shortlistRepository = shortlistRepository;
        this.profileRepository = profileRepository;
    }

    public Shortlist create(CreateShortlistRequest req, Long createdByUserId) {
        Set<StudentProfile> students = new HashSet<>();
        if (req.studentIds() != null) {
            List<StudentProfile> found = profileRepository.findAllById(req.studentIds());
            students.addAll(found);
        }
        Shortlist sl = Shortlist.builder()
                .name(req.name())
                .createdAt(Instant.now())
                .createdByUserId(createdByUserId)
                .students(students)
                .build();
        return shortlistRepository.save(sl);
    }

    public List<Shortlist> list() {
        return shortlistRepository.findAll();
    }

    public Shortlist addStudents(Long shortlistId, List<Long> studentIds) {
        Shortlist sl = shortlistRepository.findById(shortlistId).orElseThrow();
        List<StudentProfile> found = profileRepository.findAllById(studentIds);
        sl.getStudents().addAll(found);
        return shortlistRepository.save(sl);
    }

    public Shortlist removeStudent(Long shortlistId, Long studentId) {
        Shortlist sl = shortlistRepository.findById(shortlistId).orElseThrow();
        StudentProfile p = profileRepository.findById(studentId).orElseThrow();
        sl.getStudents().remove(p);
        return shortlistRepository.save(sl);
    }

    public String exportCsv(Long shortlistId) {
        Shortlist sl = shortlistRepository.findById(shortlistId).orElseThrow();
        StringBuilder sb = new StringBuilder();
        sb.append("id,fullName,department,batch,cgpa,backlogs,skills,internships,eligible\n");
        for (StudentProfile p : sl.getStudents()) {
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
        return sb.toString();
    }

    public void delete(Long shortlistId) {
        shortlistRepository.deleteById(shortlistId);
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
