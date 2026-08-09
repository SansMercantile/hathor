import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../useScrollReveal';

export default function Constellation() {
  useScrollReveal();
  return (
    <>
      <div className="page-hero">
        <div className="section-tag">// Platform Integration</div>
        <h1>Constellation</h1>
        <p className="page-desc">HATHOR operates within the Sans Mercantile Constellation — a suite of specialized AI systems that share data and coordinate operations across industries. Each system is purpose-built, yet fully interoperable.</p>
      </div>

      <section className="constellation">
        <div className="constellation-grid">
          <div className="constellation-card">
            <div className="sys-name">PTAH</div>
            <h3>Infrastructure &amp; Construction</h3>
            <p>Coordinates mine infrastructure development, civil engineering workflows, and construction project management at active extraction sites. PTAH ensures that new shafts, haul roads, and processing facilities are delivered on schedule and within specification — feeding project timelines back into HATHOR&rsquo;s extraction planning models.</p>
            <span className="constellation-badge">Active Integration</span>
          </div>
          <div className="constellation-card">
            <div className="sys-name">HAPI</div>
            <h3>Secure Material Transport</h3>
            <p>Manages secure logistics for extracted minerals — from site to processing facility to export terminal — with chain-of-custody tracking. HAPI&rsquo;s real-time shipment data flows directly into HATHOR&rsquo;s logistics dashboard, giving operators complete visibility over material movement and delivery status.</p>
            <span className="constellation-badge">Active Integration</span>
          </div>
          <div className="constellation-card">
            <div className="sys-name">MAMI_WATER</div>
            <h3>Hydraulics &amp; Water Systems</h3>
            <p>Monitors and manages water usage in extraction operations — including dewatering, tailings pond levels, and freshwater consumption compliance. MAMI_WATER&rsquo;s predictive models alert HATHOR to potential water-related hazards before they impact operations or environmental compliance thresholds.</p>
            <span className="constellation-badge">Active Integration</span>
          </div>
          <div className="constellation-card">
            <div className="sys-name">SHANGO</div>
            <h3>Climate &amp; Environmental</h3>
            <p>Tracks climate impact, extreme weather risk, and environmental conditions near mining sites — feeding HATHOR&rsquo;s sustainability compliance reports. When SHANGO detects approaching severe weather, HATHOR automatically adjusts extraction schedules and triggers site preparation protocols.</p>
            <span className="constellation-badge">Active Integration</span>
          </div>
        </div>
      </section>

      <section>
        <div className="section-tag">// Architecture</div>
        <h2>How the Constellation<br />Connects</h2>
        <p className="section-intro">Every system in the Constellation communicates through a shared event bus, authenticated service mesh, and unified data catalog — ensuring that insights from one domain instantly enrich decision-making in every other.</p>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg></div>
            <h3>Shared Event Bus</h3>
            <p>All Constellation systems publish and subscribe to a common event stream. Geological discoveries in HATHOR trigger logistics planning in HAPI. Weather alerts from SHANGO cascade into safety protocols across all platforms — with sub-second propagation and guaranteed delivery.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></div>
            <h3>Authenticated Service Mesh</h3>
            <p>Every inter-service call is authenticated, encrypted, and audited. Role-based access policies ensure that each system only accesses the data it needs — maintaining security boundaries while enabling seamless collaboration across the Constellation.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg></div>
            <h3>Unified Data Catalog</h3>
            <p>A central data catalog indexes every dataset across the Constellation — from seismic surveys in HATHOR to shipment records in HAPI. Any system can query any dataset with proper authorization, eliminating data silos and enabling cross-domain analytics that were previously impossible.</p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg2)', textAlign: 'center' }}>
        <div className="section-tag">// Get Started</div>
        <h2>Access the<br />Platform</h2>
        <p className="section-intro mx-auto" style={{ textAlign: 'center' }}>Ready to experience HATHOR&rsquo;s intelligence firsthand? Access the secure portal to explore live dashboards and operational tools.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
          <Link to="/portal" className="btn-primary">Launch Platform</Link>
          <Link to="/capabilities" className="btn-secondary">View Capabilities</Link>
        </div>
      </section>
    </>
  );
}
