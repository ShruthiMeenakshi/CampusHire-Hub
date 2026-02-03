package com.vcet.campushire.repos;

import com.vcet.campushire.entity.Shortlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShortlistRepository extends JpaRepository<Shortlist, Long> {
}
