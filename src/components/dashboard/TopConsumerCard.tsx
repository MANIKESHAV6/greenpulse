import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, Fan, Lightbulb, AlertTriangle } from "lucide-react";
import { ApplianceTip, EnergyConsumption } from "@/types";

interface TopConsumerCardProps {
  consumptionData: EnergyConsumption[];
  applianceTips: ApplianceTip[];
}

const TopConsumerCard: React.FC<TopConsumerCardProps> = ({ consumptionData, applianceTips }) => {
  if (consumptionData.length === 0 || consumptionData[0].percentage <= 30) {
    return null;
  }
  
  const topConsumer = consumptionData[0];
  const tipsForTopConsumer = applianceTips.find(a => a.applianceName === topConsumer.applianceName);
  
  return (
    <Card className="mb-8 bg-red-50 border-red-200">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-red-700">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          High Energy Consumer: {topConsumer.applianceName}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-4">
          <p className="text-red-700 mb-2">
            Your {topConsumer.applianceName.toLowerCase()} consumes <span className="font-bold">{topConsumer.percentage.toFixed(1)}%</span> of your total energy.
          </p>
          <div className="text-sm text-red-600">
            Monthly Usage: <span className="font-bold">{topConsumer.kWh.toFixed(1)} kWh</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="font-medium text-gray-800 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            Energy Saving Tips:
          </div>
          
          {tipsForTopConsumer?.tips.map((tip, index) => (
            <div key={index} className="p-4 bg-white rounded-lg border border-red-100 space-y-2">
              <p className="font-medium text-gray-800">
                {tip.tip.split('.')[1]?.trim()}
              </p>
              {tip.savingsPercentage && tip.moneySaved && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <ArrowDown className="h-4 w-4" />
                    <span>Potential Savings: ₹{tip.moneySaved.toFixed(2)}/month</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {tip.savingsPercentage}% reduction in energy use
                  </div>
                  {tip.paybackPeriod > 0 && (
                    <div className="text-sm text-gray-500">
                      Investment payback period: {tip.paybackPeriod} months
                    </div>
                  )}
                </div>
              )}
              {tip.implementationCost > 0 && (
                <div className="text-sm text-gray-600 mt-1">
                  Estimated implementation cost: ₹{tip.implementationCost}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopConsumerCard;
