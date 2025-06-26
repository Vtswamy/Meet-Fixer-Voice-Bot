import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENROUTER_API_KEY = 'YOUR-API-KEY';

async function parseIntent(resumeText) {
    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'YOUR-MODEL-NAME',
                messages: [
                    {
                        role: 'system',
                        content: `// INITIAL DATA INJECTION
You are an AI assistant that evaluates resumes.
Given a resume text, extract the following information:
- name (candidate's full name)
- experience (a score between 0 to 10)
- skills (a score between 0 to 10)
- summary (a 1-2 line summary of the candidate)

Return only a *valid JSON object* like:
{
  "name": "John Doe",
  "experience": 8,
  "skills": 7,
  "summary": "Experienced software engineer with strong backend skills."
}

No explanation, no markdown, only valid JSON.
                        `.trim()
                    },
                    {
                        role: 'user',
                        content: resumeText
                    }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const raw = response.data.choices[0].message.content.trim();

        // Extract only the JSON part using regex
        const match = raw.match(/\{[\s\S]*?\}/);
        if (!match) {
            throw new Error('No valid JSON object found in LLM response.');
        }

        return JSON.parse(match[0]);

    } catch (error) {
        console.error('❌ Error in parseIntent:', error.message);
        throw error;
    }
}

export default parseIntent;
