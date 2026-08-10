import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily to avoid startup crashes if key is initially absent
let aiClient: GoogleGenAI | null = null;

function getAIClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Falling back to mock responses.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Helper to check if we can run remote API
function hasApiKey() {
  return !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";
}

// 1. Geological scan API using structured JSON output
app.post("/api/gemini/geoscan", async (req, res) => {
  const { blockSelection, expectedGrade, seismicAnomalies } = req.body;

  if (!hasApiKey()) {
    // Return high-quality, authentic-looking mineral data locally if API key is not ready
    console.log("Using Mock Geo-Scan responses.");
    return res.json({
      layers: [
        {
          name: "Topsoil & Siltwood",
          depthRange: "0m - 40m",
          composition: "Loose sedimentary sand with clay pockets",
          estimateGrade: "0.01%",
          hazardRisk: "Low",
          mineralName: "None"
        },
        {
          name: "Vaal Basaltic Strata",
          depthRange: "40m - 180m",
          composition: "Highly dense igneous basalt, structural barrier",
          estimateGrade: "0.05%",
          hazardRisk: "Medium",
          mineralName: "Iron Ore"
        },
        {
          name: "Hathor Core Auriferous Vein",
          depthRange: "180m - 320m",
          composition: "Fractured quartzite enriched with native gold flakes",
          estimateGrade: expectedGrade || "14.2 g/t",
          hazardRisk: seismicAnomalies === "high" ? "High" : "Low",
          mineralName: "Gold deposit"
        },
        {
          name: "Sylvanite Granite Layer",
          depthRange: "320m - 500m",
          composition: "Crystalline granite containing tellurides",
          estimateGrade: "2.4 g/t",
          hazardRisk: "Medium",
          mineralName: "Platinum Group Metals"
        }
      ],
      geologicalSummary: `### Geological Assessment - Site Block ${blockSelection || "Alpha-Prime"}
      
A high-velocity seismic scanning reflection was recorded at **${depthSlider(blockSelection)}m**. 
The AI-guided stratigraphy maps indicate a highly promising auriferous fracturing pattern. 
- **Seismic Stability Check**: Anomaly level designated as *${seismicAnomalies || "nominal"}*.
- **Strategic Recommendation**: Target core drilling through the Vaal Basaltic Strata to establish access shafts directly to the Hathor Core Auriferous Vein.`
    });
  }

  try {
    const client = getAIClient();
    const prompt = `Perform an AI geological stratigraphy assessment on mine block selection "${blockSelection || "Block Alpha-1"}".
    Expected resource targets are estimated to be around ore grade "${expectedGrade || "8.5 g/t"}".
    Active seismic anomaly level: "${seismicAnomalies || "minimal"}".
    
    Synthesize high-fidelity stratigraphic geological response describing 4 distinct subterranean soil/rock layers at this site. Estimations should highlight potential gold, copper, platinum, or lithium reserves. Provide a comprehensive summary explaining the structural anomalies, hazard risks such as tectonic faults, and engineering recommendations.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are HATHOR Core Geological Intelligence, an AI specializing in seismic parsing, stratigraphy, and resource estimate modeling. Always return responses strictly tailored to the mining sector, using premium technical resource vocabulary.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["layers", "geologicalSummary"],
          properties: {
            layers: {
              type: Type.ARRAY,
              description: "Array of subterranean layers detected in this scan block.",
              items: {
                type: Type.OBJECT,
                required: ["name", "depthRange", "composition", "estimateGrade", "hazardRisk", "mineralName"],
                properties: {
                  name: { type: Type.STRING, description: "Technical geological term for the layer." },
                  depthRange: { type: Type.STRING, description: "Depth interval, e.g. '120m - 200m'" },
                  composition: { type: Type.STRING, description: "Rock/mineral materials detail." },
                  estimateGrade: { type: Type.STRING, description: "Calculated resource concentration or tonnage." },
                  hazardRisk: { type: Type.STRING, description: "Risk rating: Low, Medium, High, or Critical." },
                  mineralName: { type: Type.STRING, description: "Primary valuable mineral present, e.g., 'Gold', 'Copper', or 'None'." }
                }
              }
            },
            geologicalSummary: {
              type: Type.STRING,
              description: "Detailed Markdown summary of subterranean findings and target drill suggestions."
            }
          }
        }
      }
    });

    const bodyText = response.text || "{}";
    res.json(JSON.parse(bodyText.trim()));
  } catch (error: any) {
    console.error("Geological scan Gemini error:", error);
    res.status(500).json({ error: "Failed to generate geological assessment", details: error.message });
  }
});

function depthSlider(block: string) {
  if (block === "Beta-West") return "220m";
  if (block === "Gamma-Splay") return "140m";
  return "190m";
}

// 2. Resource Extraction Optimizer API
app.post("/api/gemini/optimize", async (req, res) => {
  const { targetGrade, energyCap, haulerCount, tailingsRate, currentHazards } = req.body;

  if (!hasApiKey()) {
    console.log("Using Mock Extraction Optimization responses.");
    return res.json({
      schedule: [
        {
          phase: "Phase 1: Grade Blending Preparation",
          details: "Route haulers to stack stockpiles under adaptive blending ratios. Leverage real-time grade readings to maintain targeted concentration.",
          duration: "48 Hours",
          dangerLevel: "Low"
        },
        {
          phase: "Phase 2: Deep Strata Excavation",
          details: "Engage primary automated drills with custom vibration dampening. Constant monitoring of gas detectors for potential ground disturbances.",
          duration: "120 Hours",
          dangerLevel: currentHazards === "high" ? "High" : "Medium"
        },
        {
          phase: "Phase 3: Mill Scheduling & Tailings Routing",
          details: "Initiate slurry pumping directly to tailings recyclers. Recalculate freshwater ingestion rates dynamically based on moisture sensors.",
          duration: "72 Hours",
          dangerLevel: "Low"
        }
      ],
      esgImpact: {
        score: currentHazards === "high" ? 78 : 94,
        carbonSavings: "18.5 Metric Tonnes CO2 equivalent",
        waterRecycle: "92.4% reclaimed water reuse rate"
      },
      recommendations: [
        `Optimal hauler allocation is verified at ${haulerCount || 8} haulers to match Mill feed capacity.`,
        `With an energy budget cap of ${energyCap || 85}%, utilize peak-shaving protocols during main milling phases.`,
        "Slightly reduce hoisting speed in shafts below 250m to conserve hydro-electric power draw.",
        "Mami Water has certified tailings level. Normal operation recommended."
      ]
    });
  }

  try {
    const client = getAIClient();
    const prompt = `Initiate production optimization algorithm for extraction operations.
    Inputs:
    - Target Ore Grade Concentration: "${targetGrade || "12.5 g/t"}"
    - Energy Usage Budget Constraint: "${energyCap || "80"}%"
    - Autonomous Haulers Allocated: "${haulerCount || "10"} heavy transport wheels"
    - Safety/Tailings Ingestion Intake: "${tailingsRate || "4"}/5 flow rate"
    - Site Hazard Index: "${currentHazards || "Normal"}"
    
    Synthesize an expert extraction scheduling sequence, carbon conservation analysis, and strategic recommendations to optimize resource yields safely while lowering the ecological footprint. Ensure the output complies with standard ESG regulations and mining operations engineering criteria.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the HATHOR Core Mining Operations and ESG Optimizer Engine. Your task is to schedule mining phases and calculate ecological conservation gains. Keep responses structured and metrics highly technical.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["schedule", "esgImpact", "recommendations"],
          properties: {
            schedule: {
              type: Type.ARRAY,
              description: "Optimized operational step-by-step extraction plan.",
              items: {
                type: Type.OBJECT,
                required: ["phase", "details", "duration", "dangerLevel"],
                properties: {
                  phase: { type: Type.STRING },
                  details: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  dangerLevel: { type: Type.STRING }
                }
              }
            },
            esgImpact: {
              type: Type.OBJECT,
              required: ["score", "carbonSavings", "waterRecycle"],
              properties: {
                score: { type: Type.INTEGER, description: "Calculated ESG score out of 100." },
                carbonSavings: { type: Type.STRING, description: "Calculated reduction in emissions." },
                waterRecycle: { type: Type.STRING, description: "Recycled water consumption metrics." }
              }
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const bodyText = response.text || "{}";
    res.json(JSON.parse(bodyText.trim()));
  } catch (error: any) {
    console.error("Optimization Gemini error:", error);
    res.status(500).json({ error: "Failed to optimize extraction plan", details: error.message });
  }
});

// 3. Document/Audit Generation API
app.post("/api/gemini/compliance", async (req, res) => {
  const { auditScope, telemetrySnap } = req.body;

  if (!hasApiKey()) {
    console.log("Using Mock ESG Report responses.");
    return res.json({
      markdown: `## HATHOR ENVIRONMENTAL & SAFETY AUDIT REPORT
**Timestamp**: 2026-05-22  
**Scope**: ${auditScope || "Operational Baseline & Tailings Stability"}  
**Auditor**: HATHOR AI Compliance Agent

### 1. Tailings & Hydrological Integrity
The tailings monitoring network confirms **MAMI_WATER** sync status. Tailings level indexes are at **74.1%**, well below critical regulatory safety heights. Ground water pH reads at **7.12 (Aqueous neutral)** with zero run-off alarms.

### 2. Carbon Intensity & Peak Shaving
Integration with the **SHANGO** Climate forecast allows adaptive scheduling:
- Net carbon output registered: **124.8 kg CO₂ per extracted tonne of ore**.
- Active carbon savings: **-12.8%** against baseline mining quotas due to heavy integration of autonomous electric transport fleets.

### 3. Safety Clearance & Active Ingress
Zero critical tremors detected. Shaft pressure sensors remain in safe zones (<260 psi). Gaz sensors maintain methane concentration under **0.04%**, within the green zone limits.

### 4. Regulatory Attestation
*The extraction site located under Block Alpha complies with international mining codes, sustainable resource extraction, and ESG governance benchmarks. Continual telemetry audits validated.*`
    });
  }

  try {
    const client = getAIClient();
    const prompt = `Generate a rigorous, formal ESG / Safety audit compliance report for HATHOR Mineral Platform operations.
    Scope: ${auditScope || "All Site Compliance"}
    Historical Sensor Snapshots: "${JSON.stringify(telemetrySnap || {})}"
    
    Structure the report with section headers, detailed safety assessments, climate impact figures, and a final regulatory certification. Keep the style highly authoritative, clean, and professional.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are the HATHOR ESG auditor. Produce compliance and safety analysis reports. Write beautiful, comprehensive, technical and authoritative Markdown reports directly suitable for regulatory scrutiny.",
      }
    });

    res.json({ markdown: response.text });
  } catch (error: any) {
    console.error("Compliance report Gemini error:", error);
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
