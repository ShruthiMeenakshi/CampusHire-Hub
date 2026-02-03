package com.vcet.campushire.service;

import com.vcet.campushire.dto.EventDto;
import com.vcet.campushire.entity.Company;
import com.vcet.campushire.entity.DriveStatus;
import com.vcet.campushire.entity.PlacementEvent;
import com.vcet.campushire.entity.StudentProfile;
import com.vcet.campushire.repository.PlacementEventRepository;
import com.vcet.campushire.repository.CompanyRepository;
import com.vcet.campushire.repository.StudentProfileRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EventService {

    private final PlacementEventRepository repository;
    private final CompanyRepository companyRepository;
    private final StudentProfileRepository profileRepository;

    public EventService(PlacementEventRepository repository, CompanyRepository companyRepository, StudentProfileRepository profileRepository) {
        this.repository = repository;
        this.companyRepository = companyRepository;
        this.profileRepository = profileRepository;
    }

    public List<PlacementEvent> listAll() {
        return repository.findAll();
    }

    public PlacementEvent create(EventDto dto) {
        PlacementEvent e = PlacementEvent.builder()
                .companyName(dto.companyName())
                .role(dto.role())
                .packageLPA(dto.packageLPA())
                .eventDate(dto.eventDate())
                .details(dto.details())
                .status(DriveStatus.UPCOMING)
                .build();
        // Attempt to link company by name
        if (dto.companyName() != null) {
            companyRepository.findByName(dto.companyName()).ifPresent(e::setCompany);
        }
        return repository.save(e);
    }

    public PlacementEvent update(Long id, EventDto dto) {
        PlacementEvent e = repository.findById(id).orElseThrow();
        e.setCompanyName(dto.companyName());
        e.setRole(dto.role());
        e.setPackageLPA(dto.packageLPA());
        e.setEventDate(dto.eventDate());
        e.setDetails(dto.details());
        if (dto.companyName() != null) {
            companyRepository.findByName(dto.companyName()).ifPresent(e::setCompany);
        }
        return repository.save(e);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<PlacementEvent> upcoming() {
        LocalDate today = LocalDate.now();
        return repository.findAll().stream()
                .filter(e -> e.getEventDate() != null && !e.getEventDate().isBefore(today))
                .toList();
    }

    public List<PlacementEvent> past() {
        LocalDate today = LocalDate.now();
        return repository.findAll().stream()
                .filter(e -> e.getEventDate() != null && e.getEventDate().isBefore(today))
                .toList();
    }

    public PlacementEvent updateStatus(Long id, DriveStatus status) {
        PlacementEvent e = repository.findById(id).orElseThrow();
        e.setStatus(status);
        return repository.save(e);
    }

    public List<PlacementEvent> eventsByCompany(Long companyId) {
        Company c = companyRepository.findById(companyId).orElseThrow();
        return repository.findAll().stream()
                .filter(e -> e.getCompany() != null && e.getCompany().getId().equals(c.getId()))
                .toList();
    }

    public PlacementEvent addEligible(Long eventId, List<Long> studentIds) {
        PlacementEvent e = repository.findById(eventId).orElseThrow();
        List<StudentProfile> students = profileRepository.findAllById(studentIds);
        if (e.getEligibleStudents() == null) {
            e.setEligibleStudents(new java.util.HashSet<>());
        }
        e.getEligibleStudents().addAll(students);
        return repository.save(e);
    }

    public List<StudentProfile> listEligible(Long eventId) {
        PlacementEvent e = repository.findById(eventId).orElseThrow();
        return e.getEligibleStudents() == null ? java.util.List.of() : e.getEligibleStudents().stream().toList();
    }
}
