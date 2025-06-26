import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || 'YOUR-API-KEY';

async function parseIntent(userText) {
    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'meta-llama/llama-3-8b-instruct',
                messages: [
                    {
                        role: 'system',// AI CHAT INJECTION (INITIAL)
                        content: 'You are a meeting scheduling assistant. Extract structured data from the user\'s message. Return only a JSON object with the keys: intent, contact, and datetime. Do not include any explanation or formatting. Just the raw JSON.'
                    },
                    {
                        role: 'user',
                        content: userText
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`, // ✅ Fixed template string
                    'Content-Type': 'application/json'
                }
            }
        );

        const raw = response.data.choices[0].message.content.trim();

        const match = raw.match(/\{[\s\S]*?}/);
        if (!match) throw new Error("No JSON object found in LLM response.");

        return JSON.parse(match[0]);

    } catch (error) {
        console.error('Error in parseIntent:', error.message);
        throw error;
    }
}

export default parseIntent;
