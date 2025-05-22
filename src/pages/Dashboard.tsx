import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { BillData, Appliance, EnergyConsumption, ApplianceTip, TipItem } from "@/types";
import { calculateConsumptionData } from "@/utils/energyCalculations";
import { generateApplianceTips } from "@/utils/applianceTips";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Dashboard components
import SummaryCards from "@/components/dashboard/SummaryCards";
import BenchmarkAlert from "@/components/dashboard/BenchmarkAlert";
import BenchmarkComparisonCard from "@/components/dashboard/BenchmarkComparisonCard";
import ConsumptionCharts from "@/components/dashboard/ConsumptionCharts";
import QuickWins from "@/components/dashboard/QuickWins";
import TopConsumerCard from "@/components/dashboard/TopConsumerCard";
import SavingsTable from "@/components/dashboard/SavingsTable";
import ComparisonChart from "@/components/dashboard/ComparisonChart";

const Dashboard = () => {
  const [billData, setBillData] = useState<BillData | null>(null);
  const [appliances, setAppliances] = useState<Appliance[]>([]);
  const [consumptionData, setConsumptionData] = useState<EnergyConsumption[]>([]);
  const [totalConsumption, setTotalConsumption] = useState(0);
  const [averageDailyUsage, setAverageDailyUsage] = useState(0);
  const [estimatedMonthlyCost, setEstimatedMonthlyCost] = useState(0);
  const [quickWinTips, setQuickWinTips] = useState<TipItem[]>([]);
  const [applianceTips, setApplianceTips] = useState<ApplianceTip[]>([]);
  const [benchmarkPercentage, setBenchmarkPercentage] = useState<number | null>(null);
  const [localAverageUsage, setLocalAverageUsage] = useState(250); // Average for 1-bed home
  const [historicalData, setHistoricalData] = useState<Array<{
    month: string;
    year: number;
    unitsConsumed: number;
    amount: number;
  }>>([]);

  useEffect(() => {
    // Load data from localStorage
    const storedBillData = localStorage.getItem("billData");
    const storedAppliances = localStorage.getItem("selectedAppliances");
    
    if (storedBillData) {
      setBillData(JSON.parse(storedBillData));
    }
    
    if (storedAppliances) {
      setAppliances(JSON.parse(storedAppliances));
    }

    // Mock historical data for comparison feature
    setHistoricalData([
      { month: "January", year: 2025, unitsConsumed: 325, amount: 52.0 },
      { month: "February", year: 2025, unitsConsumed: 290, amount: 46.4 },
      { month: "March", year: 2025, unitsConsumed: 310, amount: 49.6 },
      { month: "April", year: 2025, unitsConsumed: 280, amount: 44.8 },
    ]);
  }, []);

  useEffect(() => {
    if (billData && appliances.length > 0) {
      // Calculate all consumption metrics
      const { 
        consumptionData: calculatedData, 
        totalConsumption: calculatedTotal,
        averageDailyUsage: calculatedDaily,
        estimatedMonthlyCost: calculatedCost
      } = calculateConsumptionData(appliances, billData);
      
      setConsumptionData(calculatedData);
      setTotalConsumption(calculatedTotal);
      setAverageDailyUsage(calculatedDaily);
      setEstimatedMonthlyCost(calculatedCost);
      
      // Generate appliance-specific tips
      const { tips, quickWins } = generateApplianceTips(calculatedData);
      setApplianceTips(tips);
      setQuickWinTips(quickWins);
      
      // Calculate benchmark percentage
      const percentageDiff = ((calculatedTotal - localAverageUsage) / localAverageUsage) * 100;
      setBenchmarkPercentage(percentageDiff);
    }
  }, [billData, appliances, localAverageUsage]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8 text-foreground">Energy Dashboard</h1>
        
        <div className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="col-span-3">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-card-foreground">Total Monthly Consumption</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-card-foreground">{totalConsumption.toFixed(1)} kWh</div>
                    <p className="text-xs text-muted-foreground">Based on your selected appliances</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-card-foreground">Average Daily Usage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-card-foreground">{averageDailyUsage.toFixed(1)} kWh</div>
                    <p className="text-xs text-muted-foreground">Average consumption per day</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-card-foreground">Estimated Monthly Cost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-card-foreground">₹{estimatedMonthlyCost.toFixed(0)}</div>
                    <p className="text-xs text-muted-foreground">Based on your current rate</p>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-card-foreground">Bill Period</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-card-foreground">{billData?.month} {billData?.year}</div>
                    <p className="text-xs text-muted-foreground">Most recent bill data</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="col-span-1">
              <BenchmarkComparisonCard
                yourUsage={totalConsumption}
                localAverage={localAverageUsage}
              />
            </div>
          </div>

          {benchmarkPercentage && benchmarkPercentage > 0 && (
            <BenchmarkAlert benchmarkPercentage={benchmarkPercentage} />
          )}
          
          <ComparisonChart billData={billData} historicalData={historicalData} />
          
          <ConsumptionCharts consumptionData={consumptionData} />
          
          <QuickWins quickWinTips={quickWinTips} />
          
          <TopConsumerCard 
            consumptionData={consumptionData} 
            applianceTips={applianceTips} 
          />
          
          <SavingsTable applianceTips={applianceTips} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
