package com.carolinaromero.landing.leads.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ContactLeadRequest(
    @NotBlank @Size(max = 120) String name,
    @NotBlank @Email @Size(max = 255) String email,
    @Size(max = 40) String phone,
    @NotBlank @Size(max = 64) String service,
    @NotBlank @Size(max = 4000) String message,
    Boolean bioevolvaUser,
    @Email @Size(max = 255) String bioevolvaEmail,
    @AssertTrue(message = "Debes aceptar la política de privacidad.")
    Boolean privacyConsent,
    @Size(max = 120) String website,
    @Size(max = 64) String source,
    @Size(max = 128) String utmSource,
    @Size(max = 128) String utmMedium,
    @Size(max = 128) String utmCampaign) {}
