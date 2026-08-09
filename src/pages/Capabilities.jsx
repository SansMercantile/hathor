import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../useScrollReveal';

export default function Capabilities() {
  useScrollReveal();
  return (
    <>
      <div className="page-hero">
        <div className="section-tag">// Core Systems</div>
        <h1>Capabilities</h1>
        <p className="page-desc">HATHOR integrates geological intelligence, real-time hazard monitoring, and extraction optimization into a unified command platform — delivering decisive advantages at every stage of the mining lifecycle.</p>
      </div>

      <section>
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
          <div className="feature-card">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg></div>
            <h3>Equipment Intelligence</h3>
            <p>Predictive maintenance for drills, haulers, and processing equipment using vibration analysis, thermal imaging, and historical failure pattern modeling.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg></div>
            <h3>Logistics &amp; Supply Chain</h3>
            <p>Coordinate ore transport, fleet routing, processing plant scheduling, and material exports with end-to-end supply chain visibility across all sites.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg></div>
            <h3>Real-Time Analytics</h3>
            <p>Live dashboards aggregating data from sensors, equipment, and operations — with configurable alerts and role-based reporting for executives and field teams.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg></div>
            <h3>API-First Integration</h3>
            <p>Connect HATHOR to ERP, GIS, and planning systems via REST and streaming APIs. Built for headless operation and containerized enterprise deployment.</p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg2)', textAlign: 'center' }}>
        <div className="section-tag">// Next Step</div>
        <h2>Ready to See It<br />in Action?</h2>
        <p className="section-intro mx-auto" style={{ textAlign: 'center' }}>Discover how HATHOR transforms raw field data into decisive action, or access the platform directly.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
          <Link to="/how-it-works" className="btn-primary">How It Works</Link>
          <Link to="/portal" className="btn-secondary">Launch Platform</Link>
        </div>
      </section>
    </>
  );
}
