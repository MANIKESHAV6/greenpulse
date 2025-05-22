
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { Appliance } from "@/types";

const defaultAppliances: Omit<Appliance, "quantity" | "hoursPerDay">[] = [
  { id: "1", name: "Air Conditioner", wattage: 1500, icon: "❄️" },
  { id: "2", name: "Refrigerator", wattage: 150, icon: "🧊" },
  { id: "3", name: "Television", wattage: 100, icon: "📺" },
  { id: "4", name: "Washing Machine", wattage: 500, icon: "🧺" },
  { id: "5", name: "Microwave Oven", wattage: 1000, icon: "🍲" },
  { id: "6", name: "LED Lights", wattage: 10, icon: "💡" },
  { id: "7", name: "Fan", wattage: 70, icon: "💨" },
  { id: "8", name: "Water Heater", wattage: 2000, icon: "🚿" },
  { id: "9", name: "Computer", wattage: 200, icon: "💻" },
];

interface ApplianceSelectorProps {
  onSubmit: (appliances: Appliance[]) => void;
}

const ApplianceSelector: React.FC<ApplianceSelectorProps> = ({ onSubmit }) => {
  const [selectedAppliances, setSelectedAppliances] = useState<Appliance[]>([]);
  
  const toggleAppliance = (appliance: Omit<Appliance, "quantity" | "hoursPerDay">) => {
    const isSelected = selectedAppliances.some(a => a.id === appliance.id);
    
    if (isSelected) {
      setSelectedAppliances(selectedAppliances.filter(a => a.id !== appliance.id));
    } else {
      setSelectedAppliances([
        ...selectedAppliances,
        { ...appliance, quantity: 1, hoursPerDay: 4 }
      ]);
    }
  };
  
  const updateAppliance = (id: string, field: "quantity" | "hoursPerDay", value: number) => {
    setSelectedAppliances(
      selectedAppliances.map(appliance => 
        appliance.id === id 
          ? { ...appliance, [field]: value } 
          : appliance
      )
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedAppliances);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-semibold">Select Your Appliances</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {defaultAppliances.map(appliance => {
          const isSelected = selectedAppliances.some(a => a.id === appliance.id);
          const selectedAppliance = selectedAppliances.find(a => a.id === appliance.id);
          
          return (
            <div key={appliance.id} className={`p-4 border rounded-lg ${isSelected ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
              <div className="flex items-center">
                <Checkbox 
                  id={`appliance-${appliance.id}`}
                  checked={isSelected}
                  onCheckedChange={() => toggleAppliance(appliance)}
                  className="mr-3"
                />
                <Label htmlFor={`appliance-${appliance.id}`} className="flex-1 cursor-pointer">
                  <span className="mr-2">{appliance.icon}</span>
                  {appliance.name} ({appliance.wattage}W)
                </Label>
              </div>
              
              {isSelected && selectedAppliance && (
                <div className="mt-3 pl-8 space-y-3">
                  <div className="flex items-center">
                    <Label htmlFor={`quantity-${appliance.id}`} className="w-24 text-sm">
                      Quantity:
                    </Label>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-r-none"
                        onClick={() => updateAppliance(appliance.id, "quantity", Math.max(1, selectedAppliance.quantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id={`quantity-${appliance.id}`}
                        type="number"
                        min={1}
                        className="h-8 w-12 rounded-none text-center"
                        value={selectedAppliance.quantity}
                        onChange={e => updateAppliance(appliance.id, "quantity", parseInt(e.target.value) || 1)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-l-none"
                        onClick={() => updateAppliance(appliance.id, "quantity", selectedAppliance.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Label htmlFor={`hours-${appliance.id}`} className="w-24 text-sm">
                      Hours/day:
                    </Label>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-r-none"
                        onClick={() => updateAppliance(appliance.id, "hoursPerDay", Math.max(0.5, selectedAppliance.hoursPerDay - 0.5))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id={`hours-${appliance.id}`}
                        type="number"
                        step="0.5"
                        min="0.5"
                        max="24"
                        className="h-8 w-12 rounded-none text-center"
                        value={selectedAppliance.hoursPerDay}
                        onChange={e => updateAppliance(appliance.id, "hoursPerDay", parseFloat(e.target.value) || 0.5)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-l-none"
                        onClick={() => updateAppliance(appliance.id, "hoursPerDay", Math.min(24, selectedAppliance.hoursPerDay + 0.5))}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <Button type="submit" className="w-full" disabled={selectedAppliances.length === 0}>
        Calculate Energy Consumption
      </Button>
    </form>
  );
};

export default ApplianceSelector;
