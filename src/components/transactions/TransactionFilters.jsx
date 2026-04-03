import React from 'react';
import { categories } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import styles from './TransactionFilters.module.css';

const dateRangeOptions = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: '3months', label: 'Last 3 Months' },
  { value: '6months', label: 'Last 6 Months' },
  { value: 'year', label: 'This Year' },
];

const typeOptions = [
  { value: 'all', label: 'All Types', icon: '' },
  { value: 'income', label: 'Income', icon: '+' },
  { value: 'expense', label: 'Expense', icon: '-' },
];

const sortOptions = [
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'amount-desc', label: 'Highest Amount' },
  { value: 'amount-asc', label: 'Lowest Amount' },
  { value: 'category-asc', label: 'Category A-Z' },
];

export function TransactionFilters() {
  const { state, dispatch } = useApp();
  const { filters } = state;

  const handleFilterChange = (key, value) => {
    dispatch({ type: 'SET_FILTER', payload: { key, value } });
  };

  const handleSortChange = (e) => {
    const [sortBy, sortOrder] = e.target.value.split('-');
    dispatch({ type: 'SET_FILTER', payload: { key: 'sortBy', value: sortBy } });
    dispatch({ type: 'SET_FILTER', payload: { key: 'sortOrder', value: sortOrder } });
  };

  const hasActiveFilters =
    filters.search ||
    filters.category !== 'all' ||
    filters.type !== 'all' ||
    filters.dateRange !== 'all';

  const handleReset = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  return (
    <div className={styles.filters}>
      <div className={styles.searchWrapper}>
        <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </div>

      <select
        className={styles.filterSelect}
        value={filters.type}
        onChange={(e) => handleFilterChange('type', e.target.value)}
      >
        {typeOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.icon && `${opt.icon} `}{opt.label}
          </option>
        ))}
      </select>

      <select
        className={styles.filterSelect}
        value={filters.category}
        onChange={(e) => handleFilterChange('category', e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.icon && `${cat.icon} `}{cat.label}
          </option>
        ))}
      </select>

      <select
        className={styles.filterSelect}
        value={filters.dateRange}
        onChange={(e) => handleFilterChange('dateRange', e.target.value)}
      >
        {dateRangeOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        className={styles.filterSelect}
        value={`${filters.sortBy}-${filters.sortOrder}`}
        onChange={handleSortChange}
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {hasActiveFilters && (
        <button className={styles.filterButton} onClick={handleReset}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          Clear
        </button>
      )}
    </div>
  );
}
