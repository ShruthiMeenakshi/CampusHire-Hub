package com.vcet.campushire.controller;

import com.vcet.campushire.entity.Shortlist;
import com.vcet.campushire.service.ShortlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/shortlists")
public class ShortlistController {
    @Autowired
    private ShortlistService shortlistService;

    @GetMapping
    public List<Shortlist> getAllShortlists() {
        return shortlistService.getAllShortlists();
    }

    @GetMapping("/{id}")
    public Optional<Shortlist> getShortlistById(@PathVariable Long id) {
        return shortlistService.getShortlistById(id);
    }

    @PostMapping
    public Shortlist createShortlist(@RequestBody Shortlist shortlist) {
        return shortlistService.saveShortlist(shortlist);
    }

    @PutMapping("/{id}")
    public Shortlist updateShortlist(@PathVariable Long id, @RequestBody Shortlist shortlist) {
        shortlist.setId(id);
        return shortlistService.saveShortlist(shortlist);
    }

    @DeleteMapping("/{id}")
    public void deleteShortlist(@PathVariable Long id) {
        shortlistService.deleteShortlist(id);
    }
}
