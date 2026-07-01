package com.carolinaromero.landing.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

  private final String[] allowedOrigins;

  public CorsConfig(
      @Value("${app.cors.allowed-origins:}") String allowedOriginsList,
      @Value("${app.cors.allowed-origin:http://localhost:5500}") String allowedOriginSingle) {
    this.allowedOrigins = CorsOrigins.resolve(allowedOriginsList, allowedOriginSingle);
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry
        .addMapping("/api/**")
        .allowedOrigins(allowedOrigins)
        .allowedMethods("GET", "POST", "OPTIONS")
        .allowedHeaders("*")
        .allowCredentials(false);
  }
}
