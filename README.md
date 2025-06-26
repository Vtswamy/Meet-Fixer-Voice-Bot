# Voice-Controlled Meeting Scheduler (Spring Boot + n8n)

A voice-controlled meeting scheduling system using *Spring Boot (Thymeleaf frontend), **OpenRouter LLM API, and **n8n* for workflow automation. Users can speak into the browser, and the app transcribes speech, extracts meeting details, makes a call via Twilio, and schedules a meeting.

---

## Features

* Live voice-to-text transcription
* Natural Language Understanding via LLaMA 3 (OpenRouter)
* Intent parsing: Extract contact, time, and intent from spoken text
* Twilio voice call to confirm meeting with the contact
* Auto-scheduling via Google Calendar or other integrations

---

## Tech Stack

### Backend

* Java
* Spring Boot
* Thymeleaf (template engine)
* Jackson (for JSON)
* Maven

### Workflow Automation

* n8n (self-hosted with Docker)

### External APIs

* OpenRouter (LLaMA 3)
* Twilio (for calling)
* Google Calendar API (optional)

---

## Spring Boot Setup

### Maven Dependencies (in pom.xml)
* Maven Dependencies
* spring-boot-starter
* spring-boot-starter-web
* spring-boot-starter-thymeleaf
* spring-boot-devtools
* spring-boot-starter-test
* jackson-databind

### Run Project

bash
mvn clean install
mvn spring-boot:run

---

## Project Structure

```
project-root/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/example/voicebot/
│       │       ├── controller/
│       │       │   └── IntentController.java
│       │       ├── model/
│       │       │   └── IntentRequest.java
│       │       └── service/
│       │           └── IntentParserService.java
│       └── resources/
│           ├── templates/
│           │   └── index.html
│           └── application.properties
├── pom.xml

```
---

## n8n Workflow Configuration

### Step 1: Webhook Node (Trigger)

* Method: POST
* Path: /speech-input
* Output: { "text": "Call Sara on Monday at 3PM" }

### Step 2: HTTP Request Node

* Method: POST
* URL: http://host.docker.internal:8080/intent
* Headers: Content-Type: application/json
* Body:

json
{
  "text": "{{$json["text"]}}"
}


### Step 3: Twilio Node (Make Call)

* From: Your Twilio number
* To: Extracted contact
* Say: "You have a meeting scheduled for {{ \$json\["datetime"] }}. Press 1 to confirm."

### Step 4: MySQL Node (Store Record)

* Insert intent, contact, and datetime into a table

### Optional Step 5: Google Calendar Node

* Schedule meeting using extracted fields

---
## Demo N8N WorkFlow
![WhatsApp Image 2025-06-26 at 17 47 29_4a77f574](https://github.com/user-attachments/assets/ed45692a-539d-42d5-8421-f9700ed94aa1)


---

## Environment Variables

Create a .env file in your root:


OPENROUTER_API_KEY=your_openrouter_key
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_twilio_number

---

## Author

Built by Vtswamy and SyedIrfan for portfolio and automation learning.
