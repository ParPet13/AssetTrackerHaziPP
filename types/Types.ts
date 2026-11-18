export type AssetCategory = 'Laptop' | 'Monitor' | 'Projektor' | 'Kiegészítő';

export type AssetStatus = 'Elérhető' | 'Kikölcsönözve' | 'Szervizben';

export interface Asset {
  id: string;
  name: string;
  serialNumber: string;
  purchasePrice: number;
  category: AssetCategory;
  status: AssetStatus;
  notes?: string;
  borrowerName?: string;
}

export type NewAssetInput = Omit<Asset, 'id' | 'status' | 'borrowerName'>;
