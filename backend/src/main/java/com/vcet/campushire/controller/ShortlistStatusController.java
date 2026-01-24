package com.vcet.campushire.controller;

import com.vcet.campushire.entity.ShortlistStatus;
import com.vcet.campushire.service.ShortlistStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shortlist-statuses")
public class ShortlistStatusController {
    @Autowired
    private ShortlistStatusService shortlistStatusService;

    @GetMapping
    public List<ShortlistStatus> getAllShortlistStatuses() {
        return shortlistStatusService.getAllShortlistStatuses();
    }

    @GetMapping("/{id}")
    public Optional<ShortlistStatus> getShortlistStatusById(@PathVariable Long id) {
        return shortlistStatusService.getShortlistStatusById(id);
    }

    @PostMapping
    public ShortlistStatus createShortlistStatus(@RequestBody ShortlistStatus shortlistStatus) {
        return shortlistStatusService.saveShortlistStatus(shortlistStatus);
    }

    @PutMapping("/{id}")
    public ShortlistStatus updateShortlistStatus(@PathVariable Long id, @RequestBody ShortlistStatus shortlistStatus) {
        // ShortlistStatus is an enum, no setId. Implement update logic if needed.
        return shortlistStatusService.saveShortlistStatus(shortlistStatus);
    }

    @DeleteMapping("/{id}")
    public void deleteShortlistStatus(@PathVariable Long id) {
        shortlistStatusService.deleteShortlistStatus(id);
    }
}
