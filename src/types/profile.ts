export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  unlockedAt?: Date;
}

export interface ServiceContribution {
  id: string;
  type: 'donation' | 'volunteering' | 'recycling' | 'education';
  description: string;
  date: Date;
  impact: number; // Quantified impact (e.g., hours volunteered, kgs recycled)
  carbonOffset: number; // CO2 offset in kg
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: Date;
  category: 'energy' | 'water' | 'waste' | 'transport' | 'other';
  status: 'in_progress' | 'completed' | 'failed';
}

export interface CarbonFootprint {
  total: number; // Total CO2 in kg
  categories: {
    energy: number;
    transport: number;
    waste: number;
    water: number;
  };
  history: Array<{
    date: Date;
    value: number;
  }>;
}

export interface PerformanceMetrics {
  overallScore: number; // 0-100
  energyEfficiency: number; // 0-100
  waterConservation: number; // 0-100
  wasteReduction: number; // 0-100
  communityImpact: number; // 0-100
  sustainableChoices: number; // 0-100
}

export interface EcoAction {
  id: string;
  title: string;
  description: string;
  impact: number; // Estimated CO2 reduction in kg
  difficulty: 'easy' | 'medium' | 'hard';
  timeRequired: string;
  category: 'energy' | 'water' | 'waste' | 'transport' | 'lifestyle';
}

export interface EnhancedUserProfile {
  id: string;
  name: string;
  email: string;
  joinedAt: Date;
  achievements: Achievement[];
  performanceMetrics: PerformanceMetrics;
  serviceContributions: ServiceContribution[];
  caringScore: number; // 0-100
  goals: Goal[];
  carbonFootprint: CarbonFootprint;
  suggestedActions: EcoAction[];
  totalCarbonOffset: number;
  impactRank: number; // Rank among all users
  sustainabilityLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Master';
} 