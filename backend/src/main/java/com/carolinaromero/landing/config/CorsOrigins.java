package com.carolinaromero.landing.config;

import java.util.LinkedHashSet;
import java.util.Set;

final class CorsOrigins {

  private CorsOrigins() {}

  static String[] resolve(String allowedOriginsList, String allowedOriginSingle) {
    String raw =
        allowedOriginsList != null && !allowedOriginsList.isBlank()
            ? allowedOriginsList
            : (allowedOriginSingle != null ? allowedOriginSingle : "");

    if (raw.isBlank()) {
      return new String[] {"http://localhost:5500"};
    }

    Set<String> origins = new LinkedHashSet<>();
    for (String part : raw.split(",")) {
      String trimmed = part.trim();
      if (!trimmed.isEmpty()) {
        origins.add(trimmed);
      }
    }

    if (origins.isEmpty()) {
      return new String[] {"http://localhost:5500"};
    }

    return origins.toArray(String[]::new);
  }
}
