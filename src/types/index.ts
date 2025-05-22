
export interface User {
  id: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
}

export interface Appliance {
  id: string;
  name: string;
  wattage: number;
  quantity: number;
  hoursPerDay: number;
  icon: string;
}

export interface BillData {
  id: string;
  userId: string;
  month: string;
  year: number;
  amount: number;
  unitsConsumed: number;
  imagePath: string;
  uploadDate: Date;
}

export interface EnergyConsumption {
  applianceId: string;
  applianceName: string;
  percentage: number;
  kWh: number;
}

export interface ApplianceTip {
  applianceName: string;
  tips: TipItem[];
}

export interface TipItem {
  tip: string;
  savingsPercentage?: number;
  moneySaved?: number;
  paybackPeriod?: number;
  isQuickWin?: boolean;
}
