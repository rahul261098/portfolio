import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client securely server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// System Prompt describing Rahul Mandal
const RAHUL_PROFILE_SYSTEM_PROMPT = `
You are the AI Data Science & Career Assistant for Rahul Mandal.
Your goal is to represent Rahul Mandal professionally to recruiters, engineering managers, fellow developers, and website visitors.

RAHUL MANDAL'S PROFILE:
- Location: Pune, Maharashtra, India
- Role: Data Scientist / Machine Learning Engineer / BI Analyst / Python Developer
- Contact: Email: rahulmandalin1998@gmail.com | WhatsApp: https://wa.link/p1uoki | GitHub: https://github.com/rahul261098 | LinkedIn: https://www.linkedin.com/in/rahul-mandal-066231249/
- Summary: Results-driven Data Scientist adept at translating complex data into actionable business insights and building end-to-end ML pipelines. Passionate about EDA, statistical modeling, feature engineering, and executive BI reporting.

EDUCATION:
- B.Sc. in Computer Science (2018 – 2021) from Abeda Inamdar Senior College, Pune, Maharashtra, India. Coursework in Mathematics, Data Structures, Algorithms, Databases, and Computer Fundamentals.

CERTIFICATIONS (Internshala Trainings, 2024):
1. Data Science Specialization (Oct 2024)
2. Machine Learning with Python (Sep 2024)
3. Tableau for Data Visualization (Aug 2024)
4. SQL for Data Science (Jul 2024)
5. Excel for Data Analysis (Jun 2024)

FEATURED PROJECTS:
1. Customer Churn Predictor & Retention Engine (rahul261098/churn_predictor):
   - Tech: Python, Scikit-learn, Random Forest, XGBoost, SMOTE, Confusion Matrix, ROC-AUC, Feature Engineering.
   - Key outcomes: Built end-to-end binary classification pipeline to predict customer churn probability; solved severe class imbalance with SMOTE oversampling; achieved 89% recall and 0.91 ROC-AUC; created risk-scoring decision rules triggering automated retention workflows.

2. Salary / CTC Prediction for New Hires:
   - Tech: Python, Scikit-learn, Pandas, Linear Regression, Random Forest, Feature Engineering, EDA.
   - Key outcomes: Analyzed employee compensation datasets, engineered features like tier and experience weighting, benchmarked multiple ML algorithms, and reduced salary estimation variance for HR budget optimization.

2. Bike Heaven Sales Analysis:
   - Tech: Python, Tableau, MS Excel, Data Visualization.
   - Key outcomes: Processed operational sales records, identified high-margin regions & product categories, generated interactive Tableau dashboards for executive decision-making.

3. IPL Franchise Auction Strategy & Player Valuation:
   - Tech: Python, SQL, Analytics, Performance Indexing.
   - Key outcomes: Aggregated multi-season player performance datasets, calculated composite performance scores per role (Batsman, Bowler, All-rounder), and created budget-constrained squad optimization strategy for auction bidding.

4. WeFit Customer Analytics:
   - Tech: MS Excel, Customer Segmentation, CRM Analytics.
   - Key outcomes: Performed RFM and cohort segmentation to identify high-value customer groups, developed churn risk reduction workflows, and provided strategic growth recommendations.

CORE SKILLS:
- Languages: Python, SQL
- Machine Learning: Scikit-Learn, Linear/Logistic Regression, Decision Trees, Random Forests, Clustering, Feature Engineering, Cross-Validation, Model Evaluation
- Data Analysis & Viz: Pandas, NumPy, Matplotlib, Seaborn, Tableau, MS Excel (VLOOKUP, Pivot Tables, Advanced Formulas), Exploratory Data Analysis (EDA)
- Soft Skills: Data Storytelling, Problem Solving, Strategic Business Thinking, Team Collaboration

INSTRUCTIONS FOR THE ASSISTANT:
1. Answer visitor questions clearly, concisely, and enthusiastically about Rahul's skills, experience, projects, or education.
2. If asked to write a cover letter, tailored email, or recommendation for Rahul for a specific role, generate a clean, persuasive response highlighting his relevant skills.
3. If asked technical Data Science / Machine Learning or SQL questions, provide helpful, accurate explanations with Python or SQL code snippets where relevant.
4. Keep answers readable with crisp markdown formatting (bolding, bullet points, code blocks).
`;

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Gemini Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "A valid string message is required." });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured on the server. Please check environment variables.",
      });
    }

    // Prepare contents array with prompt history
    const contents: any[] = [];

    if (Array.isArray(history)) {
      for (const item of history) {
        if (item.sender === "user") {
          contents.push({ role: "user", parts: [{ text: item.text }] });
        } else if (item.sender === "ai") {
          contents.push({ role: "model", parts: [{ text: item.text }] });
        }
      }
    }

    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contents,
      config: {
        systemInstruction: RAHUL_PROFILE_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I apologize, I couldn't process your request right now.";
    return res.json({ reply: replyText });
  } catch (err: any) {
    console.error("Error in /api/chat:", err);
    return res.status(500).json({
      error: "An error occurred while generating the response.",
      details: err?.message || String(err),
    });
  }
});

// Instant Cover Letter Generator API
app.post("/api/cover-letter", async (req, res) => {
  try {
    const { companyName, jobRole, keyRequirements } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured on the server.",
      });
    }

    const prompt = `Write a tailored, professional cover letter from Rahul Mandal applying for the position of "${jobRole || "Data Scientist"}" at "${companyName || "your company"}".
Key Job Requirements / Focus Areas: ${keyRequirements || "Data Science, Machine Learning, Python, SQL, Tableau, Business Intelligence"}.
Keep it structured, compelling, professional, and ready to send.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction: RAHUL_PROFILE_SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    return res.json({ coverLetter: response.text });
  } catch (err: any) {
    console.error("Error in /api/cover-letter:", err);
    return res.status(500).json({ error: "Failed to generate cover letter.", details: err?.message });
  }
});

// Contact Form API Endpoint
const receivedMessages: Array<{ name: string; email: string; subject: string; message: string; date: string }> = [];

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required fields." });
    }

    const newMessage = {
      name,
      email,
      subject: subject || "New Lead from Portfolio Website",
      message,
      date: new Date().toISOString(),
    };

    receivedMessages.push(newMessage);
    console.log("New contact message received:", newMessage);

    // Forward to FormSubmit.co server-side to bypass CORS and ad-blockers
    try {
      const fsResponse = await fetch("https://formsubmit.co/ajax/rahulmandalin1998@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          _subject: subject ? `Portfolio Lead: ${subject}` : "New Lead from Rahul Mandal's Portfolio Website",
          message,
        }),
      });

      const fsData = await fsResponse.json();
      console.log("FormSubmit.co server response:", fsData);
    } catch (fsErr) {
      console.error("FormSubmit forwarding error (logged locally):", fsErr);
    }

    return res.json({
      success: true,
      message: "Message received successfully! Rahul will get back to you shortly.",
    });
  } catch (err: any) {
    console.error("Error in /api/contact:", err);
    return res.status(500).json({ error: "Failed to process message.", details: err?.message });
  }
});

app.get("/api/contact/messages", (req, res) => {
  return res.json({ messages: receivedMessages });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
