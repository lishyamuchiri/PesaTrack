import React, { useState } from "react";
import "./App.css";
import ProfitSummary from "./components/ProfitSummary";
import ReceiptUpload from "./components/ReceiptUpload";
import TransactionList from "./components/TransactionList";
import VoiceInputButton from "./components/VoiceInputButton";
import { useTransactions } from "./hooks/useTransactions";

function App() {
  const { 
    transactions, 
    totalIncome, 
    totalExpenses, 
    netProfit,
    addTransaction
  } = useTransactions();
  
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const handleVoiceActivation = () => {
    setIsVoiceActive(true);
    // In a real app, this would trigger voice recognition
    // For demo purposes, we'll simulate a voice input after 3 seconds
    setTimeout(() => {
      setIsVoiceActive(false);
      // Simulating adding a transaction from voice input
      addTransaction({
        id: Date.now().toString(),
        amount: Math.random() > 0.5 ? 120 : -80,
        description: "Voice recorded transaction",
        date: new Date().toISOString(),
      });
    }, 3000);
  };

  const handleFileUpload = (file: File) => {
    // In a real app, this would process the receipt image
    console.log("Processing receipt:", file.name);
    
    // Simulating adding a transaction from receipt upload
    addTransaction({
      id: Date.now().toString(),
      amount: -Math.floor(Math.random() * 100) - 20, // Random expense
      description: `Receipt: ${file.name}`,
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-md mx-auto px-4 pt-6 pb-24">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">PesaTrack</h1>
          <p className="text-sm text-gray-500">Track your business finances on the go</p>
        </header>

        <ProfitSummary 
          totalIncome={totalIncome} 
          totalExpenses={totalExpenses} 
          netProfit={netProfit} 
        />
        
        <ReceiptUpload onFileUpload={handleFileUpload} />
        
        <TransactionList transactions={transactions} />
        
        <VoiceInputButton 
          isActive={isVoiceActive} 
          onClick={handleVoiceActivation} 
        />
      </div>
    </div>
  );
}

export default App;