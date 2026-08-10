import { useState, useId } from "react";
import { ShieldCheck, RefreshCw, FileText, BarChart3, AlertCircle, Sparkles } from "lucide-react";

export function EnvironmentalAudit() {
  const [scope, setScope] = useState("Corporate ESG baseline & Tailings pond chemistry compliance");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<string | null>(null);

  const [carbonOffset, setCarbonOffset] = useState("124.5 tCO2e/m");
  const [waterRecycleRate, setWaterRecycleRate] = useState("94.2%");
  const [tailingsRisk, setTailingsRisk] = useState("Extremely Low");

  const selectScopeId = useId();

  const handleGenerateAudit = async () => {
    setIsAuditing(true);
    setAuditResult(null);

    try {
      const response = await fetch("/api/gemini/compliance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auditScope: scope,
          telemetrySnap: {
            carbonOffset,
            waterRecycleRate,
            tailingsRisk,
            seismicSync: "certified_shango"
          }
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to synthesize document compliance audit.");
      }

      const data = await response.json();
      setAuditResult(data.markdown);
    } catch (e) {
      console.error("ESG Audit error:", e);
    } finally {
      setIsAuditing(false);
    }
  };

  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden flex flex-col items-stretch shadow-xl">
      <header className="px-6 py-4 bg-neutral-950 border-b border-neutral-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-amber-500" />
          <div>
            <h2 className="text-sm font-display font-bold tracking-wider text-neutral-100 uppercase">ESG Compliance & Circular Auditing</h2>
            <p className="text-[10px] text-neutral-500 font-mono">ENVIRONMENTAL, SOCIAL, AND RECTIFIED CORPORATE REPORTING</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 divide-y xl:divide-y-0 xl:divide-x divide-neutral-800">
        {/* Sizing inputs */}
        <div className="xl:col-span-4 p-6 bg-neutral-950/20 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-400 border-b border-neutral-800 pb-2 uppercase text-left">
              Audit Scoping
            </h3>

            <div>
              <label htmlFor={selectScopeId} className="block text-xs font-mono text-neutral-400 mb-2">
                REGULATORY AUDIT SCOPE
              </label>
              <select
                id={selectScopeId}
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs font-mono text-neutral-200 focus:outline-none focus:border-amber-500"
              >
                <option value="Tailings & Aquifer Chemistry Safety Quotas">Tailings & Hydrology Safety Code</option>
                <option value="Net Carbon Footprint & Energy Grid Balancing">Net Carbon Footprint offsets</option>
                <option value="Land Recovery, Bio-diversity, and Social Governance">Rehabilitation Governance</option>
                <option value="End-to-End International Mining Standards Attestation">Comprehensive Legal Attestation</option>
              </select>
            </div>

            <div className="space-y-3 pt-2">
              <span className="block text-[10px] font-mono text-neutral-500 uppercase">TELEMETRY LOCKS</span>
              
              <div className="p-3 bg-neutral-950 border border-neutral-900 rounded font-mono text-xs text-neutral-300 flex justify-between items-center">
                <span>CO2 Equivalent Output</span>
                <span className="text-amber-500 font-semibold">{carbonOffset}</span>
              </div>
              <div className="p-3 bg-neutral-950 border border-neutral-900 rounded font-mono text-xs text-neutral-300 flex justify-between items-center">
                <span>Hydrology Recycle Factor</span>
                <span className="text-amber-500 font-semibold">{waterRecycleRate}</span>
              </div>
              <div className="p-3 bg-neutral-950 border border-neutral-900 rounded font-mono text-xs text-neutral-300 flex justify-between items-center">
                <span>MAMI Tailings Warning Risk</span>
                <span className="text-amber-500 font-semibold">{tailingsRisk}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerateAudit}
            disabled={isAuditing}
            className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-800 text-neutral-950 disabled:text-neutral-500 font-display font-semibold rounded text-xs tracking-wider transition duration-150 uppercase flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {isAuditing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Auditing ESG metrics...</span>
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                <span>Compile Compliance Audit</span>
              </>
            )}
          </button>
        </div>

        {/* Audit feedback report side */}
        <div className="xl:col-span-8 p-6 space-y-5 bg-neutral-900">
          <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-300 border-b border-neutral-800 pb-2 uppercase flex items-center gap-1.5 justify-between">
            <span>Official Certification Log</span>
            <span className="text-neutral-500">FORMAT: CODE RECTIFIED REPORT</span>
          </h3>

          {isAuditing ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4 text-xs text-neutral-400">
              <RefreshCw className="h-6 w-6 text-amber-500 animate-spin" />
              <span>Analyzing historical sensory arrays, hydrological bounds and assembling formal certification...</span>
            </div>
          ) : auditResult ? (
            <div className="border border-neutral-800 bg-neutral-950/80 p-6 rounded-lg font-mono text-xs text-neutral-300 shadow-inner overflow-hidden relative">
              <div className="absolute top-0 right-10 h-[1px] bg-amber-500/50 w-32" />
              <div className="absolute top-4 right-4 text-[10px] text-emerald-400 border border-emerald-900/50 px-2 py-0.5 rounded bg-emerald-950/10 font-bold uppercase tracking-widest">
                VERIFIED BY HATHOR AI
              </div>

              {/* Nicely structured custom markdown renderer */}
              <div className="space-y-4 font-sans leading-relaxed text-[11px] prose-invert">
                {auditResult.split("\n").map((line, idx) => {
                  if (line.startsWith("##")) {
                    return (
                      <h4 key={idx} className="text-sm font-display font-bold text-amber-500 tracking-wider uppercase border-b border-neutral-900 pb-2 mt-4 first:mt-0">
                        {line.replace("##", "").trim()}
                      </h4>
                    );
                  }
                  if (line.startsWith("###")) {
                    return (
                      <h5 key={idx} className="text-xs font-bold text-neutral-200 mt-3 first:mt-0">
                        {line.replace("###", "").trim()}
                      </h5>
                    );
                  }
                  if (line.startsWith("-")) {
                    return (
                      <li key={idx} className="list-disc list-inside text-neutral-400 font-mono ml-2 mt-1">
                        {line.replace("-", "").trim().replace(/\*\*/g, "")}
                      </li>
                    );
                  }
                  return (
                    <p key={idx} className="text-neutral-300 font-mono text-xs leading-5">
                      {line.replace(/\*\*/g, "")}
                    </p>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-neutral-900 text-[10px] text-neutral-500 flex justify-between uppercase mt-6 font-mono">
                <span>SECURE REF: HT-AUD-2026-98B</span>
                <span>Audit Sync status: PASS</span>
              </div>
            </div>
          ) : (
            <div className="border border-neutral-800 border-dashed rounded-lg p-16 flex flex-col items-center justify-center text-center text-neutral-500 text-xs">
              <BarChart3 className="h-8 w-8 text-neutral-700 mb-3" />
              <p className="font-sans">No report compiled for this session yet.</p>
              <p className="text-[10px] font-mono mt-1 text-neutral-600">Select an environmental scope and compile to receive official AI compliance reports.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
