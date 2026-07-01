package com.carolinaromero.landing.leads;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class LeadControllerTest {

  @Autowired private MockMvc mockMvc;

  @Test
  void registersContactLead() throws Exception {
    mockMvc
        .perform(
            post("/api/leads/contact")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    """
                    {
                      "name": "Ana Test",
                      "email": "ana@example.com",
                      "service": "consulta-gratis",
                      "message": "Hola",
                      "privacyConsent": true
                    }
                    """))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.email").value("ana@example.com"))
        .andExpect(jsonPath("$.type").value("contact"));
  }

  @Test
  void rejectsHoneypot() throws Exception {
    mockMvc
        .perform(
            post("/api/leads/waitlist")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    """
                    {
                      "email": "bot@example.com",
                      "plan": "trimestral",
                      "privacyConsent": true,
                      "website": "http://spam.test"
                    }
                    """))
        .andExpect(status().isBadRequest());
  }
}
