
export interface SystemOverview {
  totalPlants: number;
  operatingPlants: number;
  underMaintenance: number;
  underConstruction: number;
  totalCapacity: number;
  actualProduction: number;
  efficiency: number;
  totalInvestment: number;
  totalArea: number;
  forestedArea: number;
  dailySludge: number;
  energyConsumption: number;
}

export interface TreatmentType {
  name: string;
  count: number;
  capacity: number;
  color: string;
}

export interface GovernorateData {
  name: string;
  plants: number;
  capacity: number;
  production: number;
}

export interface YearlyData {
  year: string;
  plants: number;
  capacity: number;
  investment: number;
}

export interface MonthlyPerformance {
  month: string;
  efficiency: number;
  production: number;
}

export interface QualityMetric {
  parameter: string;
  value: number;
  standard: number;
  unit: string;
  status: string;
  color: string;
}

export interface CompanyPerformance {
  name: string;
  plants: number;
  efficiency: number;
  maintenance: string;
}
