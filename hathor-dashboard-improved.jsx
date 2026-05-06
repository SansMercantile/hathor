/**
 * HATHOR Dashboard — Improved Version
 * Drop this file in as a replacement for pages/Dashboard.js
 * Dependencies: recharts, lucide-react (already in project)
 */

import React, { useState, useEffect } from 'react';
import {
  Pickaxe, Mountain, Zap, Shield, Truck, BarChart3, Settings,
  RefreshCw, TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  Clock, Activity, Cpu, HardDrive, Globe, ChevronRight, Bell,
  FlaskConical, Layers, Gauge, Drill, Wind
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, RadarChart,
  Radar, PolarGrid, PolarAngleAxis
} from 'recharts';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8003';

// ─── DATA ────────────────────────────────────────────────────────────────────

const extractionData = [
  { day: 'Mon', copper: 420, gold: 180, iron: 820, silver: 95 },
  { day: 'Tue', copper: 390, gold: 220, iron: 750, silver: 110 },
  { day: 'Wed', copper: 470, gold: 195, iron: 880, silver: 88 },
  { day: 'Thu', copper: 510, gold: 240, iron: 790, silver: 125 },
  { day: 'Fri', copper: 480, gold: 210, iron: 910, silver: 102 },
  { day: 'Sat', copper: 360, gold: 175, iron: 680, silver: 78 },
  { day: 'Sun', copper: 340, gold: 155, iron: 640, silver: 70 },
];

const hourlyProduction = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i.toString().padStart(2, '0')}:00`,
  tons: Math.floor(80 + Math.sin(i / 4) * 40 + Math.random() * 30),
  target: 110,
}));

const resourceMix = [
  { name: 'Iron Ore', value: 44, color: '#f59e0b' },
  { name: 'Copper', value: 28, color: '#d97706' },
  { name: 'Gold', value: 14, color: '#fcd34d' },
  { name: 'Silver', value: 8,  color: '#94a3b8' },
  { name: 'Other',  value: 6,  color: '#374151' },
];

const sites = [
  { id: 'S01', name: 'Kalahari Deep', status: 'active',  depth: 840, ore: 'Iron/Copper', yield: 98, workers: 142, hazard: 'low' },
  { id: 'S02', name: 'Witwatersrand B', status: 'active', depth: 1200, ore: 'Gold',      yield: 92, workers: 98,  hazard: 'medium' },
  { id: 'S03', name: 'Orange Plateau',  status: 'active', depth: 560,  ore: 'Copper',    yield: 87, workers: 76,  hazard: 'low' },
  { id: 'S04', name: 'Namib East',      status: 'alert',  depth: 680,  ore: 'Zinc/Lead', yield: 71, workers: 54,  hazard: 'high' },
  { id: 'S05', name: 'Limpopo Ridge',   status: 'active', depth: 420,  ore: 'Chromite',  yield: 95, workers: 112, hazard: 'low' },
  { id: 'S06', name: 'Bushveld North',  status: 'maintenance', depth: 320, ore: 'Platinum', yield: 0, workers: 12, hazard: 'low' },
];

const equipment = [
  { id: 'DR-01', name: 'Drill Rig Alpha', type: 'Drill', status: 'operational', health: 96, site: 'Kalahari Deep', lastService: '3 days ago', nextService: '27 days' },
  { id: 'DR-02', name: 'Drill Rig Beta',  type: 'Drill', status: 'operational', health: 84, site: 'Witwatersrand B', lastService: '12 days ago', nextService: '18 days' },
  { id: 'HU-01', name: 'Hauler Fleet A',  type: 'Hauler', status: 'operational', health: 91, site: 'Orange Plateau', lastService: '5 days ago', nextService: '25 days' },
  { id: 'HU-02', name: 'Hauler Fleet B',  type: 'Hauler', status: 'warning',     health: 62, site: 'Namib East',    lastService: '28 days ago', nextService: '2 days' },
  { id: 'CR-01', name: 'Crusher Unit 1',  type: 'Processing', status: 'operational', health: 88, site: 'Limpopo Ridge', lastService: '7 days ago', nextService: '23 days' },
  { id: 'CR-02', name: 'Crusher Unit 2',  type: 'Processing', status: 'maintenance', health: 0,  site: 'Bushveld North', lastService: 'Today', nextService: '30 days' },
  { id: 'VN-01', name: 'Ventilation Sys', type: 'Safety', status: 'operational', health: 99, site: 'Kalahari Deep', lastService: '1 day ago', nextService: '29 days' },
  { id: 'PU-01', name: 'Pump System A',   type: 'Hydraulic', status: 'warning',   health: 68, site: 'Namib East', lastService: '21 days ago', nextService: '9 days' },
];

const safetyData = [
  { month: 'Jan', incidents: 2, nearMiss: 7, inspections: 24 },
  { month: 'Feb', incidents: 1, nearMiss: 5, inspections: 22 },
  { month: 'Mar', incidents: 0, nearMiss: 8, inspections: 28 },
  { month: 'Apr', incidents: 1, nearMiss: 4, inspections: 25 },
  { month: 'May', incidents: 0, nearMiss: 3, inspections: 30 },
  { month: 'Jun', incidents: 0, nearMiss: 6, inspections: 27 },
];

const geologyRadar = [
  { subject: 'Gold Grade',    A: 72 }, { subject: 'Copper Density', A: 88 },
  { subject: 'Iron Content',  A: 94 }, { subject: 'Depth Viability', A: 81 },
  { subject: 'Ore Quality',   A: 76 }, { subject: 'Extraction Ease', A: 65 },
];

const logistics = [
  { id: 'TRK-041', route: 'Kalahari → Upington Rail', material: 'Iron Ore', tons: 520, status: 'in-transit', eta: '4h 20m' },
  { id: 'TRK-042', route: 'Witwatersrand → Johannesburg Refinery', material: 'Gold Doré', tons: 48, status: 'loading', eta: '—' },
  { id: 'TRK-043', route: 'Orange Plateau → Cape Town Port', material: 'Copper', tons: 310, status: 'in-transit', eta: '9h 10m' },
  { id: 'TRK-044', route: 'Limpopo → Thabazimbi Processing', material: 'Chromite', tons: 680, status: 'delivered', eta: 'Done' },
  { id: 'TRK-045', route: 'Namib East → Walvis Bay Port', material: 'Zinc', tons: 220, status: 'delayed', eta: '14h+' },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const StatusBadge = ({ status }) => {
  const map = {
    active:       'bg-green-500/20 text-green-400 border-green-500/30',
    operational:  'bg-green-500/20 text-green-400 border-green-500/30',
    alert:        'bg-red-500/20 text-red-400 border-red-500/30',
    warning:      'bg-amber-500/20 text-amber-400 border-amber-500/30',
    maintenance:  'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'in-transit': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    loading:      'bg-amber-500/20 text-amber-400 border-amber-500/30',
    delivered:    'bg-green-500/20 text-green-400 border-green-500/30',
    delayed:      'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${map[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
      {status.replace('-', ' ')}
    </span>
  );
};

const HealthBar = ({ value }) => {
  const color = value >= 80 ? '#22c55e' : value >= 60 ? '#f59e0b' : '#ef4444';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div style={{ width: `${value}%`, background: color }} className="h-full rounded-full transition-all" />
      </div>
      <span className="text-xs font-mono" style={{ color }}>{value}%</span>
    </div>
  );
};

const MetricCard = ({ icon: Icon, color, label, value, sub, trend }) => (
  <div className="mining-card rounded-xl p-5 flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <Icon className={`w-5 h-5 ${color}`} />
      {trend != null && (
        trend >= 0
          ? <TrendingUp className="w-4 h-4 text-green-400" />
          : <TrendingDown className="w-4 h-4 text-red-400" />
      )}
    </div>
    <div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className={`text-sm ${color} font-medium`}>{label}</div>
      {sub && <div className="text-xs text-gray-500 mt-0.5">{sub}</div>}
    </div>
  </div>
);

const chartTooltipStyle = {
  backgroundColor: '#1a1f2e',
  border: '1px solid rgba(245,158,11,0.2)',
  borderRadius: 8,
  color: '#f1f5f9',
  fontSize: 12,
};

// ─── TAB COMPONENTS ──────────────────────────────────────────────────────────

const OverviewTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard icon={Pickaxe}    color="text-amber-400"  label="Daily Extraction" value="2,847t"  sub="↑ 12% vs target" trend={1} />
      <MetricCard icon={Mountain}   color="text-green-400"  label="Active Sites"     value="12"      sub="1 in maintenance" />
      <MetricCard icon={Shield}     color="text-blue-400"   label="Safety Score"     value="98.5%"   sub="0 incidents this month" trend={1} />
      <MetricCard icon={Truck}      color="text-purple-400" label="Fleet Efficiency" value="94.2%"   sub="8 haulers active" trend={-1} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Extraction chart */}
      <div className="mining-card rounded-xl p-5 lg:col-span-2">
        <h3 className="text-sm font-semibold text-white mb-4">Weekly Extraction by Mineral (tons)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={extractionData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              {[['copper','#f59e0b'],['gold','#fcd34d'],['iron','#60a5fa'],['silver','#94a3b8']].map(([k,c]) => (
                <linearGradient key={k} id={`g-${k}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={c} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={c} stopOpacity={0}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={chartTooltipStyle} cursor={{ stroke: 'rgba(245,158,11,0.2)' }} />
            <Area type="monotone" dataKey="iron"   stroke="#60a5fa" fill="url(#g-iron)"   strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="copper" stroke="#f59e0b" fill="url(#g-copper)" strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="gold"   stroke="#fcd34d" fill="url(#g-gold)"   strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="silver" stroke="#94a3b8" fill="url(#g-silver)" strokeWidth={2} dot={false} />
            <Legend iconSize={8} wrapperStyle={{ fontSize: 11, color: '#94a3b8', paddingTop: 8 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Resource mix pie */}
      <div className="mining-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Resource Mix</h3>
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie data={resourceMix} cx="50%" cy="50%" innerRadius={45} outerRadius={70}
              dataKey="value" paddingAngle={3}>
              {resourceMix.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
            <Tooltip contentStyle={chartTooltipStyle} formatter={(v) => `${v}%`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-1.5 mt-2">
          {resourceMix.map(r => (
            <div key={r.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                <span className="text-gray-400">{r.name}</span>
              </div>
              <span className="text-white font-medium">{r.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Recent activity */}
    <div className="mining-card rounded-xl p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Live Activity Feed</h3>
      <div className="space-y-3">
        {[
          { time: '2 min ago',  event: 'New high-grade copper vein intersected at Kalahari Deep — 4.8% Cu', type: 'discovery', icon: Mountain },
          { time: '18 min ago', event: 'Hauler Fleet B maintenance alert — hydraulic pressure below threshold', type: 'alert', icon: AlertTriangle },
          { time: '1 hr ago',   event: 'Monthly safety inspection passed at all 5 active sites', type: 'safety', icon: CheckCircle },
          { time: '2 hr ago',   event: 'Iron ore extraction quota exceeded by 12.4% — Kalahari & Limpopo', type: 'production', icon: TrendingUp },
          { time: '3 hr ago',   event: 'Shipment TRK-044 delivered to Thabazimbi Processing Plant — 680t chromite', type: 'logistics', icon: Truck },
        ].map((a, i) => {
          const Icon = a.icon;
          const colorMap = { discovery: 'text-amber-400', alert: 'text-red-400', safety: 'text-green-400', production: 'text-purple-400', logistics: 'text-blue-400' };
          return (
            <div key={i} className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
              <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colorMap[a.type]}`} />
              <span className="text-gray-300 text-sm flex-1">{a.event}</span>
              <span className="text-amber-500 text-xs flex-shrink-0 font-mono">{a.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const ExtractionTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard icon={Pickaxe}  color="text-amber-400"  label="Today's Total"   value="1,189t" sub="of 1,080t target" trend={1} />
      <MetricCard icon={Activity} color="text-green-400"  label="Active Faces"    value="34"     sub="across 5 sites" />
      <MetricCard icon={Gauge}    color="text-blue-400"   label="Avg Ore Grade"   value="3.2%"   sub="Cu equivalent" trend={1} />
      <MetricCard icon={Layers}   color="text-purple-400" label="Waste Ratio"     value="1:4.1"  sub="ore to waste" trend={1} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="mining-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Hourly Production Rate (tons)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={hourlyProduction.filter((_, i) => i % 2 === 0)} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="hour" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Bar dataKey="tons"   fill="#f59e0b" radius={[3,3,0,0]} name="Actual" />
            <Bar dataKey="target" fill="rgba(255,255,255,0.08)" radius={[3,3,0,0]} name="Target" />
            <Legend iconSize={8} wrapperStyle={{ fontSize: 11, color: '#94a3b8', paddingTop: 8 }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mining-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Site Extraction Performance</h3>
        <div className="space-y-3">
          {sites.filter(s => s.status !== 'maintenance').map(site => (
            <div key={site.id}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-300 font-medium">{site.name}</span>
                <span className="text-amber-400 font-mono">{site.yield}%</span>
              </div>
              <HealthBar value={site.yield} />
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="mining-card rounded-xl p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Active Mine Sites</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {['Site ID','Name','Ore Type','Depth (m)','Yield','Workers','Hazard','Status'].map(h => (
                <th key={h} className="pb-3 text-left text-xs text-gray-500 font-medium pr-4">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sites.map(s => (
              <tr key={s.id} className="hover:bg-white/5 transition-colors">
                <td className="py-3 pr-4 font-mono text-amber-400 text-xs">{s.id}</td>
                <td className="py-3 pr-4 text-white font-medium">{s.name}</td>
                <td className="py-3 pr-4 text-gray-400">{s.ore}</td>
                <td className="py-3 pr-4 text-gray-400 font-mono">{s.depth}m</td>
                <td className="py-3 pr-4 w-32"><HealthBar value={s.yield} /></td>
                <td className="py-3 pr-4 text-gray-400">{s.workers}</td>
                <td className="py-3 pr-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${s.hazard === 'low' ? 'bg-green-500/20 text-green-400 border-green-500/30' : s.hazard === 'medium' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                    {s.hazard}
                  </span>
                </td>
                <td className="py-3"><StatusBadge status={s.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const GeologyTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard icon={Globe}       color="text-amber-400"  label="Survey Coverage"  value="84.2%"  sub="of licensed area" />
      <MetricCard icon={FlaskConical} color="text-green-400"  label="Active Deposits"  value="7"      sub="confirmed viable" />
      <MetricCard icon={Layers}      color="text-blue-400"   label="Borehole Samples" value="1,248"  sub="this quarter" trend={1} />
      <MetricCard icon={TrendingUp}  color="text-purple-400" label="Reserve Growth"   value="+8.4%"  sub="year-on-year" trend={1} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="mining-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Kalahari Deep — Deposit Viability Radar</h3>
        <ResponsiveContainer width="100%" height={260}>
          <RadarChart data={geologyRadar}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <Radar name="Deposit" dataKey="A" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} strokeWidth={2} />
            <Tooltip contentStyle={chartTooltipStyle} formatter={(v) => `${v}/100`} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mining-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Geological Survey Log</h3>
        <div className="space-y-3 mt-1">
          {[
            { site: 'Kalahari Deep',     type: 'Core Sample',      grade: '4.8% Cu',     depth: '840m', result: 'High Grade' },
            { site: 'Witwatersrand B',   type: 'Seismic Analysis', grade: '2.1g/t Au',   depth: '1200m', result: 'Confirmed' },
            { site: 'Orange Plateau',    type: 'Drill Assay',      grade: '1.8% Cu',     depth: '560m', result: 'Good Grade' },
            { site: 'Namib East',        type: 'Borehole Sample',  grade: '3.4% Zn',     depth: '680m', result: 'Review' },
            { site: 'Limpopo Ridge',     type: 'Core Sample',      grade: '18.2% Cr₂O₃', depth: '420m', result: 'High Grade' },
            { site: 'North Survey Block',type: 'Aerial Survey',    grade: 'TBD',         depth: 'Surface', result: 'Pending' },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                <Mountain className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white font-medium truncate">{r.site}</div>
                <div className="text-xs text-gray-500">{r.type} · {r.depth}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-mono text-amber-400">{r.grade}</div>
                <div className="text-xs text-gray-500">{r.result}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const EquipmentTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard icon={Zap}          color="text-amber-400"  label="Operational Units" value="5/8"   sub="3 require attention" />
      <MetricCard icon={Activity}     color="text-green-400"  label="Avg Fleet Health"  value="73.5%" sub="" trend={-1} />
      <MetricCard icon={Clock}        color="text-blue-400"   label="Uptime This Week"  value="91.2%" sub="↑ from 88.7%" trend={1} />
      <MetricCard icon={AlertTriangle}color="text-red-400"    label="Active Alerts"     value="3"     sub="2 warnings, 1 maintenance" />
    </div>

    <div className="mining-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-white">Fleet Status & Maintenance</h3>
        <button className="text-xs text-amber-400 border border-amber-500/30 px-3 py-1.5 rounded-full hover:bg-amber-500/10 transition-colors">
          Schedule Service
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {equipment.map(eq => (
          <div key={eq.id} className="p-4 bg-white/5 rounded-xl border border-white/8 hover:border-amber-500/20 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm font-semibold text-white">{eq.name}</div>
                <div className="text-xs text-gray-500 mt-0.5 font-mono">{eq.id} · {eq.type}</div>
              </div>
              <StatusBadge status={eq.status} />
            </div>
            <div className="mb-3">
              <div className="text-xs text-gray-500 mb-1.5">Health</div>
              {eq.status === 'maintenance' ? (
                <div className="text-xs text-blue-400">Currently under scheduled maintenance</div>
              ) : (
                <HealthBar value={eq.health} />
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div><div className="text-gray-600 mb-0.5">Site</div><div className="text-gray-300 truncate">{eq.site.split(' ')[0]}</div></div>
              <div><div className="text-gray-600 mb-0.5">Last Service</div><div className="text-gray-300">{eq.lastService}</div></div>
              <div><div className="text-gray-600 mb-0.5">Next Service</div><div className={`font-medium ${parseInt(eq.nextService) <= 5 ? 'text-amber-400' : 'text-gray-300'}`}>{eq.nextService}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SafetyTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard icon={Shield}     color="text-green-400"  label="Safety Score"     value="98.5%" sub="Industry avg: 94.2%" trend={1} />
      <MetricCard icon={CheckCircle}color="text-green-400"  label="Days Without LTI" value="127"   sub="Lost time injury free" trend={1} />
      <MetricCard icon={Bell}       color="text-amber-400"  label="Active Alerts"    value="4"     sub="2 high, 2 medium" />
      <MetricCard icon={Activity}   color="text-blue-400"   label="Inspections YTD"  value="156"   sub="of 144 planned" trend={1} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="mining-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Incidents & Near-Misses (2026)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={safetyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Bar dataKey="inspections" fill="rgba(96,165,250,0.4)" radius={[3,3,0,0]} name="Inspections" />
            <Bar dataKey="nearMiss"    fill="#f59e0b" radius={[3,3,0,0]} name="Near Miss" />
            <Bar dataKey="incidents"   fill="#ef4444" radius={[3,3,0,0]} name="Incidents" />
            <Legend iconSize={8} wrapperStyle={{ fontSize: 11, color: '#94a3b8', paddingTop: 8 }} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mining-card rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Active Safety Alerts</h3>
        <div className="space-y-3">
          {[
            { level: 'high',   icon: Wind,          site: 'Namib East',     msg: 'Elevated methane levels detected in Level 4 — ventilation review required' },
            { level: 'high',   icon: HardDrive,     site: 'Namib East',     msg: 'Ground movement anomaly detected — section 4C monitoring elevated' },
            { level: 'medium', icon: Cpu,           site: 'Witwatersrand B', msg: 'Seismic activity above background — blast moratorium in effect' },
            { level: 'medium', icon: AlertTriangle, site: 'Kalahari Deep',  msg: 'Dust particulate levels approaching limit in shaft access tunnel' },
          ].map((a, i) => {
            const Icon = a.icon;
            const c = a.level === 'high' ? 'border-red-500/40 bg-red-500/10' : 'border-amber-500/40 bg-amber-500/10';
            const tc = a.level === 'high' ? 'text-red-400' : 'text-amber-400';
            return (
              <div key={i} className={`p-3.5 rounded-xl border ${c}`}>
                <div className="flex items-start gap-3">
                  <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tc}`} />
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wide mb-0.5 ${tc}`}>{a.level} · {a.site}</div>
                    <div className="text-sm text-gray-300">{a.msg}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

const LogisticsTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard icon={Truck}       color="text-amber-400"  label="Active Shipments" value="12"     sub="across 3 routes" />
      <MetricCard icon={CheckCircle} color="text-green-400"  label="On-Time Rate"     value="88.4%"  sub="this week" trend={-1} />
      <MetricCard icon={Activity}    color="text-purple-400" label="Tons in Transit"  value="3,840t" sub="to 4 destinations" />
      <MetricCard icon={AlertTriangle}color="text-red-400"  label="Delayed Loads"    value="2"      sub="avg 6hr delay" />
    </div>

    <div className="mining-card rounded-xl p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Live Shipment Tracker</h3>
      <div className="space-y-3">
        {logistics.map(l => (
          <div key={l.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/8 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-mono text-xs text-amber-400">{l.id}</span>
                <StatusBadge status={l.status} />
              </div>
              <div className="text-sm text-white truncate">{l.route}</div>
              <div className="text-xs text-gray-500 mt-0.5">{l.material} · {l.tons}t</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-xs text-gray-500">ETA</div>
              <div className={`text-sm font-mono font-medium ${l.status === 'delayed' ? 'text-red-400' : l.status === 'delivered' ? 'text-green-400' : 'text-white'}`}>
                {l.eta}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </div>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {[
        { label: 'Upington Rail Yard',     status: 'Operational', capacity: '78%', loads: 4, color: 'text-green-400' },
        { label: 'Cape Town Export Port',  status: 'Operational', capacity: '65%', loads: 3, color: 'text-green-400' },
        { label: 'Walvis Bay Terminal',    status: 'Congested',   capacity: '94%', loads: 5, color: 'text-amber-400' },
      ].map(h => (
        <div key={h.label} className="mining-card rounded-xl p-4">
          <div className="text-xs text-gray-500 mb-1">Hub Status</div>
          <div className="text-sm text-white font-semibold mb-1">{h.label}</div>
          <div className={`text-xs font-medium mb-3 ${h.color}`}>{h.status}</div>
          <div className="mb-1.5">
            <div className="flex justify-between text-xs text-gray-500 mb-1"><span>Capacity</span><span>{h.capacity}</span></div>
            <HealthBar value={parseInt(h.capacity)} />
          </div>
          <div className="text-xs text-gray-500">{h.loads} active loads</div>
        </div>
      ))}
    </div>
  </div>
);

// ─── MAIN DASHBOARD ──────────────────────────────────────────────────────────

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);
  const [refreshStatus, setRefreshStatus] = useState('');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const tabs = [
    { id: 'overview',   name: 'Overview',   icon: BarChart3,  component: OverviewTab   },
    { id: 'extraction', name: 'Extraction', icon: Pickaxe,    component: ExtractionTab },
    { id: 'geology',    name: 'Geology',    icon: Mountain,   component: GeologyTab    },
    { id: 'equipment',  name: 'Equipment',  icon: Zap,        component: EquipmentTab  },
    { id: 'safety',     name: 'Safety',     icon: Shield,     component: SafetyTab     },
    { id: 'logistics',  name: 'Logistics',  icon: Truck,      component: LogisticsTab  },
    { id: 'system',     name: 'System',     icon: Settings },
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    setRefreshStatus('Checking API…');
    try {
      const r = await fetch(`${API_BASE_URL}/api/health`);
      setRefreshStatus(`API ${r.status} ${r.statusText}`);
    } catch {
      setRefreshStatus('API offline — using cached data');
    } finally {
      setRefreshing(false);
      setTimeout(() => setRefreshStatus(''), 4000);
    }
  };

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component;

  return (
    <div className="min-h-screen">
      {/* ── Header ── */}
      <header className="bg-black/40 backdrop-blur-sm border-b border-amber-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-11 h-11 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl">
                <Pickaxe className="w-5 h-5 text-black" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-wider text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.08em' }}>HATHOR</h1>
                <p className="text-amber-400/80 text-xs">Mining &amp; Resource Intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Live clock */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-xs font-mono text-gray-400">{time.toLocaleTimeString()}</span>
              </div>

              {refreshStatus && (
                <span className="text-xs text-gray-500 hidden md:block">{refreshStatus}</span>
              )}

              <button onClick={handleRefresh} disabled={refreshing}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-full hover:bg-blue-500/30 disabled:opacity-50 text-xs transition-colors">
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                {refreshing ? 'Checking…' : 'Refresh'}
              </button>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-full border border-green-500/30">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-medium">Live</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Nav tabs ── */}
      <nav className="bg-black/20 backdrop-blur-sm border-b border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium text-sm whitespace-nowrap transition-all ${active ? 'border-amber-400 text-amber-400' : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600'}`}>
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {ActiveComponent ? <ActiveComponent /> : (
          <div className="mining-card rounded-xl p-8 text-center">
            <Settings className="w-12 h-12 text-amber-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-1">System Administration</h3>
            <p className="text-gray-400 text-sm">Connect SystemStatusDashboard, ResourceManagementInterface, ConfigurationManagementUI, AlertEventViewer and PerformanceMetricsDisplay components here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
