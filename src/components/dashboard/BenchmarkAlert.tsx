
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";

interface BenchmarkAlertProps {
  benchmarkPercentage: number | null;
}

const BenchmarkAlert: React.FC<BenchmarkAlertProps> = ({ benchmarkPercentage }) => {
  if (!benchmarkPercentage) return null;
  
  return (
    <Card className="mb-6 bg-amber-50 border-amber-200">
      <CardContent className="py-4 flex items-center gap-3">
        <TrendingDown className="h-6 w-6 text-amber-600" />
        <p className="text-amber-800 font-medium">
          Your household uses <span className="font-bold">{benchmarkPercentage}% more energy</span> than similar homes in your area
        </p>
      </CardContent>
    </Card>
  );
};

export default BenchmarkAlert;
