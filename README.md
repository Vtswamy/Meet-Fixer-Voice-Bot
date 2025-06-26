# Voice-Driven Workflow Automation System
## Overview
This project implements a voice-activated automation workflow using Spring Boot and Thymeleaf. The system accepts voice input from users, transcribes it to text using the browser's speech recognition capabilities, and processes it through an n8n workflow. It integrates with OpenRouter.ai for AI-based JSON generation, Aiven for database queries, and Twilio for automated voice call confirmations.

## Technologies Used
Backend
Spring Boot
Thymeleaf
Jackson (for JSON processing)
Maven

## External Services
Google Web Speech API (for voice-to-text)
OpenRouter.ai (for AI-generated structured responses)
Aiven (for cloud-hosted database access)
Twilio API (for voice calls)
n8n (workflow orchestration)

## Maven Dependencies
1. spring-boot-starter
2. spring-boot-starter-web
3. spring-boot-starter-thymeleaf
4. spring-boot-devtools
5. spring-boot-starter-test
6. jackson-databind
```
src/
├── main/
│   ├── java/
│   │   └── com/yourdomain/project/
│   │       ├── controller/
│   │       ├── service/
│   │       └── model/
│   ├── resources/
│   │   ├── templates/       (Thymeleaf HTML views)
│   │   └── application.properties
```
Configuration
Configure environment-specific values in application.properties:

properties
Copy
Edit
server.port=8080
openrouter.api.key=your_openrouter_api_key
twilio.account.sid=your_twilio_account_sid
twilio.auth.token=your_twilio_auth_token
aiven.database.url=jdbc:postgresql://your-db-url
