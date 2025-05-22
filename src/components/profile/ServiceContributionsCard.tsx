import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Recycle, BookOpen, PiggyBank } from 'lucide-react';
import { ServiceContribution } from '@/types/profile';
import { motion } from 'framer-motion';

interface ServiceContributionsCardProps {
  contributions: ServiceContribution[];
}

const iconMap: { [key: string]: React.ReactNode } = {
  donation: <PiggyBank className="w-5 h-5 text-green-500" />,
  volunteering: <Heart className="w-5 h-5 text-red-500" />,
  recycling: <Recycle className="w-5 h-5 text-blue-500" />,
  education: <BookOpen className="w-5 h-5 text-yellow-500" />,
};

export const ServiceContributionsCard: React.FC<ServiceContributionsCardProps> = ({ contributions }) => {
  const totalCarbonOffset = contributions.reduce((total, contribution) => total + contribution.carbonOffset, 0);
  const totalImpact = contributions.reduce((total, contribution) => total + contribution.impact, 0);

  return (
    <Card className="bg-card dark:bg-card-dark">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          Service Contributions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-background dark:bg-background-dark rounded-lg"
            >
              <h4 className="text-sm font-medium mb-2">Total Impact</h4>
              <p className="text-2xl font-bold text-primary">
                {totalImpact.toFixed(1)} hrs
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-background dark:bg-background-dark rounded-lg"
            >
              <h4 className="text-sm font-medium mb-2">Carbon Offset</h4>
              <p className="text-2xl font-bold text-green-500">
                {totalCarbonOffset.toFixed(1)} kg
              </p>
            </motion.div>
          </div>

          <div className="space-y-4">
            {contributions.map((contribution, index) => (
              <motion.div
                key={contribution.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-background dark:bg-background-dark rounded-lg"
              >
                <div className="flex-shrink-0">
                  {iconMap[contribution.type]}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{contribution.type.charAt(0).toUpperCase() + contribution.type.slice(1)}</h3>
                      <p className="text-sm text-muted-foreground">{contribution.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-green-500">
                        {contribution.carbonOffset} kg CO₂
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {new Date(contribution.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 