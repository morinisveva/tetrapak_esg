// Test script to check GPT-5 Nano availability
// Run this to see if your API key has access to gpt-5-nano

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    // Try to use gpt-5-nano
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-5-nano',
        messages: [
          {
            role: 'user',
            content: message || 'Test message'
          }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(200).json({ 
        available: false,
        error: data.error?.message || 'Unknown error',
        suggestion: 'GPT-5 Nano might not be available in your API. Try using gpt-4 or gpt-4-turbo instead.'
      });
    }

    return res.status(200).json({ 
      available: true,
      response: data.choices[0]?.message?.content,
      message: 'GPT-5 Nano is available! ✅'
    });

  } catch (error) {
    return res.status(500).json({ 
      available: false,
      error: error.message,
      suggestion: 'Check your OpenAI API key and account access'
    });
  }
}
