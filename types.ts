export interface SubcategoryDetails {
  name: string;
  classes?: string;
  description?: string;
  maxWeight?: string;
  minDistance?: string;
  maxHeight: string;
  requirements: string;
  zones: string;
  remoteId?: string;
  details: string;
  visualContact?: string;
  pilotDistance?: string;
  observerDistance?: string;
  safetyDistance?: string;
  flightZone?: string;
}

export interface Category {
  name: string;
  description: string;
  subcategories: {
    [key: string]: SubcategoryDetails;
  };
}

export interface Categories {
  [key: string]: Category;
}

// Types for Compliance Checker
export interface DroneClass {
  name: string;
  details: string;
}

export interface DroneClasses {
  [key: string]: DroneClass;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface ComplianceResult {
  status: 'ALLOWED' | 'PROHIBITED' | 'CAUTION' | 'ERROR' | null;
  areaType: string;
  explanation: string;
  hazards: string;
}