package com.carolinaromero.landing.leads;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "leads")
public class LeadEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Enumerated(EnumType.STRING)
  @Column(name = "lead_type", nullable = false, length = 32)
  private LeadType leadType;

  @Column(nullable = false, length = 255)
  private String email;

  @Column(length = 120)
  private String name;

  @Column(length = 40)
  private String phone;

  @Column(length = 64)
  private String service;

  @Column(columnDefinition = "TEXT")
  private String message;

  @Column(name = "bioevolva_user", nullable = false)
  private boolean bioevolvaUser;

  @Column(name = "bioevolva_email", length = 255)
  private String bioevolvaEmail;

  @Column(length = 64)
  private String source;

  @Column(name = "utm_source", length = 128)
  private String utmSource;

  @Column(name = "utm_medium", length = 128)
  private String utmMedium;

  @Column(name = "utm_campaign", length = 128)
  private String utmCampaign;

  @Column(name = "consented_at", nullable = false)
  private Instant consentedAt;

  @Column(name = "created_at", nullable = false)
  private Instant createdAt;

  protected LeadEntity() {}

  public LeadEntity(
      LeadType leadType,
      String email,
      String name,
      String phone,
      String service,
      String message,
      boolean bioevolvaUser,
      String bioevolvaEmail,
      String source,
      String utmSource,
      String utmMedium,
      String utmCampaign,
      Instant consentedAt,
      Instant createdAt) {
    this.leadType = leadType;
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.service = service;
    this.message = message;
    this.bioevolvaUser = bioevolvaUser;
    this.bioevolvaEmail = bioevolvaEmail;
    this.source = source;
    this.utmSource = utmSource;
    this.utmMedium = utmMedium;
    this.utmCampaign = utmCampaign;
    this.consentedAt = consentedAt;
    this.createdAt = createdAt;
  }

  public Long getId() {
    return id;
  }

  public LeadType getLeadType() {
    return leadType;
  }

  public String getEmail() {
    return email;
  }

  public String getService() {
    return service;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }
}
