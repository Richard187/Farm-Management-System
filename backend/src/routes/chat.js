import { Router } from 'express';

export const router = Router();

router.post('/', async (req, res) => {
  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    let reply;

    if (apiKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'You are an AI assistant for farm management. Be concise and actionable.' },
              { role: 'user', content: message }
            ],
            temperature: 0.3
          })
        });

        if (!response.ok) {
          throw new Error(`Upstream error ${response.status}`);
        }
        const data = await response.json();
        reply = data?.choices?.[0]?.message?.content?.trim() || 'I could not generate a response.';
      } catch (e) {
        // Fallback to local responder on upstream failure
        reply = localResponder(message);
      }
    } else {
      reply = localResponder(message);
    }

    return res.json({ reply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to process chat' });
  }
});

function localResponder(input) {
  const text = String(input).toLowerCase();
  if (text.includes('crop') || text.includes('plant')) {
    return 'Consider soil moisture, rainfall, and planting calendar. For most cereals, target planting at soil temps above 10°C and irrigate to field capacity. Do you want a seeding rate recommendation?';
  }
  if (text.includes('animal') || text.includes('cattle') || text.includes('goat')) {
    return 'Monitor feed intake, water, body condition score, and vaccinations. Schedule deworming quarterly based on fecal counts. Need a health checklist?';
  }
  if (text.includes('field') || text.includes('acre')) {
    return 'Map your fields and track area in acres. Rotate crops yearly to reduce pest pressure. Want me to draft a simple rotation plan?';
  }
  if (text.includes('task') || text.includes('todo')) {
    return 'Add tasks with title, due date, and link to field/crop/animal. I can propose a weekly task schedule based on your season.';
  }
  if (text.includes('weather') || text.includes('rain')) {
    return 'Check the 7-day forecast to plan irrigation and spraying. Avoid spraying if rain probability > 50% within 24h.';
  }
  return 'I can help with crops, animals, fields, and tasks. Ask me about planting dates, feeding plans, or scheduling work.';
}


