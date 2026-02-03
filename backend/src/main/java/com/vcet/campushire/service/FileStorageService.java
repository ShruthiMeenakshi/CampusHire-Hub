package com.vcet.campushire.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {
    private static final String UPLOAD_DIR = "uploads";

    public String saveResume(MultipartFile file, Long userId) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Empty file");
        }
        Path uploadPath = Paths.get(UPLOAD_DIR, "resumes");
        Files.createDirectories(uploadPath);
        String filename = "resume-" + userId + "-" + System.currentTimeMillis() + "." + getExtension(file.getOriginalFilename());
        Path target = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        return "/uploads/resumes/" + filename;
    }

    private String getExtension(String name) {
        if (name == null) return "pdf";
        int i = name.lastIndexOf('.');
        return (i >= 0 && i < name.length() - 1) ? name.substring(i + 1) : "pdf";
    }
}
