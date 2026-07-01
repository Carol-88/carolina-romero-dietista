package com.carolinaromero.landing.leads;

import com.carolinaromero.landing.common.ApiException;
import com.carolinaromero.landing.leads.dto.ContactLeadRequest;
import com.carolinaromero.landing.leads.dto.LeadResponse;
import com.carolinaromero.landing.leads.dto.WaitlistLeadRequest;
import java.time.Instant;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LeadService {

  private final LeadRepository leadRepository;

  public LeadService(LeadRepository leadRepository) {
    this.leadRepository = leadRepository;
  }

  @Transactional
  public LeadResponse registerContact(ContactLeadRequest request) {
    rejectHoneypot(request.website());

    String email = normalizeEmail(request.email());
    validateBioevolvaEmail(request.bioevolvaUser(), request.bioevolvaEmail());

    Instant now = Instant.now();
    LeadEntity lead =
        leadRepository.save(
            new LeadEntity(
                LeadType.CONTACT,
                email,
                trimToNull(request.name()),
                trimToNull(request.phone()),
                trimToNull(request.service()),
                trimToNull(request.message()),
                Boolean.TRUE.equals(request.bioevolvaUser()),
                normalizeOptionalEmail(request.bioevolvaEmail()),
                trimToNull(request.source()),
                trimToNull(request.utmSource()),
                trimToNull(request.utmMedium()),
                trimToNull(request.utmCampaign()),
                now,
                now));

    return toResponse(lead);
  }

  @Transactional
  public LeadResponse registerWaitlist(WaitlistLeadRequest request) {
    rejectHoneypot(request.website());

    String email = normalizeEmail(request.email());
    validateBioevolvaEmail(request.bioevolvaUser(), request.bioevolvaEmail());

    if (leadRepository.existsByLeadTypeAndEmailIgnoreCase(LeadType.WAITLIST, email)) {
      throw new ApiException(
          HttpStatus.CONFLICT,
          "Este correo ya está en la lista de espera. Te avisaré cuando abran los planes.");
    }

    Instant now = Instant.now();
    LeadEntity lead =
        leadRepository.save(
            new LeadEntity(
                LeadType.WAITLIST,
                email,
                null,
                null,
                trimToNull(request.plan()),
                null,
                Boolean.TRUE.equals(request.bioevolvaUser()),
                normalizeOptionalEmail(request.bioevolvaEmail()),
                trimToNull(request.source()),
                trimToNull(request.utmSource()),
                trimToNull(request.utmMedium()),
                trimToNull(request.utmCampaign()),
                now,
                now));

    return toResponse(lead);
  }

  private void rejectHoneypot(String website) {
    if (website != null && !website.isBlank()) {
      throw new ApiException(HttpStatus.BAD_REQUEST, "La petición no es válida.");
    }
  }

  private void validateBioevolvaEmail(Boolean bioevolvaUser, String bioevolvaEmail) {
    if (Boolean.TRUE.equals(bioevolvaUser)
        && (bioevolvaEmail == null || bioevolvaEmail.isBlank())) {
      throw new ApiException(
          HttpStatus.BAD_REQUEST, "Indica el email con el que te registraste en BioEvolva.");
    }
  }

  private String normalizeEmail(String email) {
    return email.trim().toLowerCase();
  }

  private String normalizeOptionalEmail(String email) {
    if (email == null || email.isBlank()) {
      return null;
    }
    return email.trim().toLowerCase();
  }

  private String trimToNull(String value) {
    if (value == null) {
      return null;
    }
    String trimmed = value.trim();
    return trimmed.isEmpty() ? null : trimmed;
  }

  private LeadResponse toResponse(LeadEntity lead) {
    return new LeadResponse(
        lead.getId(),
        lead.getEmail(),
        lead.getLeadType().name().toLowerCase(),
        lead.getService(),
        lead.getCreatedAt().toString());
  }
}
