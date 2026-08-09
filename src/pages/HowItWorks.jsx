import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../useScrollReveal';

export default function HowItWorks() {
  useScrollReveal();
  return (
    <>
      <div className="page-hero">
        <div className="section-tag">// Process Intelligence</div>
        <h1>How It Works</h1>
        <p className="page-desc">HATHOR transforms fragmented field data into a continuous intelligence loop that improves every extraction decision — from raw sensor input to actionable operator guidance.</p>
      </div>

      <section style={{ background: 'var(--bg2)' }}>
        <div className="steps">
          <div className="step">
            <div className="step-num">01</div>
            <h3>Data Ingestion</h3>
            <p>HATHOR ingests sensor feeds, borehole logs, satellite imagery, weather data, and equipment telemetry — normalizing diverse sources into a unified data lake in real time. Whether data arrives via MQTT streaming, REST API push, or batch file upload, the ingestion pipeline validates, deduplicates, and indexes each record within milliseconds.</p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <h3>AI Analysis &amp; Prediction</h3>
            <p>Geological models, hazard detectors, and optimization algorithms process incoming data continuously — generating risk scores, deposit probability maps, and maintenance forecasts. Multi-layer neural networks trained on decades of mining data identify patterns invisible to human analysts, while anomaly detection flags deviations before they escalate into incidents.</p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <h3>Operator Decision Support</h3>
            <p>Prioritized alerts, recommended extraction sequences, and environmental compliance reports surface through role-specific dashboards, mobile apps, and API integrations. Every recommendation includes a confidence score, supporting evidence, and a one-click path to implementation — reducing cognitive load on operators while preserving full human oversight of critical decisions.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="section-tag">// Deep Dive</div>
        <h2>Intelligence at<br />Every Layer</h2>
        <p className="section-intro">Each stage of the HATHOR pipeline is built for resilience, scalability, and accuracy — ensuring that no signal is lost and no decision is made on stale data.</p>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9" /></svg></div>
            <h3>Edge Processing</h3>
            <p>Raw sensor data is pre-processed at the edge — filtering noise, compressing telemetry, and triggering local alerts before data ever reaches the cloud. This minimizes latency for safety-critical notifications and reduces bandwidth costs across remote mine sites.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg></div>
            <h3>Data Lake Architecture</h3>
            <p>All ingested data lands in a time-indexed, schema-on-read data lake. Historical records are never overwritten — enabling full audit trails, retroactive model training, and compliance reporting that requires point-in-time reconstruction of operational state.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg></div>
            <h3>Model Orchestration</h3>
            <p>HATHOR&rsquo;s model orchestration layer routes incoming data to the right AI models — geological, safety, logistics, or environmental — and reconciles overlapping predictions into a single coherent operational picture. Models are versioned, A/B tested, and automatically rolled back if accuracy degrades.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg></div>
            <h3>Alert Routing</h3>
            <p>Intelligent alert routing ensures that the right people are notified at the right time — with severity-based escalation, site-specific distribution lists, and quiet-hours policies. Critical safety alerts bypass all filters and deliver simultaneously to dashboards, mobile devices, and on-site alarm systems.</p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg2)', textAlign: 'center' }}>
        <div className="section-tag">// Explore Further</div>
        <h2>Part of Something<br />Bigger</h2>
        <p className="section-intro mx-auto" style={{ textAlign: 'center' }}>HATHOR doesn&rsquo;t work alone. It operates within the Sans Mercantile Constellation — a suite of interconnected AI systems.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
          <Link to="/constellation" className="btn-primary">View Constellation</Link>
          <Link to="/portal" className="btn-secondary">Launch Platform</Link>
        </div>
      </section>
    </>
  );
}
