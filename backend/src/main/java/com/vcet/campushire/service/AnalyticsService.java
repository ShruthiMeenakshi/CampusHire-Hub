package com.vcet.campushire.service;

import com.vcet.campushire.dto.AnalyticsSummary;
import com.vcet.campushire.dto.CompanyStatsDto;
import com.vcet.campushire.dto.DepartmentStatsDto;
import com.vcet.campushire.dto.PlacementStatsDto;
import com.vcet.campushire.entity.PlacementEvent;
import com.vcet.campushire.entity.StudentProfile;
import com.vcet.campushire.repository.PlacementEventRepository;
import com.vcet.campushire.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.DoubleSummaryStatistics;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    private final StudentProfileRepository profileRepository;
    private final PlacementEventRepository eventRepository;

    public AnalyticsService(StudentProfileRepository profileRepository, PlacementEventRepository eventRepository) {
        this.profileRepository = profileRepository;
        this.eventRepository = eventRepository;
    }

    public AnalyticsSummary getSummary() {
        List<StudentProfile> profiles = profileRepository.findAll();
        long totalStudents = profiles.size();
        long eligibleStudents = profiles.stream().filter(p -> Boolean.TRUE.equals(p.getEligible())).count();

        LocalDate today = LocalDate.now();
        List<PlacementEvent> events = eventRepository.findAll();
        long upcoming = events.stream()
                .filter(e -> e.getEventDate() != null && !e.getEventDate().isBefore(today))
                .count();
        long past = events.stream()
                .filter(e -> e.getEventDate() != null && e.getEventDate().isBefore(today))
                .count();

        DoubleSummaryStatistics pkgStats = events.stream()
                .map(PlacementEvent::getPackageLPA)
                .filter(v -> v != null && v > 0)
                .mapToDouble(Double::doubleValue)
                .summaryStatistics();

        Double avg = pkgStats.getCount() > 0 ? pkgStats.getAverage() : null;
        Double max = pkgStats.getCount() > 0 ? pkgStats.getMax() : null;

        return new AnalyticsSummary(totalStudents, eligibleStudents, upcoming, past, avg, max);
    }

    public PlacementStatsDto getPlacementStats() {
        List<StudentProfile> profiles = profileRepository.findAll();
        long total = profiles.size();
        long placed = profiles.stream().filter(p -> Boolean.TRUE.equals(p.getPlaced())).count();
        long unplaced = total - placed;
        double percentage = total > 0 ? (placed * 100.0) / total : 0.0;
        return new PlacementStatsDto(total, placed, unplaced, percentage);
    }

    public List<CompanyStatsDto> getCompanyStats() {
        List<StudentProfile> profiles = profileRepository.findAll();
        Map<String, List<StudentProfile>> byCompany = profiles.stream()
                .filter(p -> Boolean.TRUE.equals(p.getPlaced()))
                .filter(p -> p.getPlacedCompany() != null && !p.getPlacedCompany().isBlank())
                .collect(Collectors.groupingBy(StudentProfile::getPlacedCompany));

        return byCompany.entrySet().stream()
                .map(e -> {
                    long hires = e.getValue().size();
                    Double avgPkg = e.getValue().stream()
                            .map(StudentProfile::getPlacedPackageLPA)
                            .filter(v -> v != null && v > 0)
                            .mapToDouble(Double::doubleValue)
                            .average().orElse(Double.NaN);
                    Double avg = Double.isNaN(avgPkg) ? null : avgPkg;
                    return new CompanyStatsDto(e.getKey(), hires, avg);
                })
                .sorted(Comparator.comparingLong(CompanyStatsDto::hires).reversed())
                .toList();
    }

    public List<DepartmentStatsDto> getDepartmentStats() {
        List<StudentProfile> profiles = profileRepository.findAll();
        Map<String, List<StudentProfile>> byDept = profiles.stream()
                .filter(p -> p.getUser() != null)
                .collect(Collectors.groupingBy(p -> p.getUser().getDepartment()));

        return byDept.entrySet().stream()
                .map(e -> {
                    long total = e.getValue().size();
                    long placed = e.getValue().stream().filter(p -> Boolean.TRUE.equals(p.getPlaced())).count();
                    long unplaced = total - placed;
                    return new DepartmentStatsDto(e.getKey(), total, placed, unplaced);
                })
                .sorted(Comparator.comparing(DepartmentStatsDto::department))
                .toList();
    }
}
