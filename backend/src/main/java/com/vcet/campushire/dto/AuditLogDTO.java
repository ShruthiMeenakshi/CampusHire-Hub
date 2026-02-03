package com.vcet.campushire.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLogDTO {
    private Long id;
    private UserDTO user;
    private String action;
    private String entityType;
    private Long entityId;
    private String details;
    private String timestamp;
}
