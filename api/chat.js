// Advanced API handler that mirrors your OpenAI Playground workflow more closely
// This version simulates the multi-agent routing system

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const VECTOR_STORE_ID = 'vs_691f2b9a56948191a950830483fe9d90';

    // Step 1: Check if question is ESG-related
    const esgCheckResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `Classify the user's question as either related or not related to ESG (Environmental, Social, or Governance) topics. 
            
LABELS:
- 1 → ESG-related (environmental, social, or governance topics)
- 0 → Not ESG-related

Respond ONLY with a JSON object:
{"type": 0 or 1}

Examples:
- "How can businesses reduce their carbon emissions?" → {"type": 1}
- "What was the company's net profit?" → {"type": 0}
- "Explain the role of diversity on corporate boards." → {"type": 1}`
          },
          {
            role: 'user',
            content: message
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      }),
    });

    const esgCheck = await esgCheckResponse.json();
    const esgClassification = JSON.parse(esgCheck.choices[0].message.content);

    // If not ESG-related, return early
    if (esgClassification.type ===
