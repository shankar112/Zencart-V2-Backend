// controllers/aiController.js
const { GoogleGenAI } = require("@google/genai");

const generateDescription = async (req, res) => {
  const { productName } = req.body;

  if (!productName) {
    return res.status(400).json({ message: "Product name is required" });
  }

  try {
    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "Gemini API key is not configured" });
    }

    // Initialize the Client - Gets API key from GEMINI_API_KEY environment variable automatically
    const ai = new GoogleGenAI({});

    const prompt = `Write a professional, catchy, and SEO-friendly product description for an e-commerce item named: "${productName}". Keep it under 3 sentences. Focus on benefits and appeal to the target customer.`;

    // Generate Content using the correct method
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    // Extract the text from the response
    const text = response.text();

    res.status(200).json({ description: text });
  } catch (err) {
    console.error("AI Error Details:", err);
    // Send detailed error information for debugging
    res.status(500).json({ 
      message: "Failed to generate description", 
      error: err.message,
      details: err.toString()
    });
  }
};

module.exports = { generateDescription };