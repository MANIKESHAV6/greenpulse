import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart2 } from 'lucide-react';
import { PerformanceMetrics } from '@/types/profile';
import { motion } from 'framer-motion';

interface PerformanceCardProps {
  metrics: PerformanceMetrics;
}

const getScoreColor = (score: number): string => {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-yellow-500';
  if (score >= 40) return 'bg-orange-500';
  return 'bg-red-500';
};

export const PerformanceCard: React.FC<PerformanceCardProps> = ({ metrics }) => {
  const metricsData = [
    { label: 'Overall Score', value: metrics.overallScore },
    { label: 'Energy Efficiency', value: metrics.energyEfficiency },
    { label: 'Water Conservation', value: metrics.waterConservation },
    { label: 'Waste Reduction', value: metrics.wasteReduction },
    { label: 'Community Impact', value: metrics.communityImpact },
    { label: 'Sustainable Choices', value: metrics.sustainableChoices },
  ];

  return (
    <Card className="bg-card dark:bg-card-dark">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-blue-500" />
          Performance Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {metricsData.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{metric.label}</span>
              <span className="text-sm text-muted-foreground">{metric.value}/100</span>
            </div>
            <Progress 
              value={metric.value} 
              className={`h-2 ${getScoreColor(metric.value)}`}
            />
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}; 