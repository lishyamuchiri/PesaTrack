import React from 'react';
import { Card } from '../components/ui/card';

interface ProfitSummaryProps {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
}

const ProfitSummary: React.FC<ProfitSummaryProps> = ({ 
  totalIncome, 
  totalExpenses, 
  netProfit 
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <Card className="p-5 mb-6 bg-white shadow-sm">
      <h2 className="text-lg font-medium text-gray-700 mb-4">Profit Summary</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Income</span>
          <span className="font-medium text-green-600">
            {formatCurrency(totalIncome)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Expenses</span>
          <span className="font-medium text-red-600">
            {formatCurrency(totalExpenses)}
          </span>
        </div>
        
        <div className="pt-3 border-t">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Net Profit</span>
            <span 
              className={`font-bold text-lg ${
                netProfit >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {formatCurrency(netProfit)}
            </span>
          </div>
        </div>
      </div>

      {/* Animation when values change */}
      <style jsx>{`
        @keyframes highlight {
          0% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        span {
          transition: all 0.3s ease;
        }
        
        span:hover {
          animation: highlight 0.5s ease-in-out;
        }
      `}</style>
    </Card>
  );
};

export default ProfitSummary;