package com.vcet.campushire.service;

import com.vcet.campushire.entity.PlacementDrive;
import com.vcet.campushire.repos.PlacementDriveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlacementDriveService {
    @Autowired
    private PlacementDriveRepository placementDriveRepository;

    public List<PlacementDrive> getAllPlacementDrives() {
        return placementDriveRepository.findAll();
    }

    public Optional<PlacementDrive> getPlacementDriveById(Long id) {
        return placementDriveRepository.findById(id);
    }

    public PlacementDrive savePlacementDrive(PlacementDrive placementDrive) {
        return placementDriveRepository.save(placementDrive);
    }

    public void deletePlacementDrive(Long id) {
        placementDriveRepository.deleteById(id);
    }
}
