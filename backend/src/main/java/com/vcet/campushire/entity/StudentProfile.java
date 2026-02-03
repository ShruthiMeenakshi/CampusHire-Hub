package com.vcet.campushire.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "student_profiles")
public class StudentProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String batch;
    private Double cgpa;
    private Integer backlogs;
    @Column(length = 2048)
    private String skills; // comma-separated
    @Column(length = 4096)
    private String certifications; // text
    @Column(length = 4096)
    private String internships; // text
    @Column(length = 4096)
    private String projects; // text
    private String resumeUrl;
    private Boolean eligible; // placement eligibility
    private Boolean locked; // admin lock to prevent edits

    // Phase 7: placement outcome fields
    private Boolean placed; // whether student is placed
    private String placedCompany; // company name where placed
    private Double placedPackageLPA; // offered package
}
