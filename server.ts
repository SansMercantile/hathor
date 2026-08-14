import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { generateText, generateJSON } from "./bedrockClient";

const app = express();
const PORT = 3000;

app.use(express.json());

// 1. Geological scan API using structured JSON output
app.post("/api/ai/geoscan", async (req, res) => {
  const { blockSelection, expectedGrade, seismicAnomalies } = req.body;

  try {
    const prompt = `Perform an AI geological stratigraphy assessment on mine block selection "${blockSelection || "Block Alpha-1"}".
    Expected resource targets are estimated to be around ore grade "${expectedGrade || "8.5 g/t"}".
    Active seismic anomaly level: "${seismicAnomalies || "minimal"}".
    
    Synthesize high-fidelity stratigraphic geological response describing 4 distinct subterranean soil/rock layers at this site. Estimations should highlight potential gold, copper, platinum, or lithium reserves. Provide a comprehensive summary explaining the structural anomalies, hazard risks such as tectonic faults, and engineering recommendations.`;

    const shape = `{
  "layers": [
    {
      "name": string,           // Technical geological term for the layer
      "depthRange": string,     // e.g. "120m - 200m"
      "composition": string,    // Rock/mineral materials detail
      "estimateGrade": string,  // Calculated resource concentration or tonnage
      "hazardRisk": "Low" | "Medium" | "High" | "Critical",
      "mineralName": string     // Primary valuable mineral present, or "None"
    }
  ],
  "geologicalSummary": string   // Detailed Markdown summary of findings and target drill suggestions
}`;

    const { data } = await generateJSON(prompt, shape, {
      temperature: 0.6,
      maxTokens: 1536,
      systemPrompt:
        "You are HATHOR Core Geological Intelligence, an AI specializing in seismic parsing, stratigraphy, and resource estimate modeling. Always return responses strictly tailored to the mining sector, using premium technical resource vocabulary.",
    });
    res.json(data);
  } catch (error: any) {
    console.error("Geological scan Bedrock error:", error);
    res.status(500).json({ error: "Failed to generate geological assessment", details: error.message });
  }
});

// 2. Resource Extraction Optimizer API
app.post("/api/ai/optimize", async (req, res) => {
  const { targetGrade, energyCap, haulerCount, tailingsRate, currentHazards } = req.body;

  try {
    const prompt = `Initiate production optimization algorithm for extraction operations.
    Inputs:
    - Target Ore Grade Concentration: "${targetGrade || "12.5 g/t"}"
    - Energy Usage Budget Constraint: "${energyCap || "80"}%"
    - Autonomous Haulers Allocated: "${haulerCount || "10"} heavy transport wheels"
    - Safety/Tailings Ingestion Intake: "${tailingsRate || "4"}/5 flow rate"
    - Site Hazard Index: "${currentHazards || "Normal"}"
    
    Synthesize an expert extraction scheduling sequence, carbon conservation analysis, and strategic recommendations to optimize resource yields safely while lowering the ecological footprint. Ensure the output complies with standard ESG regulations and mining operations engineering criteria.`;

    const shape = `{
  "schedule": [
    {
      "phase": string,
      "details": string,
      "duration": string,
      "dangerLevel": "Low" | "Medium" | "High" | "Critical"
    }
  ],
  "esgImpact": {
    "score": number,          // ESG score out of 100 (integer)
    "carbonSavings": string,  // Calculated reduction in emissions
    "waterRecycle": string    // Recycled water consumption metrics
  },
  "recommendations": string[]
}`;

    const { data } = await generateJSON(prompt, shape, {
      temperature: 0.6,
      maxTokens: 1536,
      systemPrompt:
        "You are the HATHOR Core Mining Operations and ESG Optimizer Engine. Your task is to schedule mining phases and calculate ecological conservation gains. Keep responses structured and metrics highly technical.",
    });
    res.json(data);
  } catch (error: any) {
    console.error("Optimization Bedrock error:", error);
    res.status(500).json({ error: "Failed to optimize extraction plan", details: error.message });
  }
});

// 3. Document/Audit Generation API
app.post("/api/ai/compliance", async (req, res) => {
  const { auditScope, telemetrySnap } = req.body;

  try {
    const prompt = `Generate a rigorous, formal ESG / Safety audit compliance report for HATHOR Mineral Platform operations.
    Scope: ${auditScope || "All Site Compliance"}
    Historical Sensor Snapshots: "${JSON.stringify(telemetrySnap || {})}"
    
    Structure the report with section headers, detailed safety assessments, climate impact figures, and a final regulatory certification. Keep the style highly authoritative, clean, and professional.`;

    const { text } = await generateText(prompt, {
      temperature: 0.5,
      maxTokens: 1536,
      systemPrompt:
        "You are the HATHOR ESG auditor. Produce compliance and safety analysis reports. Write beautiful, comprehensive, technical and authoritative Markdown reports directly suitable for regulatory scrutiny.",
    });

    res.json({ markdown: text });
  } catch (error: any) {
    console.error("Compliance report Bedrock error:", error);
    res.status(500).json({ error: "Failed to generate compliance report", details: error.message });
  }
});

// Vite / production server configuration setup
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
    console.log(`HATHOR Platform Server running on http://localhost:${PORT}`);
  });
}

startServer();
