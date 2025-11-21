require("dotenv").config({ path: "./backend/.env" });
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { cleanText, similarity } = require("./utils.js");

const app = express();

app.use(cors());
app.use(express.json());

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

app.post("/api/check-brand", async (req, res) => {
  const { prompt, brand } = req.body;

  if (!prompt || !brand) {
    return res.status(400).json({ error: "Prompt and brand are required" });
  }

  try {
    const aiRes = await axios.post(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `User prompt: ${prompt}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.2,
        },
      }
    );

    const text =
      aiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const cleanedResponse = cleanText(text);
    const cleanedBrand = cleanText(brand);

    let mentioned = false;
    let position = null;

    const words = cleanedResponse.split(/\s+/);

    for (let i = 0; i < words.length; i++) {
      if (words[i] === cleanedBrand || similarity(words[i], cleanedBrand) >= 0.7) {
        mentioned = true;
        position = i + 1;
        break;
      }
    }

    return res.status(200).json({
      mentioned,
      position
    });
  } catch (e) {
    console.error("Gemini error:", e.message);

    return res.status(500).json({
      mentioned: false,
      position: null,
      response: "AI unavailable – fallback used.",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Brand Checker API running.");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Backend running on port", PORT));
