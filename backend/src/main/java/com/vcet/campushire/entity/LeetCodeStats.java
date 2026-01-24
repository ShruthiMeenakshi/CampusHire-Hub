package com.vcet.campushire.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "leetcode_stats")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeetCodeStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(nullable = false)
    private Integer totalSolved;

    @Column(nullable = false)
    private Integer easySolved;

    @Column(nullable = false)
    private Integer mediumSolved;

    @Column(nullable = false)
    private Integer hardSolved;

    @Column(nullable = false)
    private Double acceptanceRate;

    @Column(nullable = false)
    private LocalDateTime lastUpdated;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
