package com.vcet.campushire.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "shortlists")
public class Shortlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private Instant createdAt;
    private Long createdByUserId;

    @ManyToMany
    @JoinTable(name = "shortlist_students",
            joinColumns = @JoinColumn(name = "shortlist_id"),
            inverseJoinColumns = @JoinColumn(name = "student_profile_id"))
    private Set<StudentProfile> students = new HashSet<>();
}
