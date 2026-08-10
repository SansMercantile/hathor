export interface GeologicalLayer {
  id: string;
  name: string;
  depthStart: number;
  depthEnd: number;
  composition: string;
  hazardRisk: 'Low' | 'Medium' | 'High' | 'Critical';
  minerals: { name: string; estimateGrade: string; value: number }[];
}

export interface DrillSite {
  id: string;
  name: string;
  coordinates: string;
  status: 'active' | 'standby' | 'alert' | 'offline';
  currentDepth: number;
  targetDepth: number;
  pressure: number; // psi
  temperature: number; // °C
}

export interface HazardSensor {
  id: string;
  name: string;
  location: string;
  type: 'Gas (CH4)' | 'Seismic' | 'Ground Stability' | 'Water Level';
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
}

export interface ConstellationSystem {
  id: string;
  name: string;
  fullName: string;
  sector: string;
  status: 'Synced' | 'Degraded' | 'Offline';
  latency: number;
  description: string;
  lastEvent?: string;
}

export interface OptimizationResult {
  schedule: {
    phase: string;
    details: string;
    duration: string;
    dangerLevel: string;
  }[];
  esgImpact: {
    score: number;
    carbonSavings: string;
    waterRecycle: string;
  };
  recommendations: string[];
}
