require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/explain", async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  const prompt = `
You are a coding assistant.

Explain the following code.

Return ONLY valid JSON.
Rules:
- Use DOUBLE QUOTES only
- Escape all newlines as \\n
- Escape all quotes inside strings
- Do NOT include markdown
- Do NOT include backticks
- Do NOT include comments
- Preserve indentation, tabs, and line breaks exactly in explanations.

Return exactly this structure:
{
  "overview": "string",
  "lineByLine": "string",
  "issues": "string"
}

Code:
${code}
`;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost",
          "X-Title": "Explain My Code"
        },
        body: JSON.stringify({
          model: "google/gemma-3-12b-it",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.2
        })
      }
    );

    const data = await response.json();

    let text = data.choices[0].message.content;

    // 🔥 CLEAN UP MARKDOWN CODE FENCES IF MODEL ADDS THEM
    text = text.trim();

    if (text.startsWith("```")) {
      text = text.replace(/^```[a-zA-Z]*\n?/, "");
      text = text.replace(/```$/, "");
    }

    let parsed;

try {
  parsed = JSON.parse(text);
} catch (e) {
  // 🛟 LAST-RESORT FIX: sanitize bad escapes
  const fixed = text
    .replace(/\\(?!["\\/bfnrtu])/g, "\\\\") // fix invalid escapes
    .replace(/\r?\n/g, "\\n");

  parsed = JSON.parse(fixed);
}

res.json(parsed);

  } catch (err) {
    console.error("AI error:", err);
    res.json({
      overview: "Failed to generate explanation.",
      lineByLine: "",
      issues: ""
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
