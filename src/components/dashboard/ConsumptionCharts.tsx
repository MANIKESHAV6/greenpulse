
import React from "react";
import EnergyChart from "@/components/EnergyChart";
import ApplianceBreakdown from "./ApplianceTips";
import { EnergyConsumption } from "@/types";

interface ConsumptionChartsProps {
  consumptionData: EnergyConsumption[];
}

const ConsumptionCharts: React.FC<ConsumptionChartsProps> = ({ consumptionData }) => {
  return (
    <div className="grid gap-6 mb-8 md:grid-cols-2">
      <EnergyChart data={consumptionData} />
      <ApplianceBreakdown consumptionData={consumptionData} />
    </div>
  );
};

export default ConsumptionCharts;
