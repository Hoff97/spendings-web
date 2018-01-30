import { Category } from './category';

export interface ScanResult {
  scanId: number;
  price: number[];
  category: Category[];
  description: string;
  date: Date[];
}
