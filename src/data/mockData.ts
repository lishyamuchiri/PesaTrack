import { Transaction } from '../types';

// Mock data for initial transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 1200.00,
    description: 'Client payment - Web design',
    date: '2023-08-15T10:30:00Z'
  },
  {
    id: '2',
    amount: -250.50,
    description: 'Office supplies',
    date: '2023-08-14T15:20:00Z'
  },
  {
    id: '3',
    amount: 800.00,
    description: 'Consulting service',
    date: '2023-08-13T09:15:00Z'
  },
  {
    id: '4',
    amount: -120.75,
    description: 'Software subscription',
    date: '2023-08-12T14:45:00Z'
  },
  {
    id: '5',
    amount: 2500.00,
    description: 'Client retainer',
    date: '2023-08-10T11:30:00Z'
  },
  {
    id: '6',
    amount: -85.25,
    description: 'Internet bill',
    date: '2023-08-08T16:10:00Z'
  },
  {
    id: '7',
    amount: -750.00,
    description: 'Rent payment',
    date: '2023-08-05T09:30:00Z'
  }
];