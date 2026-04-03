import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getInitialTransactions } from '../data/mockData';

const AppContext = createContext(null);

const initialState = {
  transactions: [],
  filters: {
    search: '',
    category: 'all',
    type: 'all',
    dateRange: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
  },
  role: 'admin',
  currentPage: 1,
  itemsPerPage: 10,
  modalOpen: false,
  modalType: null,
  editingTransaction: null,
  toasts: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [
          { ...action.payload, id: uuidv4(), createdAt: new Date().toISOString() },
          ...state.transactions,
        ],
        modalOpen: false,
        modalType: null,
      };
    
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
        modalOpen: false,
        modalType: null,
        editingTransaction: null,
      };
    
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    
    case 'SET_FILTER':
      return {
        ...state,
        filters: { ...state.filters, [action.payload.key]: action.payload.value },
        currentPage: 1,
      };
    
    case 'RESET_FILTERS':
      return {
        ...state,
        filters: initialState.filters,
        currentPage: 1,
      };
    
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'OPEN_MODAL':
      return {
        ...state,
        modalOpen: true,
        modalType: action.payload.type,
        editingTransaction: action.payload.transaction || null,
      };
    
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalOpen: false,
        modalType: null,
        editingTransaction: null,
      };
    
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, { id: uuidv4(), ...action.payload }],
      };
    
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload),
      };
    
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState, (initial) => {
    const savedTransactions = localStorage.getItem('finance_transactions');
    const savedRole = localStorage.getItem('finance_role');
    
    return {
      ...initial,
      transactions: savedTransactions ? JSON.parse(savedTransactions) : getInitialTransactions(),
      role: savedRole || 'admin',
    };
  });

  useEffect(() => {
    localStorage.setItem('finance_transactions', JSON.stringify(state.transactions));
  }, [state.transactions]);

  useEffect(() => {
    localStorage.setItem('finance_role', state.role);
  }, [state.role]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
