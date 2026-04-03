import React from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { categories, categoryColors } from '../../data/mockData';
import styles from './TransactionTable.module.css';

export function TransactionTable({ transactions, onEdit, onDelete }) {
  const { state, dispatch } = useApp();
  const { currentPage, itemsPerPage, role } = state;
  const isAdmin = role === 'admin';

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find((c) => c.value === category);
    return cat?.icon || '📦';
  };

  if (transactions.length === 0) {
    return (
      <div className={styles.emptyState}>
        <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <h3 className={styles.emptyTitle}>No transactions found</h3>
        <p className={styles.emptyText}>
          {isAdmin
            ? 'Add your first transaction to get started'
            : 'No transactions match your current filters'}
        </p>
      </div>
    );
  }

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>Transaction</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
            {isAdmin && <th></th>}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {paginatedTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td data-label="Transaction">
                <div className={styles.transactionInfo}>
                  <div
                    className={styles.transactionIcon}
                    style={{ backgroundColor: `${categoryColors[transaction.category]}15` }}
                  >
                    {getCategoryIcon(transaction.category)}
                  </div>
                  <div className={styles.transactionDetails}>
                    <div className={styles.transactionDescription}>{transaction.description}</div>
                    <div className={styles.transactionDate}>
                      <span
                        className={`${styles.typeBadge} ${
                          styles[`typeBadge--${transaction.type}`]
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td data-label="Category">
                <span className={styles.categoryBadge}>
                  {getCategoryIcon(transaction.category)} {transaction.category}
                </span>
              </td>
              <td data-label="Date">{formatDate(transaction.date)}</td>
              <td data-label="Amount">
                <span
                  className={`${styles.amount} ${
                    styles[`amount--${transaction.type}`]
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
              </td>
              {isAdmin && (
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionButton}
                      onClick={() => onEdit(transaction)}
                      title="Edit"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles['actionButton--delete']}`}
                      onClick={() => onDelete(transaction.id)}
                      title="Delete"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <span className={styles.paginationInfo}>
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, transactions.length)} of{' '}
            {transactions.length} transactions
          </span>
          <div className={styles.paginationButtons}>
            <button
              className={styles.paginationButton}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNum}
                  className={`${styles.paginationButton} ${
                    currentPage === pageNum ? styles['paginationButton--active'] : ''
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              className={styles.paginationButton}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
