import React from 'react';
import { Card } from '../common';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { getHighestSpendingCategory, getMonthlyData, compareMonths } from '../../utils/calculations';
import { categories, categoryColors } from '../../data/mockData';
import styles from './Insights.module.css';

function InsightCard({ icon, label, title, description, change, changeType }) {
  return (
    <Card className={styles.insightCard}>
      <div className={styles.insightHeader}>
        <div className={styles.insightIcon}>{icon}</div>
        <span className={styles.insightLabel}>{label}</span>
      </div>
      <div className={styles.insightTitle}>{title}</div>
      <p className={styles.insightDescription}>{description}</p>
      {change !== undefined && (
        <div
          className={`${styles.insightChange} ${
            changeType === 'up'
              ? styles['insightChange--up']
              : changeType === 'down'
              ? styles['insightChange--down']
              : styles['insightChange--neutral']
          }`}
        >
          {changeType === 'up' && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          )}
          {changeType === 'down' && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          )}
          {change}
        </div>
      )}
    </Card>
  );
}

export function HighestSpendingInsight({ transactions }) {
  const highest = getHighestSpendingCategory(transactions, 'month');
  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
  
  const cat = categories.find((c) => c.value === highest?.category);
  const percentage = highest ? ((highest.amount / totalExpenses) * 100).toFixed(1) : 0;

  return (
    <InsightCard
      icon={
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      }
      label="Highest Spending"
      title={highest ? `${cat?.icon || ''} ${highest.category}` : 'No data'}
      description={`You spent ${formatCurrency(highest?.amount || 0)} on ${highest?.category || 'this category'} this month, which is ${percentage}% of your total expenses.`}
      change={`${percentage}% of total`}
      changeType="neutral"
    />
  );
}

export function MonthlyComparisonInsight({ transactions }) {
  const monthlyData = getMonthlyData(transactions, 3);
  const comparison = compareMonths(transactions);
  const maxAmount = Math.max(...monthlyData.map((d) => d.expenses));

  return (
    <Card className={`${styles.insightCard} ${styles.comparisonCard}`}>
      <div className={styles.insightHeader}>
        <div className={`${styles.insightIcon} ${styles['insightIcon--comparison']}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        </div>
        <span className={styles.insightLabel}>Monthly Comparison</span>
      </div>
      <div className={styles.insightTitle}>Expense Trends</div>
      <p className={styles.insightDescription}>
        Compare your spending across the last 3 months to identify patterns and adjust your budget accordingly.
      </p>
      
      <div className={styles.barChart}>
        {monthlyData.map((data, index) => (
          <div key={index} className={styles.barItem}>
            <span className={styles.barLabel}>{data.month}</span>
            <div className={styles.barTrack}>
              <div
                className={styles.barFill}
                style={{
                  width: `${(data.expenses / maxAmount) * 100}%`,
                  backgroundColor: index === monthlyData.length - 1 ? '#6366F1' : '#CBD5E1',
                }}
              >
                {data.month === monthlyData[monthlyData.length - 1].month && formatCurrency(data.expenses)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {comparison.direction !== 'same' && (
        <div
          className={`${styles.insightChange} ${
            comparison.direction === 'up'
              ? styles['insightChange--up']
              : styles['insightChange--down']
          }`}
        >
          {comparison.direction === 'up' ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          )}
          {comparison.direction === 'up' ? '+' : ''}{comparison.percentChange.toFixed(1)}% vs last month
        </div>
      )}
    </Card>
  );
}

export function SpendingAlertInsight({ transactions }) {
  const monthlyData = getMonthlyData(transactions, 3);
  const avgExpenses = monthlyData.reduce((acc, d) => acc + d.expenses, 0) / monthlyData.length;
  const currentMonthExpenses = monthlyData[monthlyData.length - 1]?.expenses || 0;
  const isOverBudget = currentMonthExpenses > avgExpenses * 1.2;
  
  const budgetRecommendation = (avgExpenses * 0.9).toFixed(0);
  const projectedSavings = Math.max(0, currentMonthExpenses - avgExpenses * 0.9).toFixed(0);

  return (
    <Card className={`${styles.insightCard} ${isOverBudget ? styles.warningCard : ''}`}>
      <div className={styles.insightHeader}>
        <div className={`${styles.insightIcon} ${styles['insightIcon--warning']}`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <span className={styles.insightLabel}>Budget Alert</span>
      </div>
      <div className={styles.insightTitle}>
        {isOverBudget ? 'Over Budget Alert' : 'On Track'}
      </div>
      <p className={styles.insightDescription}>
        {isOverBudget
          ? `Your spending this month is ${formatPercentage(((currentMonthExpenses - avgExpenses) / avgExpenses) * 100)} above your average. Consider reducing expenses to stay within budget.`
          : `Great job! You're currently under your average monthly spending. Potential savings: ${formatCurrency(parseFloat(projectedSavings))}.`}
      </p>
      <div className={styles.insightChange} style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}>
        Recommended monthly budget: {formatCurrency(parseFloat(budgetRecommendation))}
      </div>
    </Card>
  );
}

export function InsightsSection({ transactions }) {
  return (
    <div className={styles.insightsGrid}>
      <HighestSpendingInsight transactions={transactions} />
      <MonthlyComparisonInsight transactions={transactions} />
      <SpendingAlertInsight transactions={transactions} />
    </div>
  );
}
