package com.vote.webtesting.service;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class WebHookSender {
    private final WebClient webClient;

    public WebHookSender(WebClient.Builder builder) {
        this.webClient = builder.baseUrl("YOUR DOCKER N8N HOST LINK").build();
    }

    public void sendTextToN8n(String text) {
        String jsonPayload = "{\"text\":\"" + text + "\"}";

        webClient.post()
                .uri("/webhook-test/speech-input") // Make sure this matches your N8N webhook path
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(jsonPayload)
                .retrieve()
                .bodyToMono(String.class)
                .doOnNext(response -> System.out.println("✅ Sent to N8N: " + response))
                .subscribe(); // Async for production
    }
}
