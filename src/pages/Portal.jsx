import React, { useState } from 'react';
import Dashboard from './Dashboard';
import './../tailwind-utilities.css';

export default function Portal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  // Matches the original js/main.js behavior exactly — there's no real auth backend
  // yet, so this stays an honest "coming soon" message rather than faking a login.
  const handleLaunch = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter your credentials to access the platform.');
      return;
    }
    alert('Authentication service coming soon. Contact hathor@sansmercantile.com for early access.');
  };

  if (showDemo) {
    return (
      <div>
        <div style={{ padding: '1rem 1.5rem', background: '#111827', borderBottom: '1px solid #374151', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#fbbf24', fontSize: '0.85rem', fontWeight: 600 }}>
            Demo Preview — sample data, not connected to a live backend
          </span>
          <button onClick={() => setShowDemo(false)} style={{ background: 'none', border: '1px solid #4b5563', color: '#e5e7eb', padding: '0.4rem 0.9rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
            &larr; Back to Portal
          </button>
        </div>
        <Dashboard />
      </div>
    );
  }

  return (
    <div className="portal-section" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <div className="section-tag" style={{ position: 'relative', zIndex: 2 }}>// Secure Access</div>
      <h2 style={{ position: 'relative', zIndex: 2 }}>HATHOR Platform Portal</h2>
      <p className="section-intro" style={{ position: 'relative', zIndex: 2, textAlign: 'center', margin: '0 auto' }}>
        Sign in with your authorized credentials to access the HATHOR operations dashboard, real-time extraction data, and site management tools.
      </p>
      <div className="portal-card">
        <div className="lock-icon">
          <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
        </div>
        <h3>Sign in to HATHOR</h3>
        <p className="sub">Authorized personnel only. Access is monitored and logged.</p>
        <div className="input-wrap">
          <label>Email Address</label>
          <input type="email" placeholder="operator@sansmercantile.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-wrap">
          <label>Password</label>
          <input type="password" placeholder="••••••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="portal-launch" onClick={handleLaunch}>Launch HATHOR Platform &rarr;</button>
        <div className="portal-notice">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          Access is restricted to authorized operators. Contact <a href="mailto:hathor@sansmercantile.com">hathor@sansmercantile.com</a>
        </div>
        <button
          onClick={() => setShowDemo(true)}
          style={{ marginTop: '1rem', background: 'none', border: 'none', color: '#f59e0b', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline' }}
        >
          View demo dashboard (sample data, no login required) &rarr;
        </button>
      </div>
    </div>
  );
}
