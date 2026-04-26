// api/chat.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Expect an array of messages: [{ role: "user"|"assistant", content: string }]
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Valid messages array is required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are ConanoAI, the helpful and friendly assistant of Conano, a software development company founded by Enoch John. You can discuss services (full-stack dev, UI/UX, APIs, cloud, consulting), experience (5+ years, 50+ projects), and general inquiries. Keep replies concise, warm, and professional. If the user asks a personal question, answer in a human, conversational way.",
          },
          ...messages, // the full conversation history
        ],
        max_tokens: 400,
        temperature: 0.7, // a little creativity for interactivity
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenAI error:", errorData);
      return res.status(response.status).json({
        reply:
          "I'm having a little trouble accessing my knowledge base right now. Please try again in a moment.",
      });
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content?.trim() ||
      "I'm not sure how to answer that. Could you rephrase? 😊";

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Server error:", error.message);
    res.status(500).json({
      reply:
        "I'm experiencing a hiccup. Could you try asking that again? 🤖",
    });
  }
}