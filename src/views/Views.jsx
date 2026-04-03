import React from 'react';
import { useApp } from '../context/AppContext';
import { SummaryCards, BalanceChart, SpendingChart } from '../components/dashboard';
import { InsightsSection } from '../components/insights';
import { ExportButton } from '../components/export';
import { PageHeader } from '../components/layout';
import { Button } from '../components/common';
import {
  calculateTotalBalance,
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateSavingsRate,
  getSpendingByCategory,
  getBalanceTrend,
} from '../utils/calculations';
import { formatCurrency } from '../utils/formatters';
import { TransactionList } from '../components/transactions';
import styles from './Dashboard.module.css';

export function DashboardView({ onNavigate }) {
  const { state, dispatch } = useApp();
  const { transactions, role } = state;
  const isAdmin = role === 'admin';

  const balance = calculateTotalBalance(transactions);
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);
  const savingsRate = calculateSavingsRate(transactions);
  const spendingByCategory = getSpendingByCategory(transactions);
  const balanceTrend = getBalanceTrend(transactions, 6);
  const totalExpenses = spendingByCategory.reduce((acc, c) => acc + c.amount, 0);

  return (
    <div className={styles.dashboard}>
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back! Here's your financial overview for ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
        actions={
          <>
            <ExportButton />
            {isAdmin && (
              <Button onClick={() => dispatch({ type: 'OPEN_MODAL', payload: { type: 'add' } })}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Transaction
              </Button>
            )}
          </>
        }
      />

      <SummaryCards
        balance={balance}
        income={income}
        expenses={expenses}
        savingsRate={savingsRate}
        transactions={transactions}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <BalanceChart data={balanceTrend} />
        <SpendingChart data={spendingByCategory} total={totalExpenses} />
      </div>

      <InsightsSection transactions={transactions} />
    </div>
  );
}

export function TransactionsView() {
  return <TransactionList />;
}

export function InsightsView() {
  const { state } = useApp();
  const { transactions } = state;

  return (
    <div className={styles.dashboard}>
      <PageHeader
        title="Insights"
        subtitle="Detailed analysis of your financial data"
      />
      <InsightsSection transactions={transactions} />
      
      <div style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Financial Summary</h2>
        <div style={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '24px' }}>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
            Based on your transaction history, you have recorded <strong>{transactions.length}</strong> transactions.
            Your total income is <strong style={{ color: 'var(--color-success)' }}>{formatCurrency(calculateTotalIncome(transactions))}</strong> and 
            total expenses are <strong style={{ color: 'var(--color-danger)' }}>{formatCurrency(calculateTotalExpenses(transactions))}</strong>.
            Your net balance is <strong>{formatCurrency(calculateTotalBalance(transactions))}</strong> with a 
            savings rate of <strong>{calculateSavingsRate(transactions).toFixed(1)}%</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
