import React from 'react';
import { useApp } from '../../context/AppContext';
import { filterTransactions } from '../../utils/calculations';
import { Button } from '../common';
import { TransactionFilters } from './TransactionFilters';
import { TransactionTable } from './TransactionTable';
import { TransactionForm } from './TransactionForm';
import { Modal, showToast } from '../common';

export function TransactionList() {
  const { state, dispatch } = useApp();
  const { transactions, filters, role, modalOpen, editingTransaction } = state;
  const isAdmin = role === 'admin';

  const filteredTransactions = filterTransactions(transactions, filters);

  const handleAddNew = () => {
    dispatch({ type: 'OPEN_MODAL', payload: { type: 'add', transaction: null } });
  };

  const handleEdit = (transaction) => {
    dispatch({ type: 'OPEN_MODAL', payload: { type: 'edit', transaction } });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
      showToast(dispatch, 'success', 'Deleted', 'Transaction has been deleted successfully');
    }
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const handleSubmit = (data) => {
    if (editingTransaction) {
      dispatch({
        type: 'UPDATE_TRANSACTION',
        payload: { ...editingTransaction, ...data },
      });
      showToast(dispatch, 'success', 'Updated', 'Transaction updated successfully');
    } else {
      dispatch({ type: 'ADD_TRANSACTION', payload: data });
      showToast(dispatch, 'success', 'Added', 'New transaction added successfully');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '4px' }}>
            Transactions
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} found
          </p>
        </div>
        {isAdmin && (
          <Button onClick={handleAddNew}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Transaction
          </Button>
        )}
      </div>

      <TransactionFilters />
      
      <div
        style={{
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
        }}
      >
        <TransactionTable
          transactions={filteredTransactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        title={editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      >
        <TransactionForm
          transaction={editingTransaction}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
}
