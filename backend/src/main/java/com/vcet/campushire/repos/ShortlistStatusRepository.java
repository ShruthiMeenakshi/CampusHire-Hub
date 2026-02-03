package com.vcet.campushire.repos;

import com.vcet.campushire.entity.ShortlistStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShortlistStatusRepository extends JpaRepository<ShortlistStatus, Long> {
}
