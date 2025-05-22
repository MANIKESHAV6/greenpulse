import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface BenchmarkComparisonCardProps {
  yourUsage: number;
  localAverage: number;
}

const BenchmarkComparisonCard: React.FC<BenchmarkComparisonCardProps> = ({
  yourUsage,
  localAverage,
}) => {
  const percentageDiff = ((yourUsage - localAverage) / localAverage) * 100;
  const isEfficient = yourUsage <= localAverage;
  
  return (
    <Card className={`bg-card/50 backdrop-blur-sm border ${isEfficient ? 'border-emerald-400/20' : 'border-red-400/20'}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-card-foreground flex items-center gap-2">
          Usage Comparison
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Comparison with average 1-bedroom home in your area</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-card-foreground">Your Usage:</span>
            <span className="font-bold text-card-foreground">{yourUsage.toFixed(1)} kWh</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-card-foreground">Local Average:</span>
            <span className="font-medium text-card-foreground">{localAverage.toFixed(1)} kWh</span>
          </div>
          <div className={`text-sm font-medium ${isEfficient ? 'text-emerald-400' : 'text-red-400'}`}>
            You're using {Math.abs(percentageDiff).toFixed(1)}% {isEfficient ? 'less' : 'more'} than average
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BenchmarkComparisonCard; 