
import { Appliance, EnergyConsumption, BillData } from "@/types";

export const calculateConsumptionData = (appliances: Appliance[], billData: BillData | null) => {
  if (!appliances.length) {
    return { consumptionData: [], totalConsumption: 0, averageDailyUsage: 0, estimatedMonthlyCost: 0 };
  }
  
  // Calculate consumption data for each appliance
  const calculatedConsumption: EnergyConsumption[] = [];
  let totalKWh = 0;
  
  appliances.forEach(appliance => {
    // Formula: Wattage (W) * Hours per day * Days in month * Quantity / 1000 = kWh
    const daysInMonth = 30; // Approximation
    const kWh = (appliance.wattage * appliance.hoursPerDay * daysInMonth * appliance.quantity) / 1000;
    totalKWh += kWh;
    
    calculatedConsumption.push({
      applianceId: appliance.id,
      applianceName: appliance.name,
      kWh: kWh,
      percentage: 0, // Will be calculated after we know the total
    });
  });
  
  // Calculate percentages
  const dataWithPercentages = calculatedConsumption.map(item => ({
    ...item,
    percentage: (item.kWh / totalKWh) * 100
  }));
  
  // Sort by highest consumption first
  const sortedData = dataWithPercentages.sort((a, b) => b.kWh - a.kWh);
  
  // Calculate other metrics
  const averageDailyUsage = totalKWh / 30;
  
  let estimatedMonthlyCost = 0;
  if (billData?.unitsConsumed && billData?.amount) {
    const costPerKWh = billData.amount / billData.unitsConsumed;
    estimatedMonthlyCost = totalKWh * costPerKWh;
  }
  
  return { 
    consumptionData: sortedData, 
    totalConsumption: totalKWh, 
    averageDailyUsage, 
    estimatedMonthlyCost 
  };
};
