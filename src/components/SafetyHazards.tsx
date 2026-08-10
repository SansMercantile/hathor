import { useState, useEffect } from "react";
import { AlertOctagon, RefreshCw, Radio, BellOff, ArrowRight, ShieldAlert, Zap } from "lucide-react";

interface TelemetryGauge {
  name: string;
  value: number;
  unit: string;
  limit: number;
  status: "normal" | "warning" | "critical";
}

interface SafetyHazardsProps {
  onEventBusPublish: (systemName: string, message: string) => void;
}

export function SafetyHazards({ onEventBusPublish }: SafetyHazardsProps) {
  const [gauges, setGauges] = useState<TelemetryGauge[]>([
    { name: "Methane Concentration (CH4)", value: 0.03, unit: "%", limit: 1.5, status: "normal" },
    { name: "Seismic Ground Displacement", value: 0.12, unit: "mm/s", limit: 2.0, status: "normal" },
    { name: "Shield Boring Pressure", value: 180, unit: "psi", limit: 300, status: "normal" },
    { name: "Hydrological Runoff pH Index", value: 7.2, unit: "pH", limit: 8.5, status: "normal" }
  ]);

  const [incidentLog, setIncidentLog] = useState<string[]>([
    "19:25:35 - HATHOR monitoring channels initialized securely.",
    "19:25:36 - Tailings slurry gates linked with MAMI_WATER successfully.",
    "19:25:38 - All on-site automated hauler telemetry synchronized."
  ]);

  const [activeAlertCount, setActiveAlertCount] = useState(0);

  // Periodically fluctuate raw values for immersion
  useEffect(() => {
    const timer = setInterval(() => {
      setGauges(prev =>
        prev.map(gauge => {
          // Do not mutate if gauge is currently forced into critical warning state by a test scenario
          if (gauge.status === "critical") return gauge;

          let diffVal = 0;
          if (gauge.unit === "%") {
            diffVal = (Math.random() - 0.5) * 0.01;
            const nextVal = Math.max(0.01, gauge.value + diffVal);
            return {
              ...gauge,
              value: Number(nextVal.toFixed(3)),
              status: nextVal > 1.0 ? "warning" : "normal"
            };
          } else if (gauge.unit === "mm/s") {
            diffVal = (Math.random() - 0.5) * 0.05;
            const nextVal = Math.max(0.05, gauge.value + diffVal);
            return {
              ...gauge,
              value: Number(nextVal.toFixed(2)),
              status: nextVal > 1.4 ? "warning" : "normal"
            };
          } else if (gauge.unit === "psi") {
            diffVal = (Math.random() - 0.5) * 4;
            const nextVal = Math.max(120, gauge.value + diffVal);
            return {
              ...gauge,
              value: Math.round(nextVal),
              status: nextVal > 250 ? "warning" : "normal"
            };
          } else {
            // pH
            diffVal = (Math.random() - 0.5) * 0.04;
            const nextVal = Math.max(6.5, Math.min(8.5, gauge.value + diffVal));
            return {
              ...gauge,
              value: Number(nextVal.toFixed(2)),
              status: nextVal > 8.0 || nextVal < 6.8 ? "warning" : "normal"
            };
          }
        })
      );
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // Update active critical alert counts
  useEffect(() => {
    const criticals = gauges.filter(g => g.status === "critical").length;
    setActiveAlertCount(criticals);
  }, [gauges]);

  const triggerScenario = (scenarioType: "methane" | "seismic" | "pressure") => {
    let message = "";
    
    setGauges(prev =>
      prev.map(g => {
        if (scenarioType === "methane" && g.name.includes("Methane")) {
          message = "Methane spikes to critical levels (1.82%). Initiating vacuum purge protocols.";
          return { ...g, value: 1.82, status: "critical" };
        }
        if (scenarioType === "seismic" && g.name.includes("Seismic")) {
          message = "Tectonic movement detected (2.45 mm/s). Locking drill core brackets instantly.";
          return { ...g, value: 2.45, status: "critical" };
        }
        if (scenarioType === "pressure" && g.name.includes("Boring")) {
          message = "Shaft pressure overload (320 psi). Recalculating venting valves safety coefficient.";
          return { ...g, value: 320, status: "critical" };
        }
        return g;
      })
    );

    const timeString = new Date().toLocaleTimeString();
    setIncidentLog(prev => [`${timeString} - [ALARM] ${message}`, ...prev]);

    // Push warning onto the shared Event Bus so other Constellation systems hear it
    if (scenarioType === "seismic") {
      onEventBusPublish("PTAH", `HATHOR: Seismic tremor detected under shaft block. Halt road grading immediately.`);
      onEventBusPublish("SHANGO", `HATHOR: Soil shifting. Trigger regional climate warning.`);
    } else if (scenarioType === "methane") {
      onEventBusPublish("MAMI_WATER", `HATHOR: Gas scrubbing active. Water filtration load increasing.`);
    } else {
      onEventBusPublish("HAPI", `HATHOR: Mechanical drilling halted due to pressure spike. Core loading delay expected.`);
    }
  };

  const handleMuteRestore = () => {
    setGauges([
      { name: "Methane Concentration (CH4)", value: 0.02, unit: "%", limit: 1.5, status: "normal" },
      { name: "Seismic Ground Displacement", value: 0.11, unit: "mm/s", limit: 2.0, status: "normal" },
      { name: "Shield Boring Pressure", value: 175, unit: "psi", limit: 300, status: "normal" },
      { name: "Hydrological Runoff pH Index", value: 7.15, unit: "pH", limit: 8.5, status: "normal" }
    ]);

    const timeString = new Date().toLocaleTimeString();
    setIncidentLog(prev => [`${timeString} - [STATUS] Manual mute of alarms recorded. Re-aligning telemetry telemetry loops.`, ...prev]);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden flex flex-col shadow-xl font-sans">
      <header className="px-6 py-4 bg-neutral-950 border-b border-neutral-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <AlertOctagon className={`h-5 w-5 ${activeAlertCount > 0 ? "text-red-500 animate-bounce" : "text-amber-500"}`} />
          <div>
            <h2 className="text-sm font-display font-bold tracking-wider text-neutral-100 uppercase">Hazard Command Centre</h2>
            <p className="text-[10px] text-neutral-500 font-mono">CRITICAL TELEMETRY SCANNERS & EMERGENCY OVERRIDES</p>
          </div>
        </div>

        {activeAlertCount > 0 && (
          <div className="bg-red-950/40 text-red-400 border border-red-900/40 px-3 py-1.5 rounded text-xs font-mono font-bold animate-pulse flex items-center gap-1.5">
            <Radio className="h-4 w-4 animate-spin text-red-500" />
            {activeAlertCount} CRITICAL THRESHOLDS EXCEEDED
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
        {/* Real-time sensory gauges */}
        <div className="lg:col-span-7 p-6 space-y-5">
          <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-400 border-b border-neutral-800 pb-2 uppercase">
            SENSORY BUS VALUES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gauges.map((gauge, idx) => (
              <div
                key={idx}
                className={`bg-neutral-950/40 border p-4 rounded-lg flex flex-col justify-between transition ${
                  gauge.status === "critical" ? "border-red-900 shadow-[0_0_10px_rgba(239,68,68,0.05)] bg-red-950/5" :
                  gauge.status === "warning" ? "border-amber-800 bg-amber-950/5" :
                  "border-neutral-800"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 max-w-[150px] leading-tight">
                      {gauge.name}
                    </span>
                    <span className={`h-2 w-2 rounded-full ${
                      gauge.status === "critical" ? "bg-red-500 animate-ping" :
                      gauge.status === "warning" ? "bg-amber-500 animate-pulse" :
                      "bg-emerald-500"
                    }`} />
                  </div>

                  <div className="flex items-baseline gap-1 mt-3">
                    <span className={`text-2xl font-display font-medium tracking-tight ${
                      gauge.status === "critical" ? "text-red-400" :
                      gauge.status === "warning" ? "text-amber-400" :
                      "text-neutral-100"
                    }`}>
                      {gauge.value}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">{gauge.unit}</span>
                  </div>
                </div>

                {/* Progress bar scale */}
                <div className="mt-4">
                  <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${Math.min(100, (gauge.value / gauge.limit) * 100)}%` }}
                      className={`h-full rounded-full ${
                        gauge.status === "critical" ? "bg-red-500" :
                        gauge.status === "warning" ? "bg-amber-500" :
                        "bg-emerald-500"
                      }`}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-neutral-600 mt-1">
                    <span>Baseline</span>
                    <span>Safety Limit: {gauge.limit} {gauge.unit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Core scenario injectors */}
          <div className="pt-4 mt-2">
            <span className="block text-[10px] font-mono text-neutral-500 mb-3">
              SIMULATION INJECTORS (TEST RISK MITIGATION & CONSTELLATION COOPERATION)
            </span>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => triggerScenario("methane")}
                className="px-3 py-1.5 bg-neutral-950 text-neutral-300 hover:text-red-400 border border-neutral-800 hover:border-red-900 rounded text-xs font-mono select-none flex items-center gap-1.5 cursor-pointer"
              >
                <div className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse" />
                Methane Purge Test
              </button>
              <button
                onClick={() => triggerScenario("seismic")}
                className="px-3 py-1.5 bg-neutral-950 text-neutral-300 hover:text-red-400 border border-neutral-800 hover:border-red-900 rounded text-xs font-mono select-none flex items-center gap-1.5 cursor-pointer"
              >
                <div className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse" />
                Seismic Shift Probe
              </button>
              <button
                onClick={() => triggerScenario("pressure")}
                className="px-3 py-1.5 bg-neutral-950 text-neutral-300 hover:text-red-400 border border-neutral-800 hover:border-red-900 rounded text-xs font-mono select-none flex items-center gap-1.5 cursor-pointer"
              >
                <div className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse" />
                Boring Overpressure Fail
              </button>
              
              <button
                onClick={handleMuteRestore}
                disabled={activeAlertCount === 0}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 border border-amber-600 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:border-transparent rounded text-xs font-mono font-medium ml-auto flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
              >
                <BellOff className="h-3.5 w-3.5" />
                Resolve / Mute Alarms
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Incident logs */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-neutral-950/20 font-mono">
          <div>
            <h3 className="text-xs font-bold tracking-widest text-neutral-400 border-b border-neutral-800 pb-2 uppercase flex items-center justify-between">
              <span>HATHOR AUTOMATED DECISION RECORDFILE</span>
              <span className="text-[10px] text-emerald-400 animate-pulse">● COMMS SYNCED</span>
            </h3>

            <div className="overflow-y-auto max-h-[220px] mt-4 space-y-2.5 pr-2">
              {incidentLog.map((log, idx) => {
                const isAlarm = log.includes("[ALARM]");
                const isStatus = log.includes("[STATUS]");
                return (
                  <div
                    key={idx}
                    className={`text-[11px] p-2 rounded leading-relaxed border ${
                      isAlarm ? "bg-red-950/20 text-red-400 border-red-900/30" :
                      isStatus ? "bg-amber-950/10 text-amber-500 border-amber-900/10" :
                      "text-neutral-500 border-neutral-900"
                    }`}
                  >
                    {log}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick info blurb on Hathor automated triggers */}
          <div className="p-4 bg-neutral-950/60 border border-neutral-800/80 rounded mt-4 text-[10px] text-neutral-400 space-y-2 font-mono">
            <span className="font-bold text-amber-500 flex items-center gap-1.5 uppercase tracking-wide">
              <ShieldAlert className="h-4 w-4" />
              Automated Safety Protocols
            </span>
            <p className="leading-relaxed">
              When gas sensors breach 1.5% or seismic metrics exceed 2.0 mm/s, HATHOR automatically locks rotary drills down to standby, engages localized high-capacity ventilation fans, and transmits priority warning packets directly across the Constellation shared communications stream.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
