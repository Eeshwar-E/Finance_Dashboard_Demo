import { format, subDays, subMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

export function formatCurrency(amount, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date, formatStr = 'MMM dd, yyyy') {
  return format(new Date(date), formatStr);
}

export function formatShortDate(date) {
  return format(new Date(date), 'MMM dd');
}

export function formatMonthYear(date) {
  return format(new Date(date), 'MMMM yyyy');
}

export function formatPercentage(value, decimals = 1) {
  return `${value.toFixed(decimals)}%`;
}

export function getDateRangeFilter(range) {
  const now = new Date();
  
  switch (range) {
    case 'today':
      return { start: subDays(now, 0), end: now };
    case 'week':
      return { start: subDays(now, 7), end: now };
    case 'month':
      return { start: startOfMonth(now), end: endOfMonth(now) };
    case '3months':
      return { start: subMonths(now, 3), end: now };
    case '6months':
      return { start: subMonths(now, 6), end: now };
    case 'year':
      return { start: subMonths(now, 12), end: now };
    default:
      return null;
  }
}

export function filterByDateRange(transactions, dateRange) {
  const range = getDateRangeFilter(dateRange);
  if (!range) return transactions;
  
  return transactions.filter((t) =>
    isWithinInterval(new Date(t.date), { start: range.start, end: range.end })
  );
}
