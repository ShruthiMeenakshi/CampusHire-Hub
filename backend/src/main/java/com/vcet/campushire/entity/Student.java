package com.vcet.campushire.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String rollNumber;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private Integer batch;

    @Column(nullable = false)
    private Double cgpa;

    @Column(nullable = false)
    private Integer backlogs;

    @Column(length = 500)
    private String bio;

    @Column(length = 1000)
    private String skills;

    @Column(length = 1000)
    private String certifications;

    @Column(length = 1000)
    private String internships;

    @Column(length = 1000)
    private String projects;

    @Column(name = "resume_url")
    private String resumeUrl;

    @Column(name = "leetcode_username")
    private String leetcodeUsername;

    @Column(nullable = false)
    private Boolean placementEligible;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isPlaced = false;

    @Column(name = "placed_company")
    private String placedCompany;

    @Column(name = "placed_package")
    private Double placedPackage;

    @Column(name = "placed_role")
    private String placedRole;

    @Column(nullable = false)
    @Builder.Default
    private Boolean profileLocked = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LeetCodeStats> leetcodeStats;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Shortlist> shortlists;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    @Column(name = "graduation_degree")
private String graduationDegree;

@Column(name = "ug_specialization")
private String ugSpecialization;

@Column(name = "gender")
private String gender;

@Column(name = "date_of_birth")
private String dateOfBirth; // Format: DD.MM.YYYY

@Column(name = "marks_10th")
private Double marks10th;

@Column(name = "marks_12th")
private Double marks12th;

@Column(name = "diploma_percentage")
private Double diplomaPercentage;

@Column(name = "college_name")
private String collegeName;

@Column(name = "year_of_passing_graduation")
private Integer yearOfPassingGraduation;

@Column(name = "history_of_arrears")
private Integer historyOfArrears;

@Column(name = "mobile_number")
private String mobileNumber;

@Column(name = "interested_on_placement")
private Boolean interestedOnPlacement;

@Column(name = "offer_1")
private String offer1;

@Column(name = "offer_2")
private String offer2;

@Column(name = "offer_3")
private String offer3;

@Column(name = "offer_4")
private String offer4;

@Column(name = "number_of_offers")
private Integer numberOfOffers;

@Column(name = "opted_offer")
private String optedOffer;
}
