package com.vcet.campushire.controller;

import com.vcet.campushire.entity.PlacementDrive;
import com.vcet.campushire.service.PlacementDriveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/placementdrives")
public class PlacementDriveController {
    @Autowired
    private PlacementDriveService placementDriveService;

    @GetMapping
    public List<PlacementDrive> getAllPlacementDrives() {
        return placementDriveService.getAllPlacementDrives();
    }

    @GetMapping("/{id}")
    public Optional<PlacementDrive> getPlacementDriveById(@PathVariable Long id) {
        return placementDriveService.getPlacementDriveById(id);
    }

    @PostMapping
    public PlacementDrive createPlacementDrive(@RequestBody PlacementDrive placementDrive) {
        return placementDriveService.savePlacementDrive(placementDrive);
    }

    @PutMapping("/{id}")
    public PlacementDrive updatePlacementDrive(@PathVariable Long id, @RequestBody PlacementDrive placementDrive) {
        placementDrive.setId(id);
        return placementDriveService.savePlacementDrive(placementDrive);
    }

    @DeleteMapping("/{id}")
    public void deletePlacementDrive(@PathVariable Long id) {
        placementDriveService.deletePlacementDrive(id);
    }
}
