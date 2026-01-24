package com.vcet.campushire.repos;

import com.vcet.campushire.entity.LeetCodeStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeetCodeStatsRepository extends JpaRepository<LeetCodeStats, Long> {
}
