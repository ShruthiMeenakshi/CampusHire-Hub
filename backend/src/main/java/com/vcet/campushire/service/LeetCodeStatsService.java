package com.vcet.campushire.service;

import com.vcet.campushire.entity.LeetCodeStats;
import com.vcet.campushire.repos.LeetCodeStatsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LeetCodeStatsService {
    @Autowired
    private LeetCodeStatsRepository leetCodeStatsRepository;

    public List<LeetCodeStats> getAllLeetCodeStats() {
        return leetCodeStatsRepository.findAll();
    }

    public Optional<LeetCodeStats> getLeetCodeStatsById(Long id) {
        return leetCodeStatsRepository.findById(id);
    }

    public LeetCodeStats saveLeetCodeStats(LeetCodeStats leetCodeStats) {
        return leetCodeStatsRepository.save(leetCodeStats);
    }

    public void deleteLeetCodeStats(Long id) {
        leetCodeStatsRepository.deleteById(id);
    }
}
