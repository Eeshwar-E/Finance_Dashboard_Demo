import { subDays, subMonths, format } from 'date-fns';

function generateDate(daysAgo) {
  return format(subDays(new Date(), daysAgo), 'yyyy-MM-dd');
}

function generateTransaction(type, amount, category, description, daysAgo) {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substr(2, 9),
    type,
    amount,
    category,
    description,
    date: generateDate(daysAgo),
    createdAt: generateDate(daysAgo),
  };
}

export function getInitialTransactions() {
  const transactions = [
    generateTransaction('income', 8500, 'Salary', 'Monthly Salary - Acme Corp', 5),
    generateTransaction('income', 450, 'Investments', 'Dividend Payment - VTSAX', 12),
    generateTransaction('income', 1200, 'Freelance', 'Website Development - Smith & Co', 20),
    
    generateTransaction('expense', 45.50, 'Food & Dining', 'Whole Foods Market - Weekly Groceries', 2),
    generateTransaction('expense', 18.99, 'Food & Dining', 'Chipotle - Lunch', 3),
    generateTransaction('expense', 67.43, 'Food & Dining', 'Trader Joe\'s - Weekend Groceries', 4),
    generateTransaction('expense', 32.00, 'Food & Dining', 'Starbucks - Morning Coffee', 1),
    generateTransaction('expense', 125.00, 'Food & Dining', 'The Cheesecake Factory - Birthday Dinner', 8),
    generateTransaction('expense', 15.99, 'Food & Dining', 'DoorDash - Late Night Snack', 6),
    
    generateTransaction('expense', 52.00, 'Transportation', 'Shell Gas Station - Full Tank', 3),
    generateTransaction('expense', 25.00, 'Transportation', 'Uber - Airport Ride', 15),
    generateTransaction('expense', 180.00, 'Transportation', 'Monthly Metro Pass', 10),
    generateTransaction('expense', 14.50, 'Transportation', 'Lyft - Weekend Outing', 7),
    
    generateTransaction('expense', 349.99, 'Shopping', 'Amazon - New Headphones (Sony WH-1000XM5)', 5),
    generateTransaction('expense', 89.00, 'Shopping', 'Target - Home Essentials', 9),
    generateTransaction('expense', 156.43, 'Shopping', 'Best Buy - USB-C Cables & Adapters', 12),
    generateTransaction('expense', 45.00, 'Shopping', 'Nike Outlet - Running Shoes', 18),
    generateTransaction('expense', 234.56, 'Shopping', 'IKEA - Desk Lamp & Organization', 22),
    
    generateTransaction('expense', 145.00, 'Bills & Utilities', 'Electric Bill - ConEdison', 14),
    generateTransaction('expense', 85.00, 'Bills & Utilities', 'Internet - Spectrum 500Mbps', 1),
    generateTransaction('expense', 72.50, 'Bills & Utilities', 'Phone Bill - T-Mobile', 8),
    generateTransaction('expense', 18.99, 'Bills & Utilities', 'Netflix Subscription', 3),
    generateTransaction('expense', 14.99, 'Bills & Utilities', 'Spotify Premium', 3),
    generateTransaction('expense', 9.99, 'Bills & Utilities', 'iCloud Storage 200GB', 12),
    
    generateTransaction('expense', 65.00, 'Entertainment', 'AMC Theaters - Movie Night (3 tickets)', 6),
    generateTransaction('expense', 49.99, 'Entertainment', 'PlayStation Plus Annual', 15),
    generateTransaction('expense', 28.00, 'Entertainment', 'Steam Game - Hogwarts Legacy', 20),
    generateTransaction('expense', 180.00, 'Entertainment', 'Concert Tickets - Coldplay', 25),
    generateTransaction('expense', 35.00, 'Entertainment', 'Escape Room Experience', 28),
    
    generateTransaction('expense', 25.00, 'Health', 'CVS Pharmacy - Vitamins & Supplements', 4),
    generateTransaction('expense', 150.00, 'Health', 'Dentist - Regular Checkup', 30),
    generateTransaction('expense', 45.00, 'Health', 'Gym Membership - Planet Fitness', 1),
    generateTransaction('expense', 89.00, 'Health', 'Eye Doctor - Annual Exam', 45),
    
    generateTransaction('expense', 38.50, 'Food & Dining', 'Whole Foods Market - Weekly Groceries', 9),
    generateTransaction('expense', 22.00, 'Food & Dining', 'Sweetgreen - Salad Bowl', 11),
    generateTransaction('expense', 55.00, 'Food & Dining', 'Olive Garden - Family Dinner', 16),
    generateTransaction('expense', 8.50, 'Food & Dining', 'Blue Bottle Coffee', 13),
    
    generateTransaction('expense', 42.00, 'Transportation', 'BP Gas Station', 18),
    generateTransaction('expense', 35.00, 'Transportation', 'Parking - Downtown', 19),
    
    generateTransaction('expense', 199.99, 'Shopping', 'Apple - AirPods Pro 2', 24),
    generateTransaction('expense', 32.00, 'Shopping', 'H&M - New Shirts', 27),
    
    generateTransaction('expense', 285.00, 'Bills & Utilities', 'Rent - Apartment 4B', 2),
    generateTransaction('expense', 45.00, 'Bills & Utilities', 'Gas Bill - National Grid', 22),
    generateTransaction('expense', 12.99, 'Bills & Utilities', 'Disney+ Subscription', 3),
    generateTransaction('expense', 19.99, 'Bills & Utilities', 'YouTube Premium', 3),
    
    generateTransaction('expense', 42.00, 'Entertainment', 'Bowling Alley - Birthday Party', 21),
    generateTransaction('expense', 15.99, 'Entertainment', 'Kindle - E-books', 23),
    
    generateTransaction('expense', 85.00, 'Health', 'Haircut - Great Clips', 14),
    generateTransaction('expense', 120.00, 'Health', 'Yoga Classes - 10 Pack', 17),
    
    generateTransaction('income', 3200, 'Salary', 'Bi-weekly Paycheck - Acme Corp', 19),
    generateTransaction('income', 75.00, 'Investments', 'Interest Income - High-Yield Savings', 25),
    generateTransaction('income', 500, 'Freelance', 'Logo Design - Local Bakery', 35),
    
    generateTransaction('expense', 48.75, 'Food & Dining', 'Whole Foods Market - Weekly Groceries', 16),
    generateTransaction('expense', 28.50, 'Food & Dining', 'Shake Shack - Lunch', 17),
    
    generateTransaction('expense', 2100.00, 'Shopping', 'MacBook Pro 14" - Apple Store', 40),
    
    generateTransaction('expense', 95.00, 'Transportation', 'Delta Airlines - Flight to Chicago', 50),
    generateTransaction('expense', 85.00, 'Transportation', 'Hotel - Hyatt Regency', 49),
    generateTransaction('expense', 150.00, 'Transportation', 'Car Rental - Enterprise', 49),
    
    generateTransaction('expense', 320.00, 'Entertainment', 'Las Vegas Trip - Shows & Activities', 55),
    generateTransaction('expense', 180.00, 'Entertainment', 'Dinner Cruise - San Francisco Bay', 52),
    
    generateTransaction('expense', 65.00, 'Food & Dining', 'Nobu Restaurant - Anniversary Dinner', 60),
    
    generateTransaction('income', 8500, 'Salary', 'Monthly Salary - Acme Corp', 35),
    generateTransaction('income', 3200, 'Salary', 'Bi-weekly Paycheck - Acme Corp', 33),
    
    generateTransaction('expense', 55.00, 'Shopping', 'Nordstrom Rack - Dress Shirts', 42),
    generateTransaction('expense', 28.00, 'Shopping', 'HomeGoods - Decorative Items', 44),
    
    generateTransaction('expense', 38.00, 'Food & Dining', 'Local Bakery - Weekend Brunch', 38),
    generateTransaction('expense', 95.00, 'Food & Dining', 'Wine Tasting Event - Napa Valley', 41),
    
    generateTransaction('expense', 350.00, 'Health', 'Physical Therapy Sessions', 48),
    
    generateTransaction('expense', 125.00, 'Bills & Utilities', 'Car Insurance - GEICO', 45),
    generateTransaction('expense', 89.00, 'Bills & Utilities', 'Electric Bill - ConEdison', 46),
  ];
  
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export const categories = [
  { value: 'all', label: 'All Categories', icon: '📊' },
  { value: 'Food & Dining', label: 'Food & Dining', icon: '🍽️' },
  { value: 'Transportation', label: 'Transportation', icon: '🚗' },
  { value: 'Shopping', label: 'Shopping', icon: '🛍️' },
  { value: 'Bills & Utilities', label: 'Bills & Utilities', icon: '📄' },
  { value: 'Entertainment', label: 'Entertainment', icon: '🎬' },
  { value: 'Health', label: 'Health', icon: '💊' },
  { value: 'Salary', label: 'Salary', icon: '💼' },
  { value: 'Investments', label: 'Investments', icon: '📈' },
  { value: 'Freelance', label: 'Freelance', icon: '💻' },
  { value: 'Other', label: 'Other', icon: '📦' },
];

export const categoryColors = {
  'Food & Dining': '#F59E0B',
  'Transportation': '#3B82F6',
  'Shopping': '#EC4899',
  'Bills & Utilities': '#8B5CF6',
  'Entertainment': '#EF4444',
  'Health': '#10B981',
  'Salary': '#6366F1',
  'Investments': '#14B8A6',
  'Freelance': '#F97316',
  'Other': '#64748B',
};
