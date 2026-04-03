import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import styles from './Layout.module.css';

export function Layout({ children, activeView, onNavigate }) {
  return (
    <div className={styles.layout}>
      <Header />
      <Sidebar activeView={activeView} onNavigate={onNavigate} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className={styles.pageHeader}>
      <div>
        <h1 className={styles.pageTitle}>{title}</h1>
        {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
      </div>
      {actions && <div className={styles.pageActions}>{actions}</div>}
    </div>
  );
}
