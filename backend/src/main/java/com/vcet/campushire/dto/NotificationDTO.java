package com.vcet.campushire.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationDTO {
    private Long id;
    private String title;
    private String message;
    private Boolean isRead;
    private String createdAt;
}
