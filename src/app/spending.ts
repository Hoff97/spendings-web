import { Category } from './category';

export interface Spending {
  id: number;
  date: Date;
  category: Category;
  amount: number;
  description: string;
}
