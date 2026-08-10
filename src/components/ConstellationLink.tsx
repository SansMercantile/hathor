import { useState, useId, FormEvent } from "react";
import { Radio, Send, Database, CloudRain, ShieldCheck, HeartPulse, Hammer, Box } from "lucide-react";

interface EventBusMessage {
  timestamp: string;
  sender: string;
  target?: string;
  content: string;
}

interface ConstellationLinkProps {
  eventBusMessages: EventBusMessage[];
  onPublishMessage: (target: string, content: string) => void;
}

export function ConstellationLink({ eventBusMessages, onPublishMessage }: ConstellationLinkProps) {
  const [selectedTarget, setSelectedTarget] = useState("ALL_SYSTEMS");
  const [customMessage, setCustomMessage] = useState("");
  const inputMessageId = useId();
  const targetSelectId = useId();

  const handlePost = (e: FormEvent) => {
    e.preventDefault();
    if (!customMessage.trim()) return;

    onPublishMessage(selectedTarget, customMessage);
    setCustomMessage("");
  };

  const constellationMates = [
    {
      id: "PTAH",
      name: "PTAH",
      fullName: "Ptah Infrastructure & Engineering",
      icon: Hammer,
      sector: "Civil Construction",
      description: "Coordinates mine shaft developments, civil works, and heavy facility logistics. Feeds active delivery milestones directly back into Hathor's grade blending forecasts.",
    },
    {
      id: "HAPI",
      name: "HAPI",
      fullName: "Hapi Secure Materials Transport",
      icon: Box,
      sector: "Chain-of-Custody Logistics",
      description: "Manages secure transit rosters from mine-head to milling plants to seaport export harbors. Coordinates tonnage queues in real time based on active extraction rates.",
    },
    {
      id: "MAMI_WATER",
      name: "MAMI_WATER",
      fullName: "Mami Water Hydraulic Systems",
      icon: HeartPulse,
      sector: "Environmental Water Hydrology",
      description: "Monitors tailings slurry height levels, dewatering flows, and critical aquatic acidity boundaries. Alerts operators about sudden chemical anomalies.",
    },
    {
      id: "SHANGO",
      name: "SHANGO",
      fullName: "Shango Climate & Extreme Hazards",
      icon: CloudRain,
      sector: "Meteorological Defense",
      description: "Maintains radar arrays tracking weather fronts, heavy storms, and micro-burst lightning near remote operations nodes. Triggers autonomous safety overrides of hoisting cables.",
    }
  ];

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden flex flex-col shadow-xl font-sans">
      <header className="px-6 py-4 bg-neutral-950 border-b border-neutral-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Radio className="h-5 w-5 text-amber-500 animate-pulse" />
          <div>
            <h2 className="text-sm font-display font-bold tracking-wider text-neutral-100 uppercase">Sans Mercantile Constellation Mesh</h2>
            <p className="text-[10px] text-neutral-500 font-mono">FEDERATED AI EDGE MESH & SECURE AUDIT EVENTS</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 divide-y xl:divide-y-0 xl:divide-x divide-neutral-800">
        {/* Constellation Systems Deck */}
        <div className="xl:col-span-7 p-6 space-y-5">
          <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-400 border-b border-neutral-800 pb-2 uppercase">
            SISTER NODE REGISTRIES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {constellationMates.map((sys) => {
              const Icon = sys.icon;
              return (
                <div
                  key={sys.id}
                  className="bg-neutral-950/60 hover:bg-neutral-950 border border-neutral-850 hover:border-amber-500/30 p-4 rounded transition flex flex-col justify-between gap-3 relative overflow-hidden group"
                >
                  <div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-neutral-900 border border-neutral-800 rounded text-amber-500 group-hover:text-amber-400 transition">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="font-display font-bold text-xs tracking-wider text-neutral-200">
                          {sys.name}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-emerald-400 border border-emerald-900/40 px-1.5 py-0.5 rounded bg-emerald-950/20 uppercase">
                        SYNCED
                      </span>
                    </div>

                    <p className="text-[10px] text-neutral-500 font-mono mt-2 uppercase">{sys.sector}</p>
                    <p className="text-xs text-neutral-400 mt-2.5 leading-relaxed font-sans">
                      {sys.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-900 flex justify-between items-center text-[10px] font-mono text-neutral-500 mt-3">
                    <span>latency: 48ms</span>
                    <span className="text-amber-500/80">AUTHENTICATED</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real-time shared event bus stream */}
        <div className="xl:col-span-5 p-6 flex flex-col justify-between bg-neutral-950/20 font-mono">
          <div className="flex-1 flex flex-col justify-between gap-4">
            <div>
              <h3 className="text-xs font-bold tracking-widest text-neutral-300 border-b border-neutral-800 pb-2 uppercase flex items-center gap-1.5">
                <Database className="h-4 w-4 text-amber-500" />
                CONSTELLATION EVENT BUS STREAM
              </h3>

              {/* Message loop lists */}
              <div className="space-y-3 mt-4 overflow-y-auto max-h-[200px] pr-2">
                {eventBusMessages.map((msg, index) => (
                  <div
                    key={index}
                    className="p-3 bg-neutral-950 border border-neutral-900 rounded text-[11px] leading-relaxed relative"
                  >
                    <div className="flex justify-between text-[9px] text-neutral-500 mb-1">
                      <span className="font-bold text-amber-500 uppercase">{msg.sender} → {msg.target || "BROADCAST"}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <p className="text-neutral-300 font-sans leading-relaxed">
                      {msg.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Input sender form */}
            <form onSubmit={handlePost} className="pt-4 border-t border-neutral-800 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label htmlFor={targetSelectId} className="sr-only">Select target system</label>
                  <select
                    id={targetSelectId}
                    value={selectedTarget}
                    onChange={(e) => setSelectedTarget(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-xs font-mono text-neutral-300 focus:outline-none"
                  >
                    <option value="ALL_SYSTEMS">Broadcast (All systems)</option>
                    <option value="PTAH">PTAH (Infrastructure)</option>
                    <option value="HAPI">HAPI (Logistics)</option>
                    <option value="MAMI_WATER">MAMI_WATER (Hydraulics)</option>
                    <option value="SHANGO">SHANGO (Climate)</option>
                  </select>
                </div>
                <div className="text-[10px] text-neutral-500 flex items-center justify-end font-mono">
                  SHA-256 SECURED TRANSPORT
                </div>
              </div>

              <div className="relative">
                <label htmlFor={inputMessageId} className="sr-only">Enter broadcast payload message</label>
                <input
                  id={inputMessageId}
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Enter broadcast payload..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs font-mono text-neutral-200 focus:outline-none focus:border-amber-500 pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 text-neutral-500 hover:text-amber-500 text-xs px-2 py-1 transition cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
