package com.vcet.campushire.service;

import com.vcet.campushire.entity.Shortlist;
import com.vcet.campushire.repos.ShortlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShortlistService {
    @Autowired
    private ShortlistRepository shortlistRepository;

    public List<Shortlist> getAllShortlists() {
        return shortlistRepository.findAll();
    }

    public Optional<Shortlist> getShortlistById(Long id) {
        return shortlistRepository.findById(id);
    }

    public Shortlist saveShortlist(Shortlist shortlist) {
        return shortlistRepository.save(shortlist);
    }

    public void deleteShortlist(Long id) {
        shortlistRepository.deleteById(id);
    }
}
