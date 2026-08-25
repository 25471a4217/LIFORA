import { env } from '../config/env.js';

export async function sendAIMessage(userId: string, messages: { role: string; content: string }[]) {
  const response = await fetch(env.OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({ model: 'gpt-4o-mini', messages }),
  });
  const payload = await response.json();
  return payload;
}

export function generateFallbackRecommendation() {
  return {
    recommendations: [
      { type: 'TASK', title: 'Practice DSA', duration: 30, priority: 'HIGH', reason: 'Skill gap detected' },
      { type: 'TASK', title: 'Review Python notes', duration: 25, priority: 'NEXT', reason: 'Concept reinforcement' },
    ],
  };
}
