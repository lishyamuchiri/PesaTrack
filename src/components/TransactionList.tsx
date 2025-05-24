import React, { useRef, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll to the bottom when a new transaction is added
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [transactions.length]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className="p-5 bg-white shadow-sm">
      <h2 className="text-lg font-medium text-gray-700 mb-4">Recent Transactions</h2>
      
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No transactions yet</p>
      ) : (
        <div 
          ref={listRef}
          className="space-y-3 max-h-80 overflow-y-auto pr-1 scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-800">{transaction.description}</p>
                <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
              </div>
              <div 
                className={`font-medium ${
                  transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {formatCurrency(transaction.amount)}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default TransactionList;