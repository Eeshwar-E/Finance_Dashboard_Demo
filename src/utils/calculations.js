import { subMonths, startOfMonth, endOfMonth, isWithinInterval, format } from 'date-fns';
import { filterByDateRange } from './formatters';

export function calculateTotalBalance(transactions) {
  return transactions.reduce((acc, t) => {
    return t.type === 'income' ? acc + t.amount : acc - t.amount;
  }, 0);
}

export function calculateTotalIncome(transactions) {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
}

export function calculateTotalExpenses(transactions) {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
}

export function calculateSavingsRate(transactions) {
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);
  if (income === 0) return 0;
  return ((income - expenses) / income) * 100;
}

export function getSpendingByCategory(transactions) {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const byCategory = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  
  return Object.entries(byCategory)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
}

export function getHighestSpendingCategory(transactions, dateRange = 'month') {
  const filtered = filterByDateRange(transactions, dateRange);
  const spending = getSpendingByCategory(filtered);
  return spending[0] || null;
}

export function getMonthlyData(transactions, months = 6) {
  const now = new Date();
  const data = [];
  
  for (let i = months - 1; i >= 0; i--) {
    const date = subMonths(now, i);
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    
    const monthTransactions = transactions.filter((t) =>
      isWithinInterval(new Date(t.date), { start, end })
    );
    
    const income = calculateTotalIncome(monthTransactions);
    const expenses = calculateTotalExpenses(monthTransactions);
    
    data.push({
      month: format(date, 'MMM'),
      fullMonth: format(date, 'MMMM yyyy'),
      income,
      expenses,
      balance: income - expenses,
    });
  }
  
  return data;
}

export function getBalanceTrend(transactions, months = 6) {
  const monthlyData = getMonthlyData(transactions, months);
  let runningBalance = 0;
  
  return monthlyData.map((data) => {
    runningBalance += data.balance;
    return {
      month: data.month,
      fullMonth: data.fullMonth,
      balance: runningBalance,
      income: data.income,
      expenses: data.expenses,
    };
  });
}

export function compareMonths(transactions) {
  const now = new Date();
  const currentMonth = transactions.filter((t) =>
    isWithinInterval(new Date(t.date), { start: startOfMonth(now), end: endOfMonth(now) })
  );
  const lastMonth = transactions.filter((t) =>
    isWithinInterval(new Date(t.date), { start: startOfMonth(subMonths(now, 1)), end: endOfMonth(subMonths(now, 1)) })
  );
  
  const currentExpenses = calculateTotalExpenses(currentMonth);
  const lastExpenses = calculateTotalExpenses(lastMonth);
  
  const diff = currentExpenses - lastExpenses;
  const percentChange = lastExpenses === 0 ? 0 : ((diff / lastExpenses) * 100);
  
  return {
    current: currentExpenses,
    last: lastExpenses,
    diff,
    percentChange,
    direction: diff > 0 ? 'up' : diff < 0 ? 'down' : 'same',
  };
}

export function filterTransactions(transactions, filters) {
  let filtered = [...transactions];
  
  if (filters.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.description.toLowerCase().includes(search) ||
        t.category.toLowerCase().includes(search)
    );
  }
  
  if (filters.category !== 'all') {
    filtered = filtered.filter((t) => t.category === filters.category);
  }
  
  if (filters.type !== 'all') {
    filtered = filtered.filter((t) => t.type === filters.type);
  }
  
  if (filters.dateRange !== 'all') {
    filtered = filterByDateRange(filtered, filters.dateRange);
  }
  
  filtered.sort((a, b) => {
    let comparison = 0;
    
    switch (filters.sortBy) {
      case 'date':
        comparison = new Date(a.date) - new Date(b.date);
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
      default:
        comparison = 0;
    }
    
    return filters.sortOrder === 'desc' ? -comparison : comparison;
  });
  
  return filtered;
}

export function getTrendPercentage(current, previous) {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}
