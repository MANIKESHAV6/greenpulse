import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { BillData } from "@/types";
import { ChevronDown } from "lucide-react";

interface ComparisonChartProps {
  billData: BillData | null;
  historicalData: {
    month: string;
    year: number;
    unitsConsumed: number;
    amount: number;
  }[];
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const ComparisonChart: React.FC<ComparisonChartProps> = ({ billData, historicalData }) => {
  const [compareMonth, setCompareMonth] = useState<string>("");
  
  // Prepare current month data
  const currentData = billData ? {
    month: billData.month,
    year: billData.year,
    unitsConsumed: billData.unitsConsumed,
    amount: billData.amount,
  } : null;
  
  // Find the selected month's data
  const selectedMonthData = historicalData.find(
    (data) => `${data.month} ${data.year}` === compareMonth
  );
  
  // Prepare comparison data for the chart
  const comparisonData = currentData ? [
    {
      name: `${currentData.month} ${currentData.year}`,
      unitsConsumed: currentData.unitsConsumed,
      amount: currentData.amount,
      current: true,
    },
    ...(selectedMonthData ? [{
      name: `${selectedMonthData.month} ${selectedMonthData.year}`,
      unitsConsumed: selectedMonthData.unitsConsumed,
      amount: selectedMonthData.amount,
      current: false,
    }] : []),
  ] : [];
  
  // Calculate percentage difference if both current and comparison data exist
  let percentageDifference = null;
  if (currentData && selectedMonthData) {
    const diff = currentData.unitsConsumed - selectedMonthData.unitsConsumed;
    percentageDifference = (diff / selectedMonthData.unitsConsumed) * 100;
  }

  // Color configuration
  const currentColor = "#22d3ee"; // cyan-400
  const compareColor = "#a78bfa"; // violet-400

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Monthly Comparison</CardTitle>
            <CardDescription>Compare energy usage with previous months</CardDescription>
          </div>
          <Select value={compareMonth} onValueChange={setCompareMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {historicalData.map((data) => (
                <SelectItem 
                  key={`${data.month}-${data.year}`} 
                  value={`${data.month} ${data.year}`}
                >
                  {`${data.month} ${data.year}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {comparisonData.length > 1 ? (
          <div>
            <div className="mb-4 p-3 rounded-md bg-muted flex items-center justify-between">
              <span>
                {percentageDifference !== null && (
                  <span className={`font-medium ${percentageDifference > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {percentageDifference > 0 ? '↑' : '↓'} {Math.abs(percentageDifference).toFixed(1)}% 
                    {' '}{percentageDifference > 0 ? 'increase' : 'decrease'} from {selectedMonthData?.month}
                  </span>
                )}
              </span>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--foreground))"
                    tick={{ fill: 'hsl(var(--foreground))' }}
                  />
                  <YAxis 
                    yAxisId="left" 
                    orientation="left" 
                    stroke={currentColor}
                    tick={{ fill: 'hsl(var(--foreground))' }}
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke={compareColor}
                    tick={{ fill: 'hsl(var(--foreground))' }}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === "unitsConsumed" ? `${value.toFixed(1)} kWh` : `₹${value.toFixed(2)}`,
                      name === "unitsConsumed" ? "Energy Usage" : "Cost"
                    ]}
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Legend 
                    formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
                  />
                  <Bar yAxisId="left" name="Energy Usage (kWh)" dataKey="unitsConsumed" fill={currentColor}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.current ? currentColor : compareColor} />
                    ))}
                  </Bar>
                  <Bar yAxisId="right" name="Cost (₹)" dataKey="amount" fill={currentColor}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.current ? currentColor : compareColor} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center text-muted-foreground">
            Select a month to compare with {currentData?.month} {currentData?.year}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComparisonChart;
