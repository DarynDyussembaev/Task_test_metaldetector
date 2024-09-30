export interface MetalDetector {
  id: number;
  brand: string;
  count: number;
  yearIssue: number;
  availabilityId: number | null;
  availabilityNameKaz?: string;
  availabilityNameRus?: string;
  countryManufactureId: number | null;
  countryManufactureNameKaz?: string;
  countryManufactureNameRus?: string;
  typeMetalDetectorsId: number | null;
  typeMetalDetectorsNameKaz?: string;
  typeMetalDetectorsNameRus?: string;
  createdAt: string;

}
export interface MetalDetectorDirectory {
  id: number;
  nameKaz: string;
  nameRus: string;
}
