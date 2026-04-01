import { mockTransactions } from '../data/mockData';

const STORAGE_KEY = 'finlytics_transactions';

function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms + Math.random() * 200));
}

function getStoredTransactions() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
  }
  return null;
}

function saveTransactions(transactions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export async function fetchTransactions() {
  await delay(400);
  const stored = getStoredTransactions();
  if (stored) return stored;
  saveTransactions(mockTransactions);
  return mockTransactions;
}

export async function addTransaction(transaction) {
  await delay(250);
  const transactions = getStoredTransactions() || [];
  transactions.unshift(transaction);
  saveTransactions(transactions);
  return transaction;
}

export async function updateTransaction(id, updates) {
  await delay(250);
  const transactions = getStoredTransactions() || [];
  const idx = transactions.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error('Transaction not found');
  transactions[idx] = { ...transactions[idx], ...updates };
  saveTransactions(transactions);
  return transactions[idx];
}

export async function deleteTransaction(id) {
  await delay(200);
  let transactions = getStoredTransactions() || [];
  transactions = transactions.filter((t) => t.id !== id);
  saveTransactions(transactions);
  return id;
}
