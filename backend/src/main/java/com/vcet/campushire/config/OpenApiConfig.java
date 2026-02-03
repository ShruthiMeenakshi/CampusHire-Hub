package com.vcet.campushire.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.tags.Tag;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springdoc.core.models.GroupedOpenApi;
import io.swagger.v3.oas.models.OpenAPI;

@Configuration
public class OpenApiConfig {

    @Value("${spring.application.name:campushire}")
    private String appName;

    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("CampusHire API")
                        .description("REST APIs for CampusHire — authentication, profiles, events, analytics, and admin tools.")
                        .version("v1")
                        .contact(new Contact().name("VCET T&P").email("placement@example.com"))
                        .license(new License().name("Proprietary")))
                .addTagsItem(new Tag().name("auth").description("Authentication endpoints"))
                .addTagsItem(new Tag().name("student").description("Student profile endpoints"))
                .addTagsItem(new Tag().name("events").description("Placement events endpoints"))
                .addTagsItem(new Tag().name("admin").description("Admin endpoints"))
                .addTagsItem(new Tag().name("faculty").description("Faculty endpoints"))
                .addTagsItem(new Tag().name("analytics").description("Analytics endpoints"))
                .externalDocs(new ExternalDocumentation()
                        .description("Project README")
                        .url("https://example.com/readme"));
    }

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("campushire")
                .pathsToMatch("/api/**")
                .build();
    }
}
