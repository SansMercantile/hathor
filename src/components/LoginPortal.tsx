import { useState, useId, FormEvent } from "react";
import { Shield, Key, AlertTriangle, Cpu, Terminal } from "lucide-react";

interface LoginPortalProps {
  onLoginSuccess: (operatorName: string, role: string) => void;
}

export function LoginPortal({ onLoginSuccess }: LoginPortalProps) {
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const formId = useId();

  const handleQuickLogin = (selectedEmail: string) => {
    setEmail(selectedEmail);
    setPasscode("HATHOR-ALPHA-982");
    setErrorMsg(null);
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email) {
      setErrorMsg("Unauthorized input: Please enter an approved HATHOR identifier.");
      return;
    }

    if (!email.includes("@")) {
      setErrorMsg("Malformed entity: Email must contain valid host structures.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Determine role based on email input
      const username = email.split("@")[0];
      const operatorName = username.charAt(0).toUpperCase() + username.slice(1);
      const host = email.split("@")[1];

      if (host === "sansmercantile.com") {
        onLoginSuccess(operatorName, "Lead Exploration Scientist");
      } else {
        onLoginSuccess(operatorName, "Field Technical Officer");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 flex flex-col justify-between p-6 md:p-12 relative overflow-hidden font-sans">
      {/* Background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29371a_1px,transparent_1px),linear-gradient(to_bottom,#1f29371a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute -top-64 -right-64 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-64 -left-64 w-[500px] h-[500px] bg-neutral-800/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 max-w-7xl w-full mx-auto border-b border-neutral-900 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="h-2 w-2 bg-amber-500 rounded-full animate-ping" />
            <span className="font-display font-bold tracking-[0.25em] text-amber-500 text-lg">HATHOR</span>
          </div>
          <p className="text-xs text-neutral-500 font-mono mt-1">SANS MERCANTILE CONSTELLATION SERVICE</p>
        </div>
        <div className="text-right font-mono text-xs text-neutral-500">
          <span className="text-neutral-400">SESSION:</span> SECURE_GATEWAY_v4.11
        </div>
      </header>

      {/* Main Form Box */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center my-12 max-w-lg w-full mx-auto">
        <div className="w-full bg-neutral-900/60 border border-neutral-800 p-8 rounded-lg backdrop-blur-md relative">
          {/* Subtle neon tech details */}
          <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          
          <div className="text-center mb-8">
            <div className="inline-flex p-3 bg-neutral-950 border border-neutral-800 rounded-full text-amber-500 mb-4 shadow-[0_0_15px_rgba(234,179,8,0.15)]">
              <Shield className="h-6 w-6" />
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-neutral-100">Portal Authorization</h1>
            <p className="text-xs text-neutral-400 mt-2 font-mono">
              AUTHORIZED PERSONNEL ONLY. ACCESS REGULATED & AUDITED.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-950/40 border border-red-900/50 text-red-300 rounded flex gap-3 text-xs font-mono leading-relaxed">
              <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />
              <div>
                <span className="font-semibold text-red-200">DENIED:</span> {errorMsg}
              </div>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label htmlFor={`${formId}-username`} className="block text-xs font-mono text-neutral-400 mb-2">
                HATHOR COGNITIVE EMAIL/IDENTIFIER
              </label>
              <div className="relative">
                <input
                  id={`${formId}-username`}
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@sansmercantile.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-white font-mono placeholder:text-neutral-700 transition"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor={`${formId}-passcode`} className="block text-xs font-mono text-neutral-400 mb-2">
                SECURE KEY/PASSCODE
              </label>
              <div className="relative">
                <input
                  id={`${formId}-passcode`}
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="••••••••••••••"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-white font-mono placeholder:text-neutral-700 transition"
                  disabled={isLoading}
                />
                <Key className="absolute right-3.5 top-3.5 h-4 w-4 text-neutral-600" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-display font-semibold py-3 px-4 rounded transition duration-200 text-sm tracking-widest flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Cpu className="h-4 w-4 animate-spin" />
                  <span>DECRYPTING CREDENTIALS...</span>
                </>
              ) : (
                <>
                  <Terminal className="h-4 w-4" />
                  <span>LAUNCH PORTAL</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Setup for Preview Ease */}
          <div className="mt-8 pt-6 border-t border-neutral-800">
            <span className="block text-xs font-mono text-neutral-500 mb-3 text-center">
              DEMO GATEWAY ACCESS DIRECTORY
            </span>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin("hathor@sansmercantile.com")}
                className="w-full py-2 px-3 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 rounded transition duration-150 text-left text-xs font-mono text-neutral-300 flex justify-between items-center"
              >
                <span>hathor@sansmercantile.com</span>
                <span className="text-amber-500 text-[10px] border border-amber-500/30 px-1 rounded">Lead Administrator</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("operator.field@sansmercantile.com")}
                className="w-full py-2 px-3 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-amber-500/40  rounded transition duration-150 text-left text-xs font-mono text-neutral-300 flex justify-between items-center"
              >
                <span>operator.field@sansmercantile.com</span>
                <span className="text-neutral-500 text-[10px] border border-neutral-800 px-1 rounded">Geological Surveyor</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto border-t border-neutral-900 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-neutral-500">
        <div>
          © 2026 SANS MERCANTILE AG. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-4">
          <a href="mailto:hello@sansmercantile.com" className="hover:text-amber-500 transition">hello@sansmercantile.com</a>
          <span>•</span>
          <span className="text-neutral-700">CLASSIFIED RESOURCE PORTAL</span>
        </div>
      </footer>
    </div>
  );
}
