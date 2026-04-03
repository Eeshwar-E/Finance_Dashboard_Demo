import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card } from '../common';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { categoryColors } from '../../data/mockData';
import styles from './Charts.module.css';

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        <div className={styles.tooltipLabel}>{label}</div>
        <div className={styles.tooltipValue}>{formatCurrency(payload[0]?.value || 0)}</div>
        {payload[0]?.payload.income !== undefined && (
          <div className={styles.tooltipDetail}>
            Income: {formatCurrency(payload[0]?.payload.income)} | Expenses: {formatCurrency(payload[0]?.payload.expenses)}
          </div>
        )}
      </div>
    );
  }
  return null;
}

export function BalanceChart({ data }) {
  const [view, setView] = useState('balance');

  return (
    <Card className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Balance Trend</h3>
        <div className={styles.chartTabs}>
          <button
            className={`${styles.chartTab} ${view === 'balance' ? styles['chartTab--active'] : ''}`}
            onClick={() => setView('balance')}
          >
            Balance
          </button>
          <button
            className={`${styles.chartTab} ${view === 'cashflow' ? styles['chartTab--active'] : ''}`}
            onClick={() => setView('cashflow')}
          >
            Cash Flow
          </button>
        </div>
      </div>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          {view === 'balance' ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#6366F1"
                strokeWidth={2}
                fill="url(#balanceGradient)"
                dot={{ fill: '#6366F1', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#6366F1', strokeWidth: 0 }}
              />
            </AreaChart>
          ) : (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#incomeGradient)"
                dot={{ fill: '#10B981', strokeWidth: 0, r: 4 }}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#EF4444"
                strokeWidth={2}
                fill="url(#expenseGradient)"
                dot={{ fill: '#EF4444', strokeWidth: 0, r: 4 }}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function SpendingChart({ data, total }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Card className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Spending by Category</h3>
      </div>
      <div className={styles.donutContainer}>
        <div className={styles.donutChart}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="amount"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={categoryColors[entry.category] || '#64748B'}
                    opacity={activeIndex === null || activeIndex === index ? 1 : 0.4}
                    style={{ transition: 'opacity 0.2s ease-out' }}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-lg)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Total</div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: '700',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {formatCurrency(total)}
            </div>
          </div>
        </div>
        <div className={styles.donutLegend}>
          {data.slice(0, 6).map((item, index) => (
            <div key={index} className={styles.legendItem}>
              <div className={styles.legendLeft}>
                <span
                  className={styles.legendDot}
                  style={{ backgroundColor: categoryColors[item.category] || '#64748B' }}
                />
                <span className={styles.legendLabel}>{item.category}</span>
              </div>
              <span className={styles.legendValue}>
                {formatPercentage((item.amount / total) * 100, 0)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
