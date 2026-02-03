package com.vcet.campushire.repository;

import com.vcet.campushire.entity.StudentProfile;
import com.vcet.campushire.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
    Optional<StudentProfile> findByUser(User user);
}
