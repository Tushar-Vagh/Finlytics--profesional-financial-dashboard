import { createContext, useContext, useReducer, useState, useEffect, useCallback } from 'react';
import * as api from '../utils/api';
import { generateId } from '../utils/helpers';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('finlytics_theme');
    return stored || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('finlytics_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [role, setRole] = useState('admin');

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}

const TransactionContext = createContext();

const initialState = {
  transactions: [],
  loading: true,
  error: null,
};

function transactionReducer(state, action) {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload, loading: false, error: null };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function TransactionProvider({ children }) {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    dateFrom: '',
    dateTo: '',
    groupBy: 'none',
  });

  const [sortConfig, setSortConfig] = useState({ key: 'date', dir: 'desc' });

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const data = await api.fetchTransactions();
      dispatch({ type: 'SET_TRANSACTIONS', payload: data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  };

  const addTransaction = useCallback(async (data) => {
    const transaction = { ...data, id: generateId() };
    await api.addTransaction(transaction);
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
    return transaction;
  }, []);

  const updateTransaction = useCallback(async (id, data) => {
    const updated = await api.updateTransaction(id, data);
    dispatch({ type: 'UPDATE_TRANSACTION', payload: updated });
    return updated;
  }, []);

  const deleteTransaction = useCallback(async (id) => {
    await api.deleteTransaction(id);
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  }, []);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      type: 'all',
      category: 'all',
      dateFrom: '',
      dateTo: '',
      groupBy: 'none',
    });
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        ...state,
        filters,
        sortConfig,
        setSortConfig,
        updateFilters,
        resetFilters,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        loadTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionContext);
}

const NavContext = createContext();

export function NavProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <NavContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  return useContext(NavContext);
}
