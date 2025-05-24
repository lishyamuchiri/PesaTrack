import { useState, useEffect } from 'react';
import { Transaction } from '../types';
import { mockTransactions } from '../data/mockData';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [netProfit, setNetProfit] = useState(0);

  // Calculate financial summaries whenever transactions change
  useEffect(() => {
    let income = 0;
    let expenses = 0;

    transactions.forEach(transaction => {
      if (transaction.amount >= 0) {
        income += transaction.amount;
      } else {
        expenses += Math.abs(transaction.amount);
      }
    });

    setTotalIncome(income);
    setTotalExpenses(expenses);
    setNetProfit(income - expenses);
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(transaction => transaction.id !== id));
  };

  return {
    transactions,
    totalIncome,
    totalExpenses,
    netProfit,
    addTransaction,
    deleteTransaction
  };
};