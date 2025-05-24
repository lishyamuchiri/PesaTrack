export interface Transaction {
  id: string;
  amount: number;  // Positive for income, negative for expense
  description: string;
  date: string;  // ISO date string
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
}