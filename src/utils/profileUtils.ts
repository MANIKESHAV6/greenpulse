import { EnhancedUserProfile } from "@/types/profile";

export const createDefaultUserProfile = (user: { id: string; name: string; email: string; createdAt?: string }): EnhancedUserProfile => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    joinedAt: new Date(user.createdAt || new Date()),
    achievements: [],
    performanceMetrics: {
      overallScore: 0,
      energyEfficiency: 0,
      waterConservation: 0,
      wasteReduction: 0,
      communityImpact: 0,
      sustainableChoices: 0
    },
    serviceContributions: [],
    caringScore: 0,
    goals: [],
    carbonFootprint: {
      total: 0,
      categories: {
        energy: 0,
        transport: 0,
        waste: 0,
        water: 0
      },
      history: [
        { date: new Date(), value: 0 }
      ]
    },
    suggestedActions: [
      {
        id: "default-1",
        title: "Complete Your Profile",
        description: "Start your sustainability journey by setting up your first goal",
        impact: 0,
        difficulty: "easy",
        timeRequired: "5 minutes",
        category: "lifestyle"
      },
      {
        id: "default-2",
        title: "Upload Your First Bill",
        description: "Track your energy consumption by uploading your utility bill",
        impact: 0,
        difficulty: "easy",
        timeRequired: "10 minutes",
        category: "energy"
      }
    ],
    totalCarbonOffset: 0,
    impactRank: 0,
    sustainabilityLevel: "Beginner"
  };
};

interface BillData {
  id: string;
  month: string;
  year: number;
  amount: number;
  unitsConsumed: number;
  uploadDate: Date;
}

export const updateProfileWithBillData = (
  currentProfile: EnhancedUserProfile,
  billData: BillData,
  averageConsumption: number = 300 // Average monthly consumption in kWh
): EnhancedUserProfile => {
  const updatedProfile = { ...currentProfile };
  const now = new Date();

  // Update carbon footprint
  const carbonPerKwh = 0.85; // Average CO2 emissions per kWh in kg
  const carbonEmissions = billData.unitsConsumed * carbonPerKwh;

  // Update history
  updatedProfile.carbonFootprint.history.push({
    date: now,
    value: carbonEmissions
  });

  // Update categories
  updatedProfile.carbonFootprint.categories.energy = carbonEmissions;
  updatedProfile.carbonFootprint.total = Object.values(updatedProfile.carbonFootprint.categories)
    .reduce((sum, val) => sum + val, 0);

  // Update performance metrics
  const efficiencyScore = Math.max(0, Math.min(100, 
    100 - ((billData.unitsConsumed - averageConsumption) / averageConsumption) * 100
  ));
  updatedProfile.performanceMetrics.energyEfficiency = Math.round(efficiencyScore);
  
  // Update overall score
  updatedProfile.performanceMetrics.overallScore = Math.round(
    Object.values(updatedProfile.performanceMetrics)
      .reduce((sum, val) => sum + val, 0) / 6
  );

  // Add or update energy consumption goal
  const existingGoalIndex = updatedProfile.goals.findIndex(g => g.category === 'energy');
  const newGoal = {
    id: existingGoalIndex >= 0 ? updatedProfile.goals[existingGoalIndex].id : `goal-${Date.now()}`,
    title: "Reduce Energy Usage",
    description: "Lower monthly consumption",
    target: Math.round(averageConsumption * 0.9), // Target 10% below average
    current: billData.unitsConsumed,
    unit: "kWh",
    deadline: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
    category: 'energy' as const,
    status: billData.unitsConsumed <= averageConsumption ? 'completed' as const : 'in_progress' as const
  };

  if (existingGoalIndex >= 0) {
    updatedProfile.goals[existingGoalIndex] = newGoal;
  } else {
    updatedProfile.goals.push(newGoal);
  }

  // Add achievement if first bill or if consumption is low
  if (updatedProfile.carbonFootprint.history.length === 1) {
    updatedProfile.achievements.push({
      id: `achievement-${Date.now()}`,
      title: "First Bill Upload",
      description: "Started tracking your energy consumption",
      icon: "zap",
      progress: 100,
      unlockedAt: now
    });
  } else if (billData.unitsConsumed <= averageConsumption) {
    updatedProfile.achievements.push({
      id: `achievement-${Date.now()}`,
      title: "Energy Efficient",
      description: "Kept energy consumption below average",
      icon: "leaf",
      progress: 100,
      unlockedAt: now
    });
  }

  // Update sustainability level based on performance
  if (updatedProfile.performanceMetrics.overallScore >= 80) {
    updatedProfile.sustainabilityLevel = "Expert";
  } else if (updatedProfile.performanceMetrics.overallScore >= 60) {
    updatedProfile.sustainabilityLevel = "Advanced";
  } else if (updatedProfile.performanceMetrics.overallScore >= 40) {
    updatedProfile.sustainabilityLevel = "Intermediate";
  }

  return updatedProfile;
}; 