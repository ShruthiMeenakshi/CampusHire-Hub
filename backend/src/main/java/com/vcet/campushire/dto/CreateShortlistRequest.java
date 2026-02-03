package com.vcet.campushire.dto;

import java.util.List;

public record CreateShortlistRequest(
        String name,
        List<Long> studentIds
) {}
