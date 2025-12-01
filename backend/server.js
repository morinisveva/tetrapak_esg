// server.js - Node.js Express server using your exact OpenAI Agents workflow
import express from 'express';
import cors from 'cors';
import { fileSearchTool, Agent, Runner, withTrace } from "@openai/agents";
import { OpenAI } from "openai";
import { runGuardrails } from "@openai/guardrails";
import { z } from "zod";

const app = express();
app.use(cors());
app.use(express.json());

// Shared client for guardrails and file search
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Tool definitions
const fileSearch = fileSearchTool([
  "vs_691f2b9a56948191a950830483fe9d90"
]);

// Guardrails definitions
const guardrailsConfig = {
  guardrails: [
    { name: "Moderation", config: { categories: ["sexual/minors", "hate/threatening", "harassment/threatening", "self-harm/instructions", "violence/graphic", "illicit/violent"] } },
    { name: "Jailbreak", config: { model: "gpt-4o-mini", confidence_threshold: 0.7 } }
  ]
};
const context = { guardrailLlm: client };

function guardrailsHasTripwire(results) {
    return (results ?? []).some((r) => r?.tripwireTriggered === true);
}

function getGuardrailSafeText(results, fallbackText) {
    for (const r of results ?? []) {
        if (r?.info && ("checked_text" in r.info)) {
            return r.info.checked_text ?? fallbackText;
        }
    }
    const pii = (results ?? []).find((r) => r?.info && "anonymized_text" in r.info);
    return pii?.info?.anonymized_text ?? fallbackText;
}

async function scrubConversationHistory(history, piiOnly) {
    for (const msg of history ?? []) {
        const content = Array.isArray(msg?.content) ? msg.content : [];
        for (const part of content) {
            if (part && typeof part === "object" && part.type === "input_text" && typeof part.text === "string") {
                const res = await runGuardrails(part.text, piiOnly, context, true);
                part.text = getGuardrailSafeText(res, part.text);
            }
        }
    }
}

async function scrubWorkflowInput(workflow, inputKey, piiOnly) {
    if (!workflow || typeof workflow !== "object") return;
    const value = workflow?.[inputKey];
    if (typeof value !== "string") return;
    const res = await runGuardrails(value, piiOnly, context, true);
    workflow[inputKey] = getGuardrailSafeText(res, value);
}

async function runAndApplyGuardrails(inputText, config, history, workflow) {
    const guardrails = Array.isArray(config?.guardrails) ? config.guardrails : [];
    const results = await runGuardrails(inputText, config, context, true);
    const shouldMaskPII = guardrails.find((g) => (g?.name === "Contains PII") && g?.config && g.config.block === false);
    if (shouldMaskPII) {
        const piiOnly = { guardrails: [shouldMaskPII] };
        await scrubConversationHistory(history, piiOnly);
        await scrubWorkflowInput(workflow, "input_as_text", piiOnly);
        await scrubWorkflowInput(workflow, "input_text", piiOnly);
    }
    const hasTripwire = guardrailsHasTripwire(results);
    const safeText = getGuardrailSafeText(results, inputText) ?? inputText;
    return { results, hasTripwire, safeText, failOutput: buildGuardrailFailOutput(results ?? []), passOutput: { safe_text: safeText } };
}

function buildGuardrailFailOutput(results) {
    const get = (name) => (results ?? []).find((r) => ((r?.info?.guardrail_name ?? r?.info?.guardrailName) === name));
    const pii = get("Contains PII"), mod = get("Moderation"), jb = get("Jailbreak");
    const piiCounts = Object.entries(pii?.info?.detected_entities ?? {}).filter(([, v]) => Array.isArray(v)).map(([k, v]) => k + ":" + v.length);
    return {
        pii: { failed: (piiCounts.length > 0) || pii?.tripwireTriggered === true, detected_counts: piiCounts },
        moderation: { failed: mod?.tripwireTriggered === true || ((mod?.info?.flagged_categories ?? []).length > 0), flagged_categories: mod?.info?.flagged_categories },
        jailbreak: { failed: jb?.tripwireTriggered === true }
    };
}

const EsgRelatedSchema = z.object({ type: z.number() });
const ESGSchema = z.object({ category: z.number() });

const esgRelated = new Agent({
  name: "ESG_related",
  instructions: `Classify the user's question as either related or not related to ESG (Environmental, Social, or Governance) topics using the labels below. Base your classification solely on the criteria and examples provided. Always perform careful internal reasoning before arriving at your classification. Once you have reasoned through the question, output ONLY the final JSON.

LABELS AND DEFINITIONS

- 1 → ESG-related  
  Use this when the question clearly concerns any ESG topic, including:  
  - Environmental: emissions, pollution, energy use, resource management, waste, climate, biodiversity  
  - Social: labor issues, human rights, diversity, work safety, community/social impact  
  - Governance: board structure, ethics, corruption, transparency, reporting practices

- 0 → Not ESG-related  
  Use this when the question is:  
  - About something not related to ESG (e.g., financial, mathematical, operational, personal, or product-specific topics)  
  - Too vague to confidently identify as ESG-related

RULES
- Only select one type (0 or 1).
- If uncertain, always select 0.
- Do not answer, paraphrase, or rewrite the user's question.
- Your response must be valid JSON and nothing else.

OUTPUT FORMAT
{"type": <0 or 1>}`,
  model: "gpt-5-nano",
  outputType: EsgRelatedSchema,
  modelSettings: {
    reasoning: {
      effort: "low"
    },
    store: true
  }
});

const hyde = new Agent({
  name: "Hyde",
  instructions: `Your job is to improve the user's question so that it becomes clearer, more detailed, and better aligned with ESG terminology. This expanded version will be used ONLY as input to the document search.
Follow these rules:
Do NOT answer the question.
Do NOT invent facts, data, or claims.
ONLY rewrite and expand the question using general ESG and sustainability language.
You may:
clarify vague terms
add typical ESG concepts (e.g., emissions, waste, water use, safety, governance, supply chain)
rephrase into a more formal, report-like query
add synonyms and related terminology
Keep it short: 1–3 sentences maximum.
The purpose is to improve retrieval, not to solve the question.
Output plain text.`,
  model: "gpt-5-nano",
  modelSettings: {
    reasoning: {
      effort: "medium"
    },
    store: true
  }
});

const eSG = new Agent({
  name: "E,S,G",
  instructions: `You are an ESG classification expert. Your task is to read the rewritten user question and determine which ESG category it belongs to:
1 = Environmental (E) — Topics like climate change, carbon footprint, energy use, waste, packaging, pollution, biodiversity, water, or materials.
2 = Social (S) — Topics like human rights, labor conditions, diversity & inclusion, community impact, food safety, or social responsibility.
3 = Governance (G) — Topics like ethics, transparency, anti-corruption, leadership, compliance, risk management, or corporate governance.`,
  model: "gpt-5-nano",
  tools: [fileSearch],
  outputType: ESGSchema,
  modelSettings: {
    reasoning: {
      effort: "low"
    },
    store: true
  }
});

const environmental = new Agent({
  name: "Environmental",
  instructions: `Role & scope You answer questions about Tetra Pak's environmental topics only: climate (scope 1–3, targets, energy), circularity (design, materials, collection & recycling), nature/biodiversity & water, and life-cycle impacts. Use only these sources:
Tetra Pak Sustainability Report FY24 (environment pillars: Climate, Circularity, Nature; materiality map & value chain).
Meta Study of Life Cycle Assessment of Tetra Pak® carton packages (comparative packaging climate impacts; methods & conclusions).
Grounding & retrieval rules
Answer only if the claim is supported in the PDFs. Prefer the FY24 report for strategy, targets, metrics, programs; use the LCA meta-study for comparative climate results and methodology.
When numbers are requested (e.g., % reductions, tonnes, kWh, collection rates), quote precisely and include the page/section in your citation. Example: "94% renewable electricity in operations (FY24)" → cite the FY24 highlights page.
If the user asks beyond E-scope (social governance, finance, product pricing), reply: "That's outside my environmental scope. Try the Social or Governance agent."
What to prioritize from the PDFs
FY24 focus areas and material topics (Climate, Circularity, Nature; value-chain view).
2024 achievements & targets (e.g., −54% own-ops GHG vs 2019; −25% value chain; 94% renewable electricity; €42m for collection & recycling; >1.3 Mt UBC collected; 28% global collection for recycling rate; 215 recyclers engaged).
Packaging R&D and material innovations (plant-based polymers, recycled polymer caps, paper-based barrier; ~€100m/yr R&D).
Nature framework (targets; Araucaria restoration, water, biodiversity, VOC reductions).
LCA meta-study findings (beverage cartons vs PET/HDPE/glass, plant-based polymers effect, allocation approach).
Style & structure
Be concise, neutral, and quantitative. Lead with the direct answer, then add context.
Always include citations at the end of the sentences that contain facts (you may cite multiple pages if needed).
If the PDFs do not contain the answer, say you cannot confirm from the provided documents and offer the nearest related metric or section to check.`,
  model: "gpt-5-nano",
  tools: [fileSearch],
  modelSettings: {
    reasoning: {
      effort: "high"
    },
    store: true
  }
});

const social = new Agent({
  name: "Social",
  instructions: `Role & scope You answer questions about Tetra Pak's people and communities topics only: employee well-being & engagement, health & safety, diversity-equity-inclusion, human rights in the supply chain, worker voice, informal waste collection workers, community programs, food access / school feeding, and livelihoods (e.g., Dairy Hubs). Use only the Tetra Pak Sustainability Report FY24.
Grounding & retrieval rules
Pull metrics and programs from FY24 (e.g., TRAR ↓10%; 87% engagement; 84% "whole selves"; 66M children reached via school feeding; ~84k smallholder farmers supported; supplier engagement & human rights actions). Cite the specific page/section.
When the question mixes social with environmental, answer only the social part and point the user to the Environmental agent for the rest.
What to prioritize from the PDF
The "Social sustainability" chapter: employee indicators (H&S, DEI, engagement), initiatives (disability inclusion project, volunteering guidelines), and progress.
Value-chain people topics from the materiality map: working conditions & forced labour in supply chain; impacts on communities & indigenous peoples; living/working conditions of informal waste workers; consumer health & safety (social angle).
Programs improving livelihoods and access to food (Dairy Hubs; school feeding).
Style & structure
Direct answer first, then brief context (program → outcome → FY24 metric).
Use people-first language; avoid marketing tone.
Always place citations after factual claims.
If data aren't in the file, state that clearly and suggest keywords/sections (e.g., "Social sustainability," "Stakeholder engagement") the user can check.`,
  model: "gpt-5-nano",
  tools: [fileSearch],
  modelSettings: {
    reasoning: {
      effort: "high"
    },
    store: true
  }
});

const governance = new Agent({
  name: "Governance",
  instructions: `Role & scope You answer questions about Tetra Pak's governance of sustainability only: business conduct, ethics & compliance, sustainability governance structure, double materiality approach, stakeholder engagement, reporting approach (ESRS alignment), incentives/scorecards, and how sustainability is embedded in strategy and decision-making. Use only the Tetra Pak Sustainability Report FY24.
Grounding & retrieval rules
Rely on sections covering: materiality process (DMA phases & thresholds), governance structure, Balanced Scorecard & incentive linkages, reporting scope/assurance, stakeholder engagement mechanisms, and "Business conduct" material topic. Cite pages precisely.
If asked about Board composition or legally required disclosures not in FY24, state that the PDFs don't include those details.
What to prioritize from the PDF
DMA four-phase process (identification → assessment → determination; impact vs financial materiality).
Value-chain map & 21 material topics (noting "Business conduct" is the governance topic).
Sustainability governance & embedding (Strategy 2030; Sustainability Excellence team; data, systems, controls).
Incentives/scorecards (10% ESG in BSC; CEO & ELT sustainability objectives).
Reporting scope, assurance, and ESRS reference.
Stakeholder engagement channels and the Sustainability Advisory Panel.
Style & structure
Be crisp and policy-literate. Define terms (e.g., "double materiality") before applying them.
When discussing processes, present them as short, ordered steps and cite.
Always include citations after factual claims.`,
  model: "gpt-5-nano",
  tools: [fileSearch],
  modelSettings: {
    reasoning: {
      effort: "high"
    },
    store: true
  }
});

// Main workflow function
const runWorkflow = async (workflow) => {
  return await withTrace("Tetra Pack 2", async () => {
    const conversationHistory = [
      { role: "user", content: [{ type: "input_text", text: workflow.input_as_text }] }
    ];
    
    const runner = new Runner({
      traceMetadata: {
        __trace_source__: "agent-builder",
        workflow_id: "wf_692847dc002c81908df19f7d22415b6d07ad9dce8a6d9a91"
      }
    });
    
    const guardrailsInputText = workflow.input_as_text;
    const { hasTripwire: guardrailsHasTripwire, safeText: guardrailsAnonymizedText, failOutput: guardrailsFailOutput, passOutput: guardrailsPassOutput } = await runAndApplyGuardrails(guardrailsInputText, guardrailsConfig, conversationHistory, workflow);
    
    if (guardrailsHasTripwire) {
      return guardrailsFailOutput;
    }
    
    // Run ESG_related agent
    const esgRelatedResultTemp = await runner.run(esgRelated, conversationHistory);
    conversationHistory.push(...esgRelatedResultTemp.newItems.map((item) => item.rawItem));
    
    if (!esgRelatedResultTemp.finalOutput) {
      throw new Error("Agent result is undefined");
    }
    
    const esgRelatedResult = {
      output_text: JSON.stringify(esgRelatedResultTemp.finalOutput),
      output_parsed: esgRelatedResultTemp.finalOutput
    };
    
    if (esgRelatedResult.output_parsed.type == 1) {
      // Run Hyde agent
      const hydeResultTemp = await runner.run(hyde, conversationHistory);
      conversationHistory.push(...hydeResultTemp.newItems.map((item) => item.rawItem));
      
      if (!hydeResultTemp.finalOutput) {
        throw new Error("Agent result is undefined");
      }
      
      const hydeResult = {
        output_text: hydeResultTemp.finalOutput ?? ""
      };
      
      // File search
      const filesearchResult = (await client.vectorStores.search("vs_691f2b9a56948191a950830483fe9d90", {
        query: hydeResult.output_text,
        max_num_results: 5
      })).data.map((result) => {
        return {
          id: result.file_id,
          filename: result.filename,
          score: result.score,
        }
      });
      
      // Run E,S,G classifier
      const eSGResultTemp = await runner.run(eSG, conversationHistory);
      conversationHistory.push(...eSGResultTemp.newItems.map((item) => item.rawItem));
      
      if (!eSGResultTemp.finalOutput) {
        throw new Error("Agent result is undefined");
      }
      
      const eSGResult = {
        output_text: JSON.stringify(eSGResultTemp.finalOutput),
        output_parsed: eSGResultTemp.finalOutput
      };
      
      // Route to specialist agent
      if (eSGResult.output_parsed.category == 1) {
        const environmentalResultTemp = await runner.run(environmental, conversationHistory);
        conversationHistory.push(...environmentalResultTemp.newItems.map((item) => item.rawItem));
        
        if (!environmentalResultTemp.finalOutput) {
          throw new Error("Agent result is undefined");
        }
        
        return {
          output_text: environmentalResultTemp.finalOutput ?? ""
        };
      } else if (eSGResult.output_parsed.category == 2) {
        const socialResultTemp = await runner.run(social, conversationHistory);
        conversationHistory.push(...socialResultTemp.newItems.map((item) => item.rawItem));
        
        if (!socialResultTemp.finalOutput) {
          throw new Error("Agent result is undefined");
        }
        
        return {
          output_text: socialResultTemp.finalOutput ?? ""
        };
      } else if (eSGResult.output_parsed.category == 3) {
        const governanceResultTemp = await runner.run(governance, conversationHistory);
        conversationHistory.push(...governanceResultTemp.newItems.map((item) => item.rawItem));
        
        if (!governanceResultTemp.finalOutput) {
          throw new Error("Agent result is undefined");
        }
        
        return {
          output_text: governanceResultTemp.finalOutput ?? ""
        };
      } else {
        return eSGResult;
      }
    } else {
      return {
        output: "I apologize, but this question doesn't appear to be related to ESG topics. Please ask about Tetra Pak's environmental, social, or governance practices."
      };
    }
  });
};

// API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const result = await runWorkflow({ input_as_text: message });
    
    return res.json({ 
      response: result.output_text || result.output || 'No response generated'
    });
    
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
