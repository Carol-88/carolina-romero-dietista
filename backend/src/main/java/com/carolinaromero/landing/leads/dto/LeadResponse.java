package com.carolinaromero.landing.leads.dto;

public record LeadResponse(Long id, String email, String type, String service, String createdAt) {}
