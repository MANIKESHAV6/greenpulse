import { ApplianceTip, TipItem } from "@/types";

// Database of tips by appliance type
export const tipsByApplianceType: Record<string, TipItem[]> = {
  "Fan": [
    { 
      tip: "Switch to a DC motor fan (saves ~60% power)",
      savingsPercentage: 60,
      moneySaved: 0.60,
      paybackPeriod: 8,
      isQuickWin: false
    },
    {
      tip: "Use ceiling fans only in occupied rooms",
      savingsPercentage: 20,
      moneySaved: 0.25,
      paybackPeriod: 0,
      isQuickWin: true
    }
  ],
  "Air Conditioner": [
    {
      tip: "Set your thermostat 1-2 degrees higher to save up to 10% on cooling costs",
      savingsPercentage: 10,
      moneySaved: 1.20,
      paybackPeriod: 0,
      isQuickWin: true
    },
    {
      tip: "Clean or replace filters monthly for optimal efficiency",
      savingsPercentage: 5,
      moneySaved: 0.60,
      paybackPeriod: 1,
      isQuickWin: true
    }
  ],
  "Television": [
    {
      tip: "Use the energy-saving mode and turn it off completely when not in use",
      savingsPercentage: 15,
      moneySaved: 0.20,
      paybackPeriod: 0,
      isQuickWin: true
    },
    {
      tip: "Consider upgrading to an ENERGY STAR rated TV for your next purchase",
      savingsPercentage: 25,
      moneySaved: 0.35,
      paybackPeriod: 24,
      isQuickWin: false
    }
  ],
  "Refrigerator": [
    {
      tip: "Ensure door seals are tight and keep temperature between 37-40°F",
      savingsPercentage: 8,
      moneySaved: 0.40,
      paybackPeriod: 0,
      isQuickWin: true
    },
    {
      tip: "Keep the coils clean to improve efficiency",
      savingsPercentage: 6,
      moneySaved: 0.30,
      paybackPeriod: 0,
      isQuickWin: true
    }
  ],
  "Washing Machine": [
    {
      tip: "Wash full loads and use cold water when possible",
      savingsPercentage: 12,
      moneySaved: 0.45,
      paybackPeriod: 0,
      isQuickWin: true
    }
  ],
  "LED Lights": [
    {
      tip: "Replace any remaining non-LED bulbs to save even more energy",
      savingsPercentage: 75,
      moneySaved: 0.25,
      paybackPeriod: 3,
      isQuickWin: true
    }
  ],
  "Microwave Oven": [
    {
      tip: "Use it instead of the conventional oven when possible as it uses less energy",
      savingsPercentage: 30,
      moneySaved: 0.15,
      paybackPeriod: 0,
      isQuickWin: true
    }
  ]
};

// Generate appliance-specific tips based on consumption data
export const generateApplianceTips = (sortedConsumptionData: { applianceName: string; percentage: number }[]) => {
  const tips: ApplianceTip[] = [];
  const allQuickWins: TipItem[] = [];
  
  sortedConsumptionData.forEach(item => {
    const applianceTipData = tipsByApplianceType[item.applianceName];
    
    if (applianceTipData) {
      // Enhance tips with consumption percentage
      const enhancedTips = applianceTipData.map(tip => {
        // Scale money saved based on the percentage of total energy this appliance uses
        const scaledMoneySaved = tip.moneySaved * (item.percentage / 100) * 2; // Scaling factor for more realistic numbers
        
        return {
          ...tip,
          tip: `${item.applianceName} uses ${item.percentage.toFixed(1)}% of your energy. ${tip.tip}.`,
          moneySaved: scaledMoneySaved
        };
      });
      
      tips.push({
        applianceName: item.applianceName,
        tips: enhancedTips
      });
      
      // Add quick wins to separate collection
      const quickWins = applianceTipData.filter(tip => tip.isQuickWin).map(tip => ({
        ...tip,
        tip: `${tip.tip} (saves ₹${tip.moneySaved.toFixed(2)}/month)`
      }));
      
      allQuickWins.push(...quickWins);
    }
  });
  
  return { tips, quickWins: allQuickWins };
};
