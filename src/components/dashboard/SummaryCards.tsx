import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BillData } from "@/types";
import { convertToINR, formatINR } from "@/utils/currencyUtils";

interface SummaryCardsProps {
  totalConsumption: number;
  averageDailyUsage: number;
  estimatedMonthlyCost: number;
  billData: BillData | null;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalConsumption,
  averageDailyUsage,
  estimatedMonthlyCost,
  billData,
}) => {
  const costInINR = convertToINR(estimatedMonthlyCost);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Monthly Consumption</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="text-2xl font-bold tracking-tight">
            {totalConsumption.toFixed(1)} kWh
          </div>
          <p className="text-xs text-muted-foreground">
            Based on your selected appliances
          </p>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Daily Usage</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="text-2xl font-bold tracking-tight">
            {averageDailyUsage.toFixed(1)} kWh
          </div>
          <p className="text-xs text-muted-foreground">
            Average consumption per day
          </p>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Estimated Monthly Cost</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="text-2xl font-bold tracking-tight">
            {formatINR(costInINR)}
          </div>
          <p className="text-xs text-muted-foreground">
            Based on your current rate
          </p>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bill Period</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="text-2xl font-bold tracking-tight">
            {billData?.month} {billData?.year}
          </div>
          <p className="text-xs text-muted-foreground">
            Most recent bill data
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
