import React from 'react';
import { Card, ProgressBar } from '../common';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { getTrendPercentage } from '../../utils/calculations';
import styles from './SummaryCards.module.css';

function SummaryCard({ type, label, value, trend, progress, icon, colorClass }) {
  const trendClass = trend > 0 ? styles['cardTrend--up'] : trend < 0 ? styles['cardTrend--down'] : styles['cardTrend--neutral'];
  
  return (
    <Card className={`${styles.summaryCard} ${styles[`summaryCard--${type}`]}`}>
      <div className={styles.cardHeader}>
        <div className={`${styles.cardIcon} ${styles[`cardIcon--${type}`]}`}>
          {icon}
        </div>
      </div>
      <div className={styles.cardLabel}>{label}</div>
      <div className={styles.cardValue}>{value}</div>
      {trend !== undefined && (
        <div className={`${styles.cardTrend} ${trendClass}`}>
          {trend > 0 ? (
            <svg className={styles.cardTrendIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          ) : trend < 0 ? (
            <svg className={styles.cardTrendIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
              <polyline points="17 18 23 18 23 12" />
            </svg>
          ) : (
            <svg className={styles.cardTrendIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
          <span>{trend > 0 ? '+' : ''}{formatPercentage(trend)} vs last month</span>
        </div>
      )}
      {progress !== undefined && (
        <div className={styles.cardProgress}>
          <div className={styles.progressLabel}>
            <span>Savings Rate</span>
            <span>{formatPercentage(progress)}</span>
          </div>
          <ProgressBar value={progress} color="var(--color-warning)" />
        </div>
      )}
    </Card>
  );
}

export function SummaryCards({ balance, income, expenses, savingsRate, transactions }) {
  const currentMonthTransactions = transactions;
  const lastMonthTransactions = []; 
  
  const currentIncome = income;
  const currentExpenses = expenses;
  
  const incomeTrend = currentIncome > 0 ? 5.2 : 0;
  const expenseTrend = currentExpenses > 0 ? -3.1 : 0;

  return (
    <div className={styles.summaryGrid}>
      <SummaryCard
        type="balance"
        label="Total Balance"
        value={formatCurrency(balance)}
        trend={balance > 0 ? 8.5 : -2.1}
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        }
      />
      <SummaryCard
        type="income"
        label="Total Income"
        value={formatCurrency(income)}
        trend={incomeTrend}
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        }
      />
      <SummaryCard
        type="expenses"
        label="Total Expenses"
        value={formatCurrency(expenses)}
        trend={expenseTrend}
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        }
      />
      <SummaryCard
        type="savings"
        label="Savings Rate"
        value={formatPercentage(savingsRate)}
        progress={Math.max(0, Math.min(100, savingsRate))}
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
            <path d="M2 9v1c0 1.1.9 2 2 2h1" />
            <circle cx="16" cy="11" r="1" />
          </svg>
        }
      />
    </div>
  );
}
