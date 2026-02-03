package com.vcet.campushire.repository;

import com.vcet.campushire.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByRollNo(String rollNo);
    boolean existsByEmail(String email);
    boolean existsByRollNo(String rollNo);
}
