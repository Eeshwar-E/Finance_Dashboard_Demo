import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { filterTransactions } from '../../utils/calculations';
import { Button, showToast } from '../common';
import styles from './ExportButton.module.css';

export function ExportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useApp();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredTransactions = filterTransactions(state.transactions, state.filters);

  const exportToCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map((t) =>
        [
          t.date,
          `"${t.description.replace(/"/g, '""')}"`,
          t.category,
          t.type,
          t.amount,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    
    showToast(dispatch, 'success', 'Export Complete', `${filteredTransactions.length} transactions exported to CSV`);
    setIsOpen(false);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(filteredTransactions, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `transactions_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    
    showToast(dispatch, 'success', 'Export Complete', `${filteredTransactions.length} transactions exported to JSON`);
    setIsOpen(false);
  };

  return (
    <div className={styles.exportDropdown} ref={dropdownRef}>
      <Button variant="secondary" onClick={() => setIsOpen(!isOpen)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Export
      </Button>
      {isOpen && (
        <div className={styles.exportMenu}>
          <button className={styles.exportItem} onClick={exportToCSV}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            Export as CSV
          </button>
          <button className={styles.exportItem} onClick={exportToJSON}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <path d="M10 12l-2 2 2 2" />
              <path d="M14 12l2 2-2 2" />
            </svg>
            Export as JSON
          </button>
        </div>
      )}
    </div>
  );
}
