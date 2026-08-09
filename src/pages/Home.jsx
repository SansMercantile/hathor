import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../useScrollReveal';

export default function Home() {
  useScrollReveal();
  return (
    <>
      <section className="hero">
        <div className="hero-topo">
          <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <style>{`.topo-line { fill: none; stroke: #f59e0b; stroke-width: 0.8; }`}</style>
            </defs>
            <ellipse className="topo-line" cx="720" cy="450" rx="680" ry="340" />
            <ellipse className="topo-line" cx="720" cy="450" rx="600" ry="290" />
            <ellipse className="topo-line" cx="720" cy="450" rx="520" ry="240" />
            <ellipse className="topo-line" cx="720" cy="450" rx="440" ry="192" />
            <ellipse className="topo-line" cx="720" cy="450" rx="360" ry="148" />
            <ellipse className="topo-line" cx="720" cy="450" rx="280" ry="108" />
            <ellipse className="topo-line" cx="720" cy="450" rx="200" ry="72" />
            <ellipse className="topo-line" cx="720" cy="450" rx="120" ry="40" />
            <ellipse className="topo-line" cx="1100" cy="200" rx="420" ry="210" opacity="0.6" />
            <ellipse className="topo-line" cx="1100" cy="200" rx="340" ry="166" opacity="0.6" />
            <ellipse className="topo-line" cx="1100" cy="200" rx="260" ry="124" opacity="0.6" />
            <ellipse className="topo-line" cx="1100" cy="200" rx="180" ry="84" opacity="0.6" />
            <ellipse className="topo-line" cx="160" cy="780" rx="300" ry="150" opacity="0.4" />
            <ellipse className="topo-line" cx="160" cy="780" rx="220" ry="106" opacity="0.4" />
            <ellipse className="topo-line" cx="160" cy="780" rx="140" ry="64" opacity="0.4" />
            <line className="topo-line" x1="0" y1="620" x2="1440" y2="620" opacity="0.3" />
            <line className="topo-line" x1="0" y1="660" x2="1440" y2="660" opacity="0.2" />
            <line className="topo-line" x1="0" y1="700" x2="1440" y2="700" opacity="0.15" />
            <line className="topo-line" x1="0" y1="740" x2="1440" y2="740" opacity="0.1" />
            <g opacity="0.4">
              <line className="topo-line" x1="380" y1="290" x2="420" y2="290" />
              <line className="topo-line" x1="400" y1="270" x2="400" y2="310" />
              <line className="topo-line" x1="980" y1="640" x2="1020" y2="640" />
              <line className="topo-line" x1="1000" y1="620" x2="1000" y2="660" />
              <line className="topo-line" x1="240" y1="510" x2="270" y2="510" />
              <line className="topo-line" x1="255" y1="496" x2="255" y2="524" />
            </g>
          </svg>
        </div>

        <span className="hero-tag">Sans Mercantile Constellation &bull; Mining Intelligence</span>
        <h1>HATHOR</h1>
        <p className="hero-sub">AI-guided mineral intelligence and resource extraction optimization for safe, sustainable, and high-yield mining operations worldwide.</p>
        <div className="hero-ctas">
          <Link to="/portal" className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
            Access Platform
          </Link>
          <Link to="/capabilities" className="btn-secondary">Explore Capabilities</Link>
        </div>
      </section>

      <div className="stats">
        <div className="stat"><div className="stat-num">2,847</div><div className="stat-label">Tons extracted daily</div></div>
        <div className="stat"><div className="stat-num">12</div><div className="stat-label">Active mine sites</div></div>
        <div className="stat"><div className="stat-num">98.5%</div><div className="stat-label">Safety compliance</div></div>
        <div className="stat"><div className="stat-num">94.2%</div><div className="stat-label">Fleet efficiency</div></div>
      </div>

      <section>
        <div className="section-tag">// Core Systems</div>
        <h2>Built for the<br />Depths of Industry</h2>
        <p className="section-intro">HATHOR integrates geological intelligence, real-time hazard monitoring, and extraction optimization into a unified command platform.</p>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg></div>
            <h3>Geological Analysis</h3>
            <p>Detect mineral deposits, map underground structures, and visualize resource potential with AI-powered geological modeling from seismic and borehole data.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" /></svg></div>
            <h3>Resource Optimization</h3>
            <p>Maximize extraction yield while minimizing waste, tailings, and energy consumption through adaptive scheduling and real-time ore grade intelligence.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></div>
            <h3>Safety Monitoring</h3>
            <p>Continuous monitoring of ground stability, gas levels, equipment stress, and worker proximity — alerting operators before critical thresholds are breached.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg></div>
            <h3>Environmental Impact</h3>
            <p>Track water consumption, CO₂ emissions, land disturbance, and tailings volume — producing compliance-ready environmental reports automatically.</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/capabilities" className="btn-secondary">View All Capabilities &rarr;</Link>
        </div>
      </section>
    </>
  );
}
