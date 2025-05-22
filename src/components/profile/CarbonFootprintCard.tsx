import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Droplets, Truck, Trash2 } from 'lucide-react';
import { CarbonFootprint } from '@/types/profile';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface CarbonFootprintCardProps {
  carbonFootprint: CarbonFootprint;
}

const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

export const CarbonFootprintCard: React.FC<CarbonFootprintCardProps> = ({ carbonFootprint }) => {
  const data = [
    { name: 'Energy', value: carbonFootprint.categories.energy, icon: <Cloud className="w-4 h-4" /> },
    { name: 'Transport', value: carbonFootprint.categories.transport, icon: <Truck className="w-4 h-4" /> },
    { name: 'Water', value: carbonFootprint.categories.water, icon: <Droplets className="w-4 h-4" /> },
    { name: 'Waste', value: carbonFootprint.categories.waste, icon: <Trash2 className="w-4 h-4" /> },
  ];

  return (
    <Card className="bg-card dark:bg-card-dark">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="w-5 h-5 text-green-500" />
          Carbon Footprint
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${value.toFixed(1)} kg CO₂`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-background dark:bg-background-dark rounded-lg"
            >
              <h4 className="text-sm font-medium mb-2">Total Footprint</h4>
              <p className="text-2xl font-bold text-green-500">
                {carbonFootprint.total.toFixed(1)} kg CO₂
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-background dark:bg-background-dark rounded-lg"
            >
              <h4 className="text-sm font-medium mb-2">Monthly Change</h4>
              {carbonFootprint.history.length >= 2 && (
                <p className={`text-2xl font-bold ${
                  carbonFootprint.history[carbonFootprint.history.length - 1].value <
                  carbonFootprint.history[carbonFootprint.history.length - 2].value
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}>
                  {((carbonFootprint.history[carbonFootprint.history.length - 1].value -
                    carbonFootprint.history[carbonFootprint.history.length - 2].value) /
                    carbonFootprint.history[carbonFootprint.history.length - 2].value * 100).toFixed(1)}%
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 