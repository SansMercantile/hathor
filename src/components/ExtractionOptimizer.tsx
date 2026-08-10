import { useState, useId } from "react";
import { Cpu, Zap, Truck, Sparkles, Database, ShieldAlert, CheckCircle2, RefreshCw } from "lucide-react";
import { OptimizationResult } from "../types";

export function ExtractionOptimizer() {
  const [targetGrade, setTargetGrade] = useState("14.5 g/t");
  const [energyCap, setEnergyCap] = useState(85);
  const [haulerCount, setHaulerCount] = useState(12);
  const [tailingsRate, setTailingsRate] = useState(4);
  const [currentHazards, setCurrentHazards] = useState("nominal");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedData, setOptimizedData] = useState<OptimizationResult | null>(null);

  const targetGradeId = useId();
  const energyCapId = useId();
  const haulerCountId = useId();
  const tailingsRateId = useId();
  const currentHazardsId = useId();

  // Run first optimization automatically
  useState(() => {
    handleOptimizeSequence();
  });

  async function handleOptimizeSequence() {
    setIsOptimizing(true);
    setOptimizedData(null);

    try {
      const response = await fetch("/api/gemini/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetGrade,
          energyCap,
          haulerCount,
          tailingsRate,
          currentHazards,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to synthesize optimization matrix on backend");
      }

      const data = await response.json();
      setOptimizedData(data);
    } catch (error) {
      console.error("Optimization operation error:", error);
    } finally {
      setIsOptimizing(false);
    }
  }

  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden flex flex-col items-stretch shadow-xl">
      {/* Title Header */}
      <header className="px-6 py-4 bg-neutral-950 border-b border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Cpu className="h-5 w-5 text-amber-500 animate-pulse" />
            <h2 className="text-sm font-display font-bold tracking-wider text-neutral-100 uppercase">AI-Guided Extraction Optimizer</h2>
          </div>
          <p className="text-[10px] text-neutral-500 font-mono mt-0.5">ADAPTIVE COMBINATORIAL SCHEDULING & RAW GRADE REGULATORY COMPLIANCE</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-neutral-900 px-3 py-1.5 border border-neutral-800 rounded font-mono text-[10px] text-neutral-400">
            COMPUTATIONAL MODEL: <span className="text-amber-500 font-bold">GEMINI-3.5-FLASH</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 divide-y xl:divide-y-0 xl:divide-x divide-neutral-800">
        {/* Sliders and Controls side */}
        <div className="xl:col-span-4 p-6 bg-neutral-950/20 space-y-6">
          <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-400 border-b border-neutral-800 pb-2 uppercase">
            Optimization Constraints
          </h3>

          <div className="space-y-4">
            {/* Target Ore grade */}
            <div>
              <label htmlFor={targetGradeId} className="flex justify-between items-center text-xs font-mono text-neutral-400 mb-2">
                <span>TARGET BLENDING CAPACITY</span>
                <span className="text-amber-500 font-bold">{targetGrade}</span>
              </label>
              <select
                id={targetGradeId}
                value={targetGrade}
                onChange={(e) => setTargetGrade(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs font-mono text-neutral-200 focus:outline-none focus:border-amber-500"
              >
                <option value="6.5 g/t">Low Grade Complex (6.5 g/t)</option>
                <option value="11.2 g/t">Medium Blending Target (11.2 g/t)</option>
                <option value="14.5 g/t">High-Yield Core Vein (14.5 g/t)</option>
                <option value="18.8 g/t">Extreme Yield Suture (18.8 g/t)</option>
              </select>
            </div>

            {/* Energy Limit slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-neutral-400 mb-2">
                <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-amber-500" /> ENERGY CAP CONSTRAINT</span>
                <span className="text-amber-500 font-bold">{energyCap}%</span>
              </div>
              <input
                id={energyCapId}
                type="range"
                min="50"
                max="100"
                value={energyCap}
                onChange={(e) => setEnergyCap(Number(e.target.value))}
                className="w-full accent-amber-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
              />
              <span className="block text-[9px] text-neutral-500 font-mono text-right mt-1">Lower cap forces eco peak-shaving</span>
            </div>

            {/* Hauler inventory slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-neutral-400 mb-2">
                <span className="flex items-center gap-1"><Truck className="h-3 w-3 text-amber-500" /> AUTONOMOUS HAULERS SITE-ALLOCATION</span>
                <span className="text-amber-500 font-bold">{haulerCount} units</span>
              </div>
              <input
                id={haulerCountId}
                type="range"
                min="4"
                max="24"
                value={haulerCount}
                onChange={(e) => setHaulerCount(Number(e.target.value))}
                className="w-full accent-amber-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
              />
              <span className="block text-[9px] text-neutral-500 font-mono text-right mt-1">More haulers improves throughput limits</span>
            </div>

            {/* Tailings pond flow scale */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono text-neutral-400 mb-2">
                <span>TAILINGS SLURRY INGESTION RATE</span>
                <span className="text-amber-500 font-bold">{tailingsRate}/5 levels</span>
              </div>
              <input
                id={tailingsRateId}
                type="range"
                min="1"
                max="5"
                value={tailingsRate}
                onChange={(e) => setTailingsRate(Number(e.target.value))}
                className="w-full accent-amber-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Hazards environment modifier */}
            <div>
              <label htmlFor={currentHazardsId} className="block text-xs font-mono text-neutral-400 mb-2">
                SITE DISPLACEMENT HAZARDS
              </label>
              <select
                id={currentHazardsId}
                value={currentHazards}
                onChange={(e) => setCurrentHazards(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs font-mono text-neutral-200 focus:outline-none focus:border-amber-500"
              >
                <option value="nominal">Nominal Stable Operation</option>
                <option value="warning">Low Seismic Vibrations Recorded</option>
                <option value="high">Ground Shifts Suspected under Drills</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800">
            <button
              onClick={handleOptimizeSequence}
              disabled={isOptimizing}
              className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-800 text-neutral-950 disabled:text-neutral-500 font-display font-semibold rounded text-xs tracking-wider transition duration-150 uppercase flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isOptimizing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Calculating Schedule...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  <span>Optimize Mine Sequence</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results display side */}
        <div className="xl:col-span-8 p-6 space-y-6 bg-neutral-900/40">
          <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-300 border-b border-neutral-800 pb-2 uppercase flex items-center justify-between">
            <span>Optimized Operational Matrix</span>
            <span className="text-neutral-500">LIVE COGNITIVE SYNTHESIS</span>
          </h3>

          {isOptimizing ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4 text-xs text-neutral-400">
              <RefreshCw className="h-6 w-6 text-amber-500 animate-spin" />
              <span>Invoking Gemini Operations Engine & ESG metrics calculators...</span>
            </div>
          ) : optimizedData ? (
            <div className="space-y-6">
              {/* Top Highlights ESG Scorecards / Bento grid style */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Score */}
                <div className="bg-neutral-950 border border-neutral-800 p-4 rounded flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-neutral-500">ESG INTEGRITY GAIN</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-display font-bold text-emerald-400">
                      {optimizedData.esgImpact.score}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">/100</span>
                  </div>
                  <span className="text-[9px] text-neutral-500 font-mono mt-2 block">
                    Calculated against green mining indices
                  </span>
                </div>

                {/* Carbon Saved */}
                <div className="bg-neutral-950 border border-neutral-800 p-4 rounded flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-neutral-500">EST. CARBON SAVINGS</span>
                  <div className="text-base font-display font-bold text-neutral-200 mt-2 truncate">
                    {optimizedData.esgImpact.carbonSavings.split("Metric")[0] || optimizedData.esgImpact.carbonSavings}
                  </div>
                  <span className="text-[9px] text-neutral-400 font-mono block mt-1">
                    Saved Tonnes CO₂e
                  </span>
                  <span className="text-[9px] text-emerald-500 font-mono mt-1 block">
                    Active peak-shaving benefit
                  </span>
                </div>

                {/* Water Recycling */}
                <div className="bg-neutral-950 border border-neutral-800 p-4 rounded flex flex-col justify-between">
                  <span className="text-[10px] font-mono text-neutral-500">HYDROLOGICAL RECYCLING</span>
                  <div className="text-xl font-display font-bold text-blue-400 mt-2">
                    {optimizedData.esgImpact.waterRecycle}
                  </div>
                  <span className="text-[9px] text-neutral-500 font-mono mt-2 block">
                    Certified sync from MAMI_WATER
                  </span>
                </div>
              </div>

              {/* Step Sequence Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase flex items-center gap-1.5 mb-3">
                  <Database className="h-3.5 w-3.5 text-amber-500" />
                  Scheduled Phase Timeline Sequence
                </h4>

                <div className="space-y-4">
                  {optimizedData.schedule.map((step, index) => (
                    <div
                      key={index}
                      className="bg-neutral-950/40 hover:bg-neutral-950/80 border border-neutral-800 hover:border-amber-500/20 p-4 rounded transition flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-neutral-400 font-bold">
                            STEP 0{index + 1}
                          </span>
                          <span className="font-display font-bold text-sm text-neutral-200">{step.phase}</span>
                        </div>
                        <p className="text-xs text-neutral-400 leading-relaxed max-w-xl pr-4">
                          {step.details}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
                        <div className="text-right">
                          <span className="block text-[9px] text-neutral-500 uppercase">Duration</span>
                          <span className="text-neutral-300 font-bold">{step.duration}</span>
                        </div>

                        <div>
                          <span className="block text-[9px] text-neutral-500 uppercase text-center mb-0.5">Danger</span>
                          <span className={`px-2 py-0.5 text-[9px] rounded font-bold uppercase ${
                            step.dangerLevel === "Low" ? "bg-emerald-950/30 text-emerald-400 border border-emerald-900/30" :
                            step.dangerLevel === "Medium" ? "bg-amber-950/30 text-amber-500 border border-amber-900/30" :
                            "bg-red-950/30 text-red-400 border border-red-900/30"
                          }`}>
                            {step.dangerLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic AI Insights / Recommendations */}
              <div className="border border-neutral-800 bg-neutral-950/50 p-5 rounded-lg space-y-3">
                <h4 className="text-xs font-mono font-bold text-neutral-300 flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
                  HATHOR Predictive Engineering Mandates
                </h4>
                <ul className="space-y-2.5 text-xs text-neutral-300">
                  {optimizedData.recommendations.map((rec, index) => (
                    <li key={index} className="flex gap-2.5 items-start">
                      <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="py-24 text-center text-xs text-neutral-600">
              Configure parameters and execute optimization to retrieve sequence timeline graphs.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
