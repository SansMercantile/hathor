import { useState, useEffect } from "react";
import { 
  Terminal, ShieldAlert, Cpu, Activity, Compass, 
  Map, Lightbulb, UserCheck, LogOut, Radio, 
  Settings, Clock, CheckCircle2, ChevronRight, HelpCircle
} from "lucide-react";
import { LoginPortal } from "./components/LoginPortal";
import { GeologyModeler } from "./components/GeologyModeler";
import { ExtractionOptimizer } from "./components/ExtractionOptimizer";
import { SafetyHazards } from "./components/SafetyHazards";
import { ConstellationLink } from "./components/ConstellationLink";
import { EnvironmentalAudit } from "./components/EnvironmentalAudit";

interface EventBusMessage {
  timestamp: string;
  sender: string;
  target?: string;
  content: string;
}

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [operator, setOperator] = useState({ name: "", role: "" });
  const [activeTab, setActiveTab] = useState<"overview" | "geology" | "optimizer" | "hazards" | "auditing" | "constellation">("overview");
  
  // High fidelity shared state: Event Bus stream spanning all modules
  const [eventBusMessages, setEventBusMessages] = useState<EventBusMessage[]>([
    {
      timestamp: "19:25:35",
      sender: "HATHOR",
      target: "ALL_SYSTEMS",
      content: "Auth channel secured. Live telemetry feeds linked successfully via TLS mesh."
    },
    {
      timestamp: "19:25:36",
      sender: "SHANGO",
      target: "HATHOR",
      content: "Environmental forecasting active. Heavy rainfall potential in the regional Basin estimated under 12.4%."
    },
    {
      timestamp: "19:25:38",
      sender: "MAMI_WATER",
      target: "HATHOR",
      content: "Tailings pond recycling unit synchronized. Fluid flow is running at nominal rates."
    }
  ]);

  const [simulatedTime, setSimulatedTime] = useState("");

  // Update clock every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSimulatedTime(now.getUTCFullYear() + "-" + 
        String(now.getUTCMonth() + 1).padStart(2, "0") + "-" + 
        String(now.getUTCDate()).padStart(2, "0") + " " + 
        String(now.getUTCHours()).padStart(2, "0") + ":" + 
        String(now.getUTCMinutes()).padStart(2, "0") + ":" + 
        String(now.getUTCSeconds()).padStart(2, "0") + " UTC");
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLoginSuccess = (operatorName: string, role: string) => {
    setOperator({ name: operatorName, role });
    setIsAuthorized(true);
    
    // Log auth event
    const now = new Date();
    const timestamp = now.toLocaleTimeString();
    setEventBusMessages(prev => [
      {
        timestamp,
        sender: "SYSTEM",
        target: "HATHOR",
        content: `Operator ${operatorName} authorized successfully as role: ${role}.`
      },
      ...prev
    ]);
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    setOperator({ name: "", role: "" });
  };

  const handlePublishMessage = (target: string, content: string) => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString();
    
    // Add original message to the bus
    const userMsg: EventBusMessage = {
      timestamp,
      sender: "HATHOR_OPERATOR",
      target,
      content
    };

    setEventBusMessages(prev => [userMsg, ...prev]);

    // Simulate reactive responses from Constellation sister systems after a brief delay
    setTimeout(() => {
      const respTimestamp = new Date().toLocaleTimeString();
      let autoResponse: EventBusMessage | null = null;

      if (target === "ALL_SYSTEMS" || target === "PTAH") {
        autoResponse = {
          timestamp: respTimestamp,
          sender: "PTAH",
          target: "HATHOR",
          content: "Acknowledged priority stream. Road infrastructure and deep shaft reinforcements set to standby status."
        };
      } else if (target === "HAPI") {
        autoResponse = {
          timestamp: respTimestamp,
          sender: "HAPI",
          target: "HATHOR",
          content: "Secure transport schedules recalculated. Transit fleets moving gold reserves rerouted off risk corridors."
        };
      } else if (target === "MAMI_WATER") {
        autoResponse = {
          timestamp: respTimestamp,
          sender: "MAMI_WATER",
          target: "HATHOR",
          content: "Fluid recycling sensors reporting neutral pH parameters. Pressure pumps on stand-by."
        };
      } else if (target === "SHANGO") {
        autoResponse = {
          timestamp: respTimestamp,
          sender: "SHANGO",
          target: "HATHOR",
          content: "Climate micro-front alert received. Elevating lightning shielding alerts to Stage Yellow."
        };
      }

      if (autoResponse) {
        setEventBusMessages(prev => [autoResponse!, ...prev]);
      }
    }, 1200);
  };

  if (!isAuthorized) {
    return <LoginPortal onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#0C0C0E] text-[#D1D1D1] font-mono flex flex-col justify-between select-none p-4 md:p-6 border-8 border-[#1A1A1E] relative">
      {/* Visual background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370d_1px,transparent_1px),linear-gradient(to_bottom,#1f29370d_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
      
      {/* Top Cockpit Header in High Density Theme style */}
      <header className="relative z-10 max-w-7xl w-full mx-auto border border-zinc-805 border-zinc-700 bg-[#141417] pb-3 pt-3 px-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="bg-zinc-100 text-black px-3 py-1 font-bold text-md tracking-tighter">HATHOR // CORE</div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest">System Status</span>
            <span className="text-emerald-500 text-xs font-bold">● NOMINAL_OPERATION</span>
          </div>
        </div>

        {/* Credentials & System time block */}
        <div className="flex flex-wrap items-center gap-3 lg:gap-5 text-xs font-mono">
          <div className="bg-zinc-950 px-2.5 py-1.5 border border-zinc-800 rounded-none flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-zinc-400" />
            <span className="text-zinc-300 font-bold whitespace-nowrap">{simulatedTime}</span>
          </div>

          <div className="bg-zinc-950 px-2.5 py-1.5 border border-zinc-800 rounded-none flex items-center gap-2">
            <UserCheck className="h-3.5 w-3.5 text-zinc-400" />
            <div className="leading-none text-left">
              <span className="block text-zinc-200 font-bold text-[10px]">{operator.name}</span>
              <span className="text-[9px] text-zinc-500 uppercase font-mono mt-0.5 block">{operator.role}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700 rounded-none shrink-0 transition flex items-center gap-2 cursor-pointer text-[10px] font-bold"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>DISCONNECT</span>
          </button>
        </div>
      </header>

      {/* Main Control deck Navigation Rail - dense flat monospace tabs */}
      <nav className="relative z-10 max-w-7xl w-full mx-auto border-x border-zinc-800 bg-[#141417] px-4 py-2 flex flex-wrap gap-1.5">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-3 py-1 text-xs font-mono font-bold tracking-tighter uppercase transition cursor-pointer border rounded-none ${
            activeTab === "overview"
              ? "bg-zinc-100 text-black border-zinc-100"
              : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-805"
          }`}
        >
          CORE OVERVIEW //
        </button>

        <button
          onClick={() => setActiveTab("geology")}
          className={`px-3 py-1 text-xs font-mono font-bold tracking-tighter uppercase transition cursor-pointer border rounded-none ${
            activeTab === "geology"
              ? "bg-zinc-100 text-black border-zinc-100"
              : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-850"
          }`}
        >
          GEOLOGY SCANNER //
        </button>

        <button
          onClick={() => setActiveTab("optimizer")}
          className={`px-3 py-1 text-xs font-mono font-bold tracking-tighter uppercase transition cursor-pointer border rounded-none ${
            activeTab === "optimizer"
              ? "bg-zinc-100 text-black border-zinc-100"
              : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-850"
          }`}
        >
          EXTRACTION OPTIMIZER //
        </button>

        <button
          onClick={() => setActiveTab("hazards")}
          className={`px-3 py-1 text-xs font-mono font-bold tracking-tighter uppercase transition cursor-pointer border rounded-none ${
            activeTab === "hazards"
              ? "bg-zinc-100 text-black border-zinc-100"
              : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-850"
          }`}
        >
          HAZARDS COMMAND //
        </button>

        <button
          onClick={() => setActiveTab("auditing")}
          className={`px-3 py-1 text-xs font-mono font-bold tracking-tighter uppercase transition cursor-pointer border rounded-none ${
            activeTab === "auditing"
              ? "bg-zinc-100 text-black border-zinc-100"
              : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-850"
          }`}
        >
          ESG & COMPLIANCE //
        </button>

        <button
          onClick={() => setActiveTab("constellation")}
          className={`px-3 py-1 text-xs font-mono font-bold tracking-tighter uppercase transition cursor-pointer border rounded-none ${
            activeTab === "constellation"
              ? "bg-zinc-100 text-black border-zinc-100"
              : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-850"
          }`}
        >
          CONSTELLATION NETWORK //
        </button>
      </nav>

      {/* Screen Workspaces panel */}
      <main className="relative z-10 max-w-7xl w-full mx-auto bg-[#141417] border border-zinc-800 p-4 shadow-xl flex-1 rounded-none">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Tech banner */}
            <div className="border border-zinc-800 bg-[#141417] p-5 rounded-none relative overflow-hidden flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
              <div className="absolute top-0 right-0 w-[400px] h-[150px] bg-[radial-gradient(ellipse_at_top_right,rgba(39,39,42,0.15),transparent)] pointer-events-none" />
              <div className="space-y-1.5 max-w-2xl text-left">
                <span className="text-[10px] bg-zinc-800 text-zinc-300 font-mono border border-zinc-700 px-2 py-0.5 rounded-none font-bold uppercase tracking-wider">
                  PLATFORM CORE INSTRUCTIONAL // RECTIFIED
                </span>
                <h2 className="text-lg font-bold text-zinc-100 tracking-tight">
                  Welcome to HATHOR Mineral & Resource Command Hub
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans mt-2">
                  HATHOR transforms geological sensor feeds, borehole stratigraphy coordinates, and real-time environmental metrics into a high-yield optimization cycle. Use the command telemetry selectors to conduct deep strata seismic assessments, direct heavy haulers dynamically, audit compliance codes, and transmit mesh warnings across the Sans Mercantile Constellation.
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setActiveTab("geology")}
                  className="px-3 py-1.5 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-none transition duration-150 text-xs font-mono font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span>Geostat Map</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
                <button
                  onClick={() => setActiveTab("optimizer")}
                  className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-black rounded-none transition duration-150 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Tune Blending</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Quick Status Deck / Cockpit Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Site Status card */}
              <div className="bg-[#141417]/90 border border-zinc-800 p-4 rounded-none text-left relative overflow-hidden">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">ACTIVE BLOCK AGENTS</span>
                  <Activity className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="text-xl font-bold text-zinc-100">BLOCK: ALPHA</div>
                <p className="text-[10px] text-zinc-500 font-mono mt-2 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  Drill depths reaching 340m
                </p>
              </div>

              {/* Ore estimation status card */}
              <div className="bg-[#141417]/90 border border-zinc-800 p-4 rounded-none text-left relative overflow-hidden">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">ESTIMATED CORE YIELD</span>
                  <Compass className="h-4 w-4 text-emerald-500 animate-spin" style={{ animationDuration: "12s" }} />
                </div>
                <div className="text-xl font-bold text-emerald-400">14.5 g/t Gold</div>
                <p className="text-[10px] text-zinc-500 font-mono mt-2">
                  Certified via AI deep stratigraphy
                </p>
              </div>

              {/* Safety metrics summary card */}
              <div className="bg-[#141417]/90 border border-zinc-800 p-4 rounded-none text-left relative overflow-hidden">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">SAFETY COEF. RATING</span>
                  <ShieldAlert className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="text-xl font-bold text-emerald-400">99.8% SECURE</div>
                <p className="text-[10px] text-zinc-500 font-mono mt-2">
                  Seismic fault sensors: NOMINAL
                </p>
              </div>

              {/* Sister Constellation card */}
              <div className="bg-[#141417]/90 border border-zinc-800 p-4 rounded-none text-left relative overflow-hidden">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">CONSTELLATION FEEDS</span>
                  <Radio className="h-4 w-4 text-zinc-400" />
                </div>
                <div className="text-xl font-bold text-zinc-150">4 / 4 COOPERATIVE</div>
                <p className="text-[10px] text-zinc-500 font-mono mt-2">
                  PTAH, HAPI, MAMI, SHANGO linked
                </p>
              </div>
            </div>

            {/* Sub-splits for quick highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
              {/* Left quick news panel */}
              <div className="lg:col-span-7 bg-[#141417]/50 border border-zinc-800 p-4 rounded-none space-y-4">
                <h3 className="text-xs font-mono font-bold text-zinc-400 border-b border-zinc-800 pb-2 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 bg-zinc-400 rounded-full animate-ping" />
                  Mining Operations Journal logs
                </h3>

                <div className="space-y-3 font-sans text-xs text-zinc-400 leading-relaxed">
                  <div className="p-3 bg-zinc-900/40 border border-zinc-800 rounded-none hover:border-zinc-700 transition">
                    <span className="font-mono text-[9px] text-zinc-400 font-semibold block mb-1">STRATA ANALYSIS — SYSTEM TRIGGERED</span>
                    <p className="text-[#D1D1D1]">
                      Geology model detected severe igneous basalt barriers between 60m and 170m under Block Beta. Standard drill rotational load increased slightly by +12.5%. Core targets verified intact.
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-900/40 border border-zinc-800 rounded-none hover:border-zinc-700 transition">
                    <span className="font-mono text-[9px] text-zinc-400 font-semibold block mb-1">ESG HYDRAULICS CERTIFICATE — MAMI_WATER</span>
                    <p className="text-[#D1D1D1]">
                      Tailings recycling units achieved a record **94.2% water reclamation coefficient**, reducing on-site river dewatering ingestion rates within certified baseline green thresholds.
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-900/40 border border-zinc-800 rounded-none hover:border-zinc-700 transition">
                    <span className="font-mono text-[9px] text-zinc-400 font-semibold block mb-1">CONSTELLATION INTEGRITY — SHANGO FEED</span>
                    <p className="text-[#D1D1D1]">
                      Weather patterns remain clear from any heavy wind or lightning threat factors. Heavy transportation fleets managed under HAPI can continue scheduled gold haul road runs throughout night shifts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right quick list event bus logs */}
              <div className="lg:col-span-5 bg-[#141417]/50 border border-zinc-800 p-4 rounded-none flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-bold text-zinc-400 border-b border-zinc-800 pb-2 uppercase tracking-wide flex items-center gap-1.5">
                    <Radio className="h-3.5 w-3.5 text-zinc-400" />
                    Secure Telemetry Event Buffer
                  </h3>

                  <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1">
                    {eventBusMessages.slice(0, 4).map((msg, idx) => (
                      <div key={idx} className="p-2.5 bg-zinc-950 border border-zinc-900 rounded-none font-mono text-[10px] text-zinc-300 flex justify-between items-start gap-3">
                        <div className="space-y-1">
                          <span className="text-zinc-400 font-bold uppercase block text-[9px]">{msg.sender}</span>
                          <p className="text-zinc-350 font-sans text-xs leading-relaxed">{msg.content}</p>
                        </div>
                        <span className="text-zinc-600 self-center shrink-0 text-[10px]">{msg.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 mt-4">
                  <button
                    onClick={() => setActiveTab("constellation")}
                    className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white text-xs font-mono rounded-none transition flex justify-center items-center gap-1 cursor-pointer"
                  >
                    <span>Launch Transceiver Terminal</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Geology tab */}
        {activeTab === "geology" && <GeologyModeler />}

        {/* Optimizer tab */}
        {activeTab === "optimizer" && <ExtractionOptimizer />}

        {/* Hazards tab */}
        {activeTab === "hazards" && (
          <SafetyHazards onEventBusPublish={handlePublishMessage} />
        )}

        {/* Auditing panel */}
        {activeTab === "auditing" && <EnvironmentalAudit />}

        {/* Constellation link panel */}
        {activeTab === "constellation" && (
          <ConstellationLink 
            eventBusMessages={eventBusMessages}
            onPublishMessage={handlePublishMessage}
          />
        )}
      </main>

      {/* Corporate platform footer */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto border border-zinc-800 bg-[#141417] p-4 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-zinc-500">
        <div className="flex gap-6 items-center flex-wrap">
          <span>LAT: 25.7617° N</span>
          <span>LON: 80.1918° W</span>
          <span>ALT: 402 KM</span>
          <span className="hidden sm:inline">|</span>
          <span className="text-zinc-400 font-bold">Terminal Connected</span>
          <div className="w-1.5 h-3 bg-emerald-500 animate-pulse inline-block"></div>
        </div>
        <div className="flex gap-4">
          <span className="text-zinc-500 uppercase">SANS_MERCANTILE_INDUSTRIES // ©2026</span>
        </div>
      </footer>
    </div>
  );
}
