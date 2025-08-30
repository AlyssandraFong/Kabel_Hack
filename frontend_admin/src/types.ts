// /types.ts
export interface IGrossMargin {
  car: string;
  acquisition: number;
  resale: number;
  reconditioning: number;
  dealer: string;
  [key: string]: string | number; // For Nivo charts compatibility
}
