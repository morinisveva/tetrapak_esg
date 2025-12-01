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
    if (esgClassification.type === 0) {
      return res.status(200).json({ 
        response: "I apologize, but this question doesn't appear to be related to ESG (Environmental, Social, or Governance) topics. I can only answer questions about Tetra Pak's sustainability practices based on their official reports. Please ask about environmental initiatives, social responsibility, or governance practices."
      });
    }

    // Step 2: Improve query with HyDE (Hypothetical Document Embeddings)
    const hydeResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: `Improve the user's question to make it clearer and better aligned with ESG terminology. 
This expanded version will be used for document search.

Rules:
- Do NOT answer the question
- Do NOT invent facts
- ONLY rewrite and expand using ESG terminology
- Add typical ESG concepts (emissions, waste, safety, governance, supply chain)
- Keep it 1-3 sentences maximum
- Output plain text, not JSON`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.5,
        max_tokens: 200,
      }),
    });

    const hydeResult = await hydeResponse.json();
    const improvedQuery = hydeResult.choices[0].message.content;

    // Step 3: Classify into E, S, or G category
    const categoryResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: `Classify the ESG question into one category:

1 = Environmental (E) — climate, carbon, energy, waste, packaging, pollution, biodiversity, water, materials
2 = Social (S) — human rights, labor, diversity, community impact, food safety, social responsibility
3 = Governance (G) — ethics, transparency, anti-corruption, leadership, compliance, risk management

Respond ONLY with JSON:
{"category": 1, 2, or 3}`
          },
          {
            role: 'user',
            content: improvedQuery
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3,
      }),
    });

    const categoryResult = await categoryResponse.json();
    const category = JSON.parse(categoryResult.choices[0].message.content);

    // Step 4: Get specialist agent instructions based on category
    let agentInstructions = '';
    
    if (category.category === 1) {
      // Environmental Agent
      agentInstructions = `You are an Environmental ESG expert for Tetra Pak. Answer questions about:
- Climate (scope 1-3, targets, energy, renewable electricity)
- Circularity (design, materials, collection & recycling rates)
- Nature/biodiversity & water
- Life-cycle impacts and packaging comparisons

Key facts to reference when relevant:
- 94% renewable electricity in operations (FY24)
- -54% own-ops GHG vs 2019; -25% value chain
- 28% global collection for recycling rate
- €42m for collection & recycling programs
- >1.3 Mt UBC collected
- ~€100m/yr R&D investment

Use data from the Tetra Pak Sustainability Report FY24 and LCA meta-study.
Be concise, quantitative, and always cite sources when providing specific numbers.
If the question goes beyond environmental scope, redirect to Social or Governance topics.`;
    } else if (category.category === 2) {
      // Social Agent
      agentInstructions = `You are a Social ESG expert for Tetra Pak. Answer questions about:
- Employee well-being & engagement
- Health & safety (TRAR metrics)
- Diversity, equity & inclusion
- Human rights in supply chain
- Community programs and food access
- School feeding programs
- Smallholder farmer support

Key facts to reference when relevant:
- TRAR ↓10% improvement
- 87% employee engagement
- 66M children reached via school feeding
- ~84k smallholder farmers supported
- Disability inclusion initiatives

Use data from the Tetra Pak Sustainability Report FY24.
Be people-first in language. Cite specific pages/sections for metrics.
If the question is about environmental or governance topics, redirect appropriately.`;
    } else {
      // Governance Agent
      agentInstructions = `You are a Governance ESG expert for Tetra Pak. Answer questions about:
- Business conduct & ethics
- Sustainability governance structure
- Double materiality approach (DMA)
- Stakeholder engagement
- Reporting approach (ESRS alignment)
- Incentives and scorecards (10% ESG in BSC)
- How sustainability is embedded in strategy

Key frameworks to reference:
- DMA four-phase process
- 21 material topics
- Strategy 2030
- Sustainability Excellence team
- CEO & ELT sustainability objectives

Use data from the Tetra Pak Sustainability Report FY24.
Be policy-literate and define terms. Present processes as ordered steps.
If the question is about environmental or social topics, redirect appropriately.`;
    }

    // Step 5: Get final answer from specialized agent
    const finalResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: agentInstructions
          },
          {
            role: 'user',
            content: `Original question: ${message}\n\nImproved query: ${improvedQuery}\n\nPlease provide a comprehensive answer based on Tetra Pak's sustainability reports.`
          }
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const finalResult = await finalResponse.json();
    const answer = finalResult.choices[0].message.content;

    return res.status(200).json({ response: answer });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
