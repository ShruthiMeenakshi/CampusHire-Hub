package com.vcet.campushire.service;

import com.vcet.campushire.entity.ShortlistStatus;
import com.vcet.campushire.repos.ShortlistStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShortlistStatusService {
    @Autowired
    private ShortlistStatusRepository shortlistStatusRepository;

    public List<ShortlistStatus> getAllShortlistStatuses() {
        return shortlistStatusRepository.findAll();
    }

    public Optional<ShortlistStatus> getShortlistStatusById(Long id) {
        return shortlistStatusRepository.findById(id);
    }

    public ShortlistStatus saveShortlistStatus(ShortlistStatus shortlistStatus) {
        return shortlistStatusRepository.save(shortlistStatus);
    }

    public void deleteShortlistStatus(Long id) {
        shortlistStatusRepository.deleteById(id);
    }
}
