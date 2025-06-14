
export interface PumpingStation {
  id: number;
  name: string;
  status: string;
  operatingCompany: string;
  actualDischarge: number;
  location: string;
  coordinates: { e: number; n: number };
  totalPumpBases: number;
  installedPumps: number;
  workingPumps: number;
  standbyPumps: number;
  dischargePoint: string;
  flowMeterStatus: string;
  dischargeLines: number;
  dischargeDiameters: number[];
  dischargeLengths: number[];
  pipelineMaterial: string;
  generatorCount: number;
  generatorCapacity: number;
  synchronizationExists: string;
  generatorBrand: string;
  pumpDischarge: number;
  pumpPressure: number;
  pumpBrand: string;
  pumpType: string;
  motorPower: number;
  supervisingConsultant: string;
  supervisionAuthority: string;
  city: string;
  governorate: string;
  constructionYear: number;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
}

export interface PumpingStationFilters {
  status: string;
  governorate: string;
  pumpType: string;
  operatingCompany: string;
}

export interface PumpingStationTableProps {
  userRole?: string;
}
