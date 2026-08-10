import { useState, useRef, useEffect, useId, MouseEvent } from "react";
import { Layers, Activity, HelpCircle, RefreshCw, Compass } from "lucide-react";

interface StratigraphyLayer {
  name: string;
  depthRange: string;
  composition: string;
  estimateGrade: string;
  hazardRisk: string;
  mineralName: string;
}

export function GeologyModeler() {
  const [selectedBlock, setSelectedBlock] = useState("Alpha-Prime");
  const [expectedGrade, setExpectedGrade] = useState("12.5 g/t");
  const [seismicAnomalies, setSeismicAnomalies] = useState("nominal");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    layers: StratigraphyLayer[];
    geologicalSummary: string;
  } | null>(null);

  // Canvas elements for interactive geological sonar mapping
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0, depth: 0 });
  const [sonarPulse, setSonarPulse] = useState<{ x: number; y: number; active: boolean } | null>(null);
  const blockSelectId = useId();
  const gradeInputId = useId();
  const anomalySelectId = useId();

  // Load default scan on mount
  useEffect(() => {
    handleScanGeology();
  }, [selectedBlock]);

  // Draw geology cross-section onto the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Sizing canvas properly
    canvas.width = 650;
    canvas.height = 360;

    // Draw background
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines
    ctx.strokeStyle = "#171717";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 30) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += 30) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }

    // Layer 1: Topsoil & Siltwood (0px to 60px)
    ctx.fillStyle = "rgba(120, 113, 108, 0.15)"; // neutral grayish stone
    ctx.fillRect(0, 0, canvas.width, 60);
    ctx.strokeStyle = "rgba(120, 113, 108, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 60);
    ctx.bezierCurveTo(150, 55, 350, 65, canvas.width, 58);
    ctx.stroke();

    // Layer 2: Basaltic Strata (60px to 170px)
    ctx.fillStyle = "rgba(64, 64, 64, 0.25)"; // deep charcoal basalt
    ctx.fillRect(0, 60, canvas.width, 110);
    ctx.strokeStyle = "rgba(82, 82, 82, 0.4)";
    ctx.beginPath();
    ctx.moveTo(0, 170);
    ctx.bezierCurveTo(200, 160, 400, 178, canvas.width, 165);
    ctx.stroke();

    // Layer 3: Auriferous Quartz Ore Vein (170px to 270px) - Glowing Amber/Yellow
    ctx.fillStyle = "rgba(234, 179, 8, 0.08)";
    ctx.fillRect(0, 170, canvas.width, 100);

    // Draw gold veins
    ctx.strokeStyle = "rgba(234, 179, 8, 0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 180);
    ctx.lineTo(150, 220);
    ctx.lineTo(300, 190);
    ctx.lineTo(480, 250);
    ctx.lineTo(600, 210);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(100, 230);
    ctx.lineTo(250, 200);
    ctx.lineTo(400, 260);
    ctx.lineTo(550, 180);
    ctx.stroke();

    ctx.fillStyle = "rgba(234, 179, 8, 0.15)";
    ctx.font = "9px monospace";
    ctx.fillText("HATHOR AURIFEROUS TARGET CORE", 20, 195);

    // Separator Layer 3 to 4
    ctx.strokeStyle = "rgba(234, 179, 8, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 270);
    ctx.bezierCurveTo(100, 275, 450, 260, canvas.width, 272);
    ctx.stroke();

    // Layer 4: Deep Granite Bed (270px to end)
    ctx.fillStyle = "rgba(38, 38, 38, 0.4)";
    ctx.fillRect(0, 270, canvas.width, 90);

    // Subterranean Sonar Pulse
    if (sonarPulse && sonarPulse.active) {
      ctx.strokeStyle = "rgba(234, 179, 8, 0.8)";
      ctx.lineWidth = 1.5;
      
      ctx.beginPath();
      ctx.arc(sonarPulse.x, sonarPulse.y, 15, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.strokeStyle = "rgba(234, 179, 8, 0.4)";
      ctx.beginPath();
      ctx.arc(sonarPulse.x, sonarPulse.y, 35, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.strokeStyle = "rgba(234, 179, 8, 0.15)";
      ctx.beginPath();
      ctx.arc(sonarPulse.x, sonarPulse.y, 55, 0, 2 * Math.PI);
      ctx.stroke();

      // Sonar point marker
      ctx.fillStyle = "#eab308";
      ctx.beginPath();
      ctx.arc(sonarPulse.x, sonarPulse.y, 4, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Horizontal Depth Markers
    ctx.fillStyle = "rgba(163, 163, 163, 0.4)";
    ctx.font = "8px monospace";
    ctx.fillText("Depth: 0m", 590, 15);
    ctx.fillText("Depth: 100m", 580, 60);
    ctx.fillText("Depth: 300m", 580, 170);
    ctx.fillText("Depth: 450m", 580, 270);
    ctx.fillText("Depth: 600m", 580, 350);

  }, [sonarPulse]);

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    // Depth maps proportionally from 0 to 600 meters
    const depth = Math.round((y / canvas.height) * 600);
    setMouseCoords({ x, y, depth });
  };

  const handleCanvasClick = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setSonarPulse({ x, y, active: true });
    // Keep pulse active momentarily
    setTimeout(() => {
      setSonarPulse(prev => prev ? { ...prev, active: false } : null);
    }, 1500);
  };

  const handleScanGeology = async () => {
    setIsScanning(true);
    setScanResult(null);

    try {
      const response = await fetch("/api/gemini/geoscan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blockSelection: selectedBlock,
          expectedGrade: expectedGrade,
          seismicAnomalies: seismicAnomalies,
        }),
      });

      if (!response.ok) {
        throw new Error("Target response error in geological engine.");
      }

      const data = await response.json();
      setScanResult(data);
    } catch (error) {
      console.error("Geology sweep error:", error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden flex flex-col items-stretch shadow-xl">
      {/* Tab Header bar */}
      <header className="px-6 py-4 bg-neutral-950 border-b border-neutral-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Layers className="h-5 w-5 text-amber-500" />
          <div>
            <h2 className="text-sm font-display font-bold tracking-wider text-neutral-100 uppercase">Geological Resource Modeler</h2>
            <p className="text-[10px] text-neutral-500 font-mono">SEISMIC REFRACTION & CORE STRATIGRAPHY SYNTHESIS</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-neutral-900/40 px-3 py-1.5 border border-neutral-800 rounded">
          <Compass className="h-3.5 w-3.5 text-amber-500" />
          CURSOR DEPT: <span className="text-amber-500">{mouseCoords.depth}m</span> (X: {mouseCoords.x}, Y: {mouseCoords.y})
        </div>
      </header>

      {/* Main Body Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Inputs Board */}
        <div className="lg:col-span-4 p-6 border-r border-neutral-800 flex flex-col justify-between gap-6 bg-neutral-950/30">
          <div className="space-y-4">
            <div>
              <label htmlFor={blockSelectId} className="block text-xs font-mono text-neutral-400 mb-2">
                SITE BLOCK LOCATION
              </label>
              <select
                id={blockSelectId}
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs font-mono text-neutral-200 focus:outline-none focus:border-amber-500"
              >
                <option value="Alpha-Prime">Block Alpha-Prime (Sinking Shafts)</option>
                <option value="Beta-West">Block Beta-West (Deep Basin)</option>
                <option value="Gamma-Splay">Block Gamma-Splay (Fault Boundary)</option>
              </select>
            </div>

            <div>
              <label htmlFor={gradeInputId} className="block text-xs font-mono text-neutral-400 mb-2">
                ORE ESTIMATE SPEC (g/t)
              </label>
              <input
                id={gradeInputId}
                type="text"
                value={expectedGrade}
                onChange={(e) => setExpectedGrade(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs font-mono text-neutral-200 focus:outline-none focus:border-amber-500"
                placeholder="e.g. 15.0 g/t"
              />
            </div>

            <div>
              <label htmlFor={anomalySelectId} className="block text-xs font-mono text-neutral-400 mb-2">
                SEISMIC RADIAL FAULTS
              </label>
              <select
                id={anomalySelectId}
                value={seismicAnomalies}
                onChange={(e) => setSeismicAnomalies(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs font-mono text-neutral-200 focus:outline-none focus:border-amber-500"
              >
                <option value="nominal">Nominal (Seismically Quiet)</option>
                <option value="low">Sub-Faulting Detected</option>
                <option value="high">Critical Displacement Suspected</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleScanGeology}
              disabled={isScanning}
              className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-800 text-neutral-950 disabled:text-neutral-500 font-display font-semibold rounded text-xs tracking-wider transition duration-150 uppercase flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Scanning Sub-Layers...</span>
                </>
              ) : (
                <>
                  <Activity className="h-4 w-4" />
                  <span>Execute AI Geology Scan</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-neutral-500 font-mono text-center">
              CLICK THE STRATIGRAPHY CANVAS TO EMIT ACTIVE SONAR IMPULSES
            </p>
          </div>
        </div>

        {/* Right Canvas and Display Side */}
        <div className="lg:col-span-8 p-6 flex flex-col gap-6 bg-neutral-900/50">
          {/* Interactive Geology Map */}
          <div className="border border-neutral-800 rounded-lg p-3 bg-neutral-950 overflow-hidden relative group">
            <div className="absolute top-4 left-4 bg-neutral-950/80 border border-neutral-800 rounded px-2.5 py-1 text-[9px] font-mono text-neutral-300 pointer-events-none z-10 flex items-center gap-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
              LIVE TELEMETRY ACTIVE
            </div>
            
            <canvas
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onClick={handleCanvasClick}
              className="w-full aspect-[650/360] bg-neutral-950 rounded cursor-crosshair border border-neutral-900 shadow-inner"
            />
          </div>

          {/* AI Scan Results Log */}
          <div className="border border-neutral-800 rounded-lg p-5 bg-neutral-950/70 font-mono">
            <h3 className="text-xs font-bold tracking-widest text-neutral-300 border-b border-neutral-800 pb-3 mb-4 uppercase flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-amber-500 rounded-full" />
              Scan Stratigraphy Register — CORE_LOG_BLOCK_{selectedBlock.toUpperCase()}
            </h3>

            {isScanning ? (
              <div className="py-12 flex flex-col items-center justify-center gap-4 text-xs text-neutral-400">
                <RefreshCw className="h-6 w-6 text-amber-500 animate-spin" />
                <span>Acquiring seismic cross-sections and computing rock grades...</span>
              </div>
            ) : scanResult ? (
              <div className="space-y-6 text-xs leading-relaxed">
                {/* Stratum Table representation */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="border-b border-neutral-800 text-[10px] text-neutral-500 uppercase">
                        <th className="pb-2 font-mono">Stratum Layer</th>
                        <th className="pb-2 font-mono">Depth Interval</th>
                        <th className="pb-2 font-mono">Underground Comp.</th>
                        <th className="pb-2 font-mono">Ore Spec / Grade</th>
                        <th className="pb-2 font-mono text-right">Hazard Rating</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900">
                      {scanResult.layers.map((layer, index) => (
                        <tr key={index} className="hover:bg-neutral-900/40 text-neutral-300 transition">
                          <td className="py-2.5 font-sans font-medium text-neutral-200">
                            {layer.name}
                          </td>
                          <td className="py-2.5 text-neutral-400">{layer.depthRange}</td>
                          <td className="py-2.5 text-[11px] text-neutral-500">{layer.composition}</td>
                          <td className="py-2.5 text-amber-500 font-semibold">{layer.estimateGrade}</td>
                          <td className="py-2.5 text-right">
                            <span className={`px-1.5 py-0.5 rounded text-[9px] border font-bold uppercase ${
                              layer.hazardRisk === "Low" ? "bg-emerald-950/20 text-emerald-400 border-emerald-900/30" :
                              layer.hazardRisk === "Medium" ? "bg-amber-950/20 text-amber-400 border-amber-900/30" :
                              "bg-red-950/20 text-red-400 border-red-900/30"
                            }`}>
                              {layer.hazardRisk}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Geological Summary Markdown */}
                <div className="p-4 bg-neutral-900/40 border border-neutral-800 rounded leading-6 text-neutral-300 whitespace-pre-line text-[11px] font-sans">
                  {scanResult.geologicalSummary.replace(/###/g, "").replace(/\*\*/g, "")}
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-neutral-600 flex flex-col items-center gap-2">
                <HelpCircle className="h-6 w-6" />
                <span>Select site specs on the left side and press "Execute AI Geology Scan" to retrieve real strata tables.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
