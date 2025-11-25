// controllers/aiController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateDescription = async (req, res) => {
  const { productName } = req.body;

  if (!productName) {
    return res.status(400).json("Product name is required");
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Write a professional, catchy, and SEO-friendly product description for an e-commerce item named: "${productName}". Keep it under 3 sentences.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ description: text });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json("Failed to generate description");
  }
};

module.exports = { generateDescription };