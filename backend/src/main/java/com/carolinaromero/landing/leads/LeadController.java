package com.carolinaromero.landing.leads;

import com.carolinaromero.landing.leads.dto.ContactLeadRequest;
import com.carolinaromero.landing.leads.dto.LeadResponse;
import com.carolinaromero.landing.leads.dto.WaitlistLeadRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/leads")
public class LeadController {

  private final LeadService leadService;

  public LeadController(LeadService leadService) {
    this.leadService = leadService;
  }

  @PostMapping("/contact")
  @ResponseStatus(HttpStatus.CREATED)
  public LeadResponse registerContact(@Valid @RequestBody ContactLeadRequest request) {
    return leadService.registerContact(request);
  }

  @PostMapping("/waitlist")
  @ResponseStatus(HttpStatus.CREATED)
  public LeadResponse registerWaitlist(@Valid @RequestBody WaitlistLeadRequest request) {
    return leadService.registerWaitlist(request);
  }
}
