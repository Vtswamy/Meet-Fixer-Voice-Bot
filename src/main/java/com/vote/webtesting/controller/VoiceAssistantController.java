package com.vote.webtesting.controller;

import com.vote.webtesting.service.WebHookSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@Controller
public class VoiceAssistantController {

    @Autowired
    private final WebHookSender webHookSender;

    public VoiceAssistantController(WebHookSender webHookSender) {
        this.webHookSender = webHookSender;
    }

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @PostMapping("/api/speech")
    @ResponseBody
    public ResponseEntity<?> handleSpeech(@RequestBody Map<String, String> body) {
        String text = body.get("text");
        webHookSender.sendTextToN8n(text);
        return ResponseEntity.ok(Map.of("message", "✅ Sent to N8N", "text", text));
    }
}