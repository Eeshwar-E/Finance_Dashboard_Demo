import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import styles from './Sidebar.module.css';

const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: 'insights',
    label: 'Insights',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

export function Sidebar({ activeView, onNavigate }) {
  const { state } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <aside className={`${styles.sidebar} ${isOpen ? styles['sidebar--open'] : ''}`}>
        <nav className={styles.navList}>
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`${styles.navItem} ${activeView === item.id ? styles['navItem--active'] : ''}`}
              onClick={() => {
                onNavigate(item.id);
                setIsOpen(false);
              }}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
              {item.id === 'transactions' && (
                <span className={styles.navBadge}>{state.transactions.length}</span>
              )}
            </div>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <p className={styles.sidebarFooterText}>FinTrack v1.0</p>
        </div>
      </aside>

      <button
        className={styles.mobileNavToggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>
    </>
  );
}
