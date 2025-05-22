import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { EnergyConsumption } from "@/types";

interface ApplianceBreakdownProps {
  consumptionData: EnergyConsumption[];
}

const getEfficiencyColor = (percentage: number): string => {
  if (percentage >= 40) return "bg-red-400";
  if (percentage >= 25) return "bg-amber-400";
  return "bg-emerald-400";
};

const getTextColor = (percentage: number): string => {
  if (percentage >= 40) return "text-red-400";
  if (percentage >= 25) return "text-amber-400";
  return "text-emerald-400";
};

const ApplianceBreakdown: React.FC<ApplianceBreakdownProps> = ({ consumptionData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appliance Breakdown</CardTitle>
        <CardDescription>
          Energy consumption by appliance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="percentage">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="percentage">Percentage</TabsTrigger>
            <TabsTrigger value="kwh">kWh</TabsTrigger>
          </TabsList>
          
          <TabsContent value="percentage" className="space-y-4">
            {consumptionData.map(item => (
              <TooltipProvider key={item.applianceId}>
                <Tooltip>
                  <TooltipTrigger className="w-full">
                    <div className="space-y-1 w-full">
                      <div className="flex justify-between text-sm">
                        <span>{item.applianceName}</span>
                        <span className={`font-medium ${getTextColor(item.percentage)}`}>
                          {item.percentage.toFixed(1)}%
                        </span>
                      </div>
                      <Progress 
                        value={item.percentage} 
                        className={getEfficiencyColor(item.percentage)}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Uses {item.kWh.toFixed(1)} kWh per month</p>
                    {item.percentage >= 40 && (
                      <p className="text-red-400">High energy usage!</p>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </TabsContent>
          
          <TabsContent value="kwh" className="space-y-4">
            {consumptionData.map(item => {
              const percentage = (item.kWh / Math.max(...consumptionData.map(d => d.kWh))) * 100;
              return (
                <TooltipProvider key={item.applianceId}>
                  <Tooltip>
                    <TooltipTrigger className="w-full">
                      <div className="space-y-1 w-full">
                        <div className="flex justify-between text-sm">
                          <span>{item.applianceName}</span>
                          <span className={`font-medium ${getTextColor(item.percentage)}`}>
                            {item.kWh.toFixed(1)} kWh
                          </span>
                        </div>
                        <Progress 
                          value={percentage} 
                          className={getEfficiencyColor(item.percentage)}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.percentage.toFixed(1)}% of total consumption</p>
                      {item.percentage >= 40 && (
                        <p className="text-red-400">Consider energy-efficient alternatives</p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ApplianceBreakdown;
