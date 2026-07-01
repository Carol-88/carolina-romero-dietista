package com.carolinaromero.landing.leads;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LeadRepository extends JpaRepository<LeadEntity, Long> {

  boolean existsByLeadTypeAndEmailIgnoreCase(LeadType leadType, String email);
}
