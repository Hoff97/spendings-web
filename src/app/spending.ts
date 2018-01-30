import { Category } from './category';
import { Option, None, Some } from 'option.ts';

export interface Spending {
  id: number;
  date: Date;
  category: Category;
  amount: number;
  description: string;
  scanId: Option<number>;
}
