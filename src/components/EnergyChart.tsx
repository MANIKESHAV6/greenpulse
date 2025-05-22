import React from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnergyConsumption } from "@/types";

interface EnergyChartProps {
  data: EnergyConsumption[];
}

const COLORS = [
  '#22d3ee', // cyan-400
  '#34d399', // emerald-400
  '#fbbf24', // amber-400
  '#f87171', // red-400
  '#a78bfa', // violet-400
  '#f472b6', // pink-400
  '#2dd4bf', // teal-400
  '#fb923c', // orange-400
  '#818cf8', // indigo-400
  '#e879f9', // fuchsia-400
  '#94a3b8', // slate-400
  '#67e8f9', // cyan-300
];

const EnergyChart: React.FC<EnergyChartProps> = ({ data }) => {
  const formatKWh = (value: number) => `${value.toFixed(1)} kWh`;
  const formatPercent = (value: number) => `${value.toFixed(1)}%`;
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Energy Consumption Breakdown</CardTitle>
        <CardDescription>
          See which appliances consume the most energy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pie">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="pie">Pie Chart</TabsTrigger>
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pie" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="kWh"
                  nameKey="applianceName"
                  label={({ name, percent }) => `${name}: ${formatPercent(percent * 100)}`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => formatKWh(value)}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend 
                  formatter={(value) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="bar" className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="applianceName" 
                  stroke="hsl(var(--foreground))"
                  tick={{ fill: 'hsl(var(--foreground))' }}
                />
                <YAxis 
                  tickFormatter={formatKWh}
                  stroke="hsl(var(--foreground))"
                  tick={{ fill: 'hsl(var(--foreground))' }}
                />
                <Tooltip 
                  formatter={(value: number) => formatKWh(value)}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))' }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="kWh" name="Energy Consumption">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnergyChart;
