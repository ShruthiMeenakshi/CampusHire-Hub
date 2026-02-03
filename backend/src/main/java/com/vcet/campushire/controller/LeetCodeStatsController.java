package com.vcet.campushire.controller;

import com.vcet.campushire.entity.LeetCodeStats;
import com.vcet.campushire.service.LeetCodeStatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/leetcode-stats")
public class LeetCodeStatsController {
    @Autowired
    private LeetCodeStatsService leetCodeStatsService;

    @GetMapping
    public List<LeetCodeStats> getAllLeetCodeStats() {
        return leetCodeStatsService.getAllLeetCodeStats();
    }

    @GetMapping("/{id}")
    public Optional<LeetCodeStats> getLeetCodeStatsById(@PathVariable Long id) {
        return leetCodeStatsService.getLeetCodeStatsById(id);
    }

    @PostMapping
    public LeetCodeStats createLeetCodeStats(@RequestBody LeetCodeStats leetCodeStats) {
        return leetCodeStatsService.saveLeetCodeStats(leetCodeStats);
    }

    @PutMapping("/{id}")
    public LeetCodeStats updateLeetCodeStats(@PathVariable Long id, @RequestBody LeetCodeStats leetCodeStats) {
        leetCodeStats.setId(id);
        return leetCodeStatsService.saveLeetCodeStats(leetCodeStats);
    }

    @DeleteMapping("/{id}")
    public void deleteLeetCodeStats(@PathVariable Long id) {
        leetCodeStatsService.deleteLeetCodeStats(id);
    }
}
