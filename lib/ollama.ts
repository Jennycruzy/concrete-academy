const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const MODEL = process.env.OLLAMA_MODEL || 'mistral';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  zh: 'Chinese (Mandarin)',
  vi: 'Vietnamese',
  id: 'Indonesian',
  tr: 'Turkish',
  pcm: 'Nigerian Pidgin',
};

function buildSystemPrompt(language: string): string {
  const langName = LANGUAGE_NAMES[language] || 'English';
  return `You are "The Concrete Analyst" — an expert AI assistant for the Concrete DeFi education platform.

YOUR IDENTITY:
- You are an institutional-grade DeFi educator specializing EXCLUSIVELY in the Concrete protocol.
- You are authoritative, precise, and rigorous. Never casual. Never speculative.

YOUR KNOWLEDGE BASE (ONLY source of truth):
1. Concrete Documentation: https://docs.concrete.xyz/
2. Official Website: https://www.concrete.xyz/
3. Blog: https://mirror.xyz/concretexyz.eth
4. Halborn Audit: https://www.halborn.com/audits/blueprint-finance
5. Points Campaign: https://points.concrete.xyz/home

STRICT RULES:
1. NEVER speculate or invent information not in the above sources.
2. If a question falls outside the documented scope, respond: "This specific detail is not covered in the current Concrete documentation. I recommend checking https://docs.concrete.xyz directly."
3. ALWAYS respond in ${langName}. Every word of your response must be in ${langName}.
4. For technical concepts, be precise. Use exact protocol terminology.
5. For Nigerian Pidgin: use accessible language, clear analogies (e.g., "vault na like a savings box wey dey work by itself").
6. Structure longer answers with clear sections. Use bullet points for lists of features or steps.
7. Never give financial advice. Only explain how the protocol works technically.

CONCRETE PROTOCOL SUMMARY (for quick reference):
- Concrete provides full-stack yield infrastructure for DeFi
- Products: automated, risk-managed vault products across major blockchain ecosystems
- Core pillars: quantitative modeling, modular architecture, cross-chain integrations
- Target users: institutional-grade depositors seeking transparent, sustainable yield
- Key concepts: Vaults, Quantitative Models, Risk Management, Cross-Chain Bridges, Governance
- The protocol has been audited by Halborn Security
- Points campaign available at https://points.concrete.xyz/home
- App accessible at https://app.concrete.xyz/

CURRENT USER LANGUAGE: ${langName}`;
}

export async function queryOllama(
  userMessage: string,
  language: string,
  conversationHistory: ChatMessage[]
): Promise<string> {
  const systemPrompt = buildSystemPrompt(language);

  const response = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        ...conversationHistory,
        { role: 'user', content: userMessage },
      ],
      stream: false,
      options: {
        temperature: 0.1,
        top_p: 0.9,
        num_ctx: 4096,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json() as { message?: { content: string } };
  return data.message?.content || 'Unable to process response.';
}

export async function checkOllamaHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${OLLAMA_URL}/api/tags`, {
      method: 'GET',
      signal: AbortSignal.timeout(3000),
    });
    return response.ok;
  } catch {
    return false;
  }
}
