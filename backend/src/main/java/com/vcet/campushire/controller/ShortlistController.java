package com.vcet.campushire.controller;

import com.vcet.campushire.dto.CreateShortlistRequest;
import com.vcet.campushire.entity.Shortlist;
import com.vcet.campushire.entity.User;
import com.vcet.campushire.repository.UserRepository;
import com.vcet.campushire.service.ShortlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/shortlists")
public class ShortlistController {

    private final ShortlistService shortlistService;
    private final UserRepository userRepository;

    public ShortlistController(ShortlistService shortlistService, UserRepository userRepository) {
        this.shortlistService = shortlistService;
        this.userRepository = userRepository;
    }

    @PostMapping
    @PreAuthorize("hasRole('PLACEMENT_HEAD')")
    public ResponseEntity<Shortlist> create(Authentication auth, @RequestBody CreateShortlistRequest req) {
        String username = auth.getName();
        User user = userRepository.findByEmail(username)
                .or(() -> userRepository.findByRollNo(username))
                .orElse(null);
        Long creatorId = user != null ? user.getId() : null;
        Shortlist sl = shortlistService.create(req, creatorId);
        return ResponseEntity.ok(sl);
    }

    @GetMapping
    @PreAuthorize("hasRole('PLACEMENT_HEAD')")
    public ResponseEntity<List<Shortlist>> list() {
        return ResponseEntity.ok(shortlistService.list());
    }

    @PostMapping("/{id}/students")
    @PreAuthorize("hasRole('PLACEMENT_HEAD')")
    public ResponseEntity<Shortlist> addStudents(@PathVariable Long id, @RequestBody List<Long> studentIds) {
        return ResponseEntity.ok(shortlistService.addStudents(id, studentIds));
    }

    @DeleteMapping("/{id}/students/{studentId}")
    @PreAuthorize("hasRole('PLACEMENT_HEAD')")
    public ResponseEntity<Shortlist> removeStudent(@PathVariable Long id, @PathVariable Long studentId) {
        return ResponseEntity.ok(shortlistService.removeStudent(id, studentId));
    }

    @GetMapping("/{id}/export")
    @PreAuthorize("hasRole('PLACEMENT_HEAD')")
    public ResponseEntity<String> export(@PathVariable Long id) {
        String csv = shortlistService.exportCsv(id);
        return ResponseEntity.ok()
                .header("Content-Type", "text/csv")
                .header("Content-Disposition", "attachment; filename=shortlist-" + id + ".csv")
                .body(csv);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PLACEMENT_HEAD')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        shortlistService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
