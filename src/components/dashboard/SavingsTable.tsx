import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ApplianceTip } from "@/types";

interface SavingsTableProps {
  applianceTips: ApplianceTip[];
}

const SavingsTable: React.FC<SavingsTableProps> = ({ applianceTips }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Savings Opportunities</h2>
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Appliance</TableHead>
              <TableHead>Recommendation</TableHead>
              <TableHead>Monthly Savings</TableHead>
              <TableHead>Payback Period</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applianceTips.flatMap(appliance => 
              appliance.tips.map((tip, index) => (
                <TableRow key={`${appliance.applianceName}-${index}`}>
                  <TableCell className="font-medium">{appliance.applianceName}</TableCell>
                  <TableCell>{tip.tip.split('.').slice(1).join('.').trim()}</TableCell>
                  <TableCell className="text-green-600">₹{tip.moneySaved?.toFixed(2)}/month</TableCell>
                  <TableCell>{tip.paybackPeriod ? `${tip.paybackPeriod} months` : 'Immediate'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SavingsTable;
