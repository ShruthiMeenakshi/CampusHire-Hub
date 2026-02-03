package com.vcet.campushire.controller;

import com.vcet.campushire.dto.EventDto;
import com.vcet.campushire.entity.DriveStatus;
import com.vcet.campushire.entity.PlacementEvent;
import com.vcet.campushire.entity.StudentProfile;
import com.vcet.campushire.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventsController {

    private final EventService eventService;

    public EventsController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<PlacementEvent>> list() {
        return ResponseEntity.ok(eventService.listAll());
    }

    @PostMapping
    @PreAuthorize("hasRole('PLACEMENT_HEAD')")
    public ResponseEntity<PlacementEvent> create(@RequestBody EventDto dto) {
        return ResponseEntity.ok(eventService.create(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('PLACEMENT_HEAD')")
    public ResponseEntity<PlacementEvent> update(@PathVariable Long id, @RequestBody EventDto dto) {
        return ResponseEntity.ok(eventService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PLACEMENT_HEAD')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        eventService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/upcoming")
    public ResponseEntity<List<PlacementEvent>> upcoming() {
        return ResponseEntity.ok(eventService.upcoming());
    }

    @GetMapping("/past")
    public ResponseEntity<List<PlacementEvent>> past() {
        return ResponseEntity.ok(eventService.past());
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('PLACEMENT_HEAD')")
    public ResponseEntity<PlacementEvent> updateStatus(@PathVariable Long id, @RequestParam DriveStatus status) {
        return ResponseEntity.ok(eventService.updateStatus(id, status));
    }

    @PostMapping("/{id}/eligible")
    @PreAuthorize("hasRole('PLACEMENT_HEAD')")
    public ResponseEntity<PlacementEvent> addEligible(@PathVariable Long id, @RequestBody java.util.List<Long> studentIds) {
        return ResponseEntity.ok(eventService.addEligible(id, studentIds));
    }

    @GetMapping("/{id}/eligible")
    @PreAuthorize("hasAnyRole('FACULTY','PLACEMENT_HEAD')")
    public ResponseEntity<java.util.List<StudentProfile>> listEligible(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.listEligible(id));
    }
}
