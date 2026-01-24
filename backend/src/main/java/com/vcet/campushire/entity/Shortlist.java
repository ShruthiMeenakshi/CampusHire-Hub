package com.vcet.campushire.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "shortlists")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Shortlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "placement_drive_id", nullable = false)
    private PlacementDrive placementDrive;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ShortlistStatus status;

    @Column(name = "shortlisted_at", nullable = false)
    private LocalDateTime shortlistedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
