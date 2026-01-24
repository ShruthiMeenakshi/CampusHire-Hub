package com.vcet.campushire.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDTO {
    private Long id;
    private String rollNumber;
    private String firstName;
    private String lastName;
    private String email;
    private String department;
    private Integer batch;
    private Double cgpa;
    private Integer backlogs;
    private String bio;
    private String skills;
    private String certifications;
    private String internships;
    private String projects;
    private String resumeUrl;
    private String leetcodeUsername;
    private Boolean placementEligible;
    private Boolean isPlaced;
    private String placedCompany;
    private Double placedPackage;
    private String placedRole;
    // Additional fields for complete student data
    private String graduationDegree;
    private String ugSpecialization;
    private String gender;
    private String dateOfBirth; // Format: DD.MM.YYYY
    private Double marks10th;
    private Double marks12th;
    private Double diplomaPercentage;
    private String collegeName;
    private Integer yearOfPassingGraduation;
    private Integer historyOfArrears;
    private String mobileNumber;
    private Boolean interestedOnPlacement;
    private String offer1;
    private String offer2;
    private String offer3;
    private String offer4;
    private Integer numberOfOffers;
    private String optedOffer;
    private Boolean profileLocked;
}
