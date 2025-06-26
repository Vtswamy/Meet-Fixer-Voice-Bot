function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech Recognition not supported in your browser.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    document.getElementById("speakBtn").disabled = true;
    recognition.start();

    recognition.onresult = (event) => {
        const speechText = event.results[0][0].transcript;
        document.getElementById("transcript").innerText = speechText;

        fetch("/api/speech", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: speechText })
        })
            .then(res => res.json())
            .then(data => {
                document.getElementById("resultBox").innerText = JSON.stringify(data, null, 2);
            })
            .catch(err => console.error("Fetch Error:", err))
            .finally(() => {
                document.getElementById("speakBtn").disabled = false;
            });
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        document.getElementById("speakBtn").disabled = false;
    };
}
