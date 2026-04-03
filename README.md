# Finance Dashboard

A comprehensive, interactive finance dashboard built with React, featuring real-time data visualization, transaction management, and insightful analytics.

![Finance Dashboard](https://via.placeholder.com/1200x600/6366F1/ffffff?text=Finance+Dashboard)

## Features

### Core Requirements

- [x] **Dashboard Overview**
  - Summary cards (Total Balance, Income, Expenses, Savings Rate)
  - Balance trend visualization (Area chart)
  - Spending breakdown by category (Donut chart)
  - Cash flow comparison view

- [x] **Transactions Section**
  - Full CRUD operations (Admin role)
  - Search functionality
  - Filter by category, type, and date range
  - Sort by date, amount, or category
  - Pagination (10 items per page)
  - Responsive table design

- [x] **Role-Based UI**
  - **Viewer**: Read-only access to all data
  - **Admin**: Full CRUD on transactions
  - Role switcher in header

- [x] **Insights Section**
  - Highest spending category analysis
  - Monthly expense comparison
  - Budget alerts and recommendations

- [x] **State Management**
  - React Context + useReducer
  - Centralized state for transactions, filters, role, and theme

### Optional Enhancements

- [x] **Dark Mode** - System preference detection + manual toggle
- [x] **Data Persistence** - localStorage for transactions, theme, and role
- [x] **Export Functionality** - CSV and JSON export
- [x] **Animations** - Smooth transitions and micro-interactions
- [x] **Responsive Design** - Mobile, tablet, and desktop layouts
- [x] **Toast Notifications** - Success/error feedback

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS Modules (no external CSS frameworks)
- **Charts**: Recharts
- **Date Utilities**: date-fns
- **State Management**: React Context + useReducer

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components (Button, Input, Modal, Toast, etc.)
│   ├── dashboard/       # Dashboard components (SummaryCards, Charts)
│   ├── transactions/    # Transaction components (List, Form, Filters)
│   ├── insights/        # Insights components
│   ├── export/          # Export functionality
│   └── layout/          # Layout components (Header, Sidebar)
├── context/
│   ├── AppContext.jsx   # Global application state
│   └── ThemeContext.jsx # Dark mode state
├── data/
│   └── mockData.js      # Initial transaction data
├── utils/
│   ├── formatters.js    # Currency, date formatting
│   └── calculations.js  # Financial calculations
├── views/
│   └── Views.jsx        # Main view components
├── styles/
│   ├── variables.css    # CSS custom properties
│   ├── global.css       # Reset and base styles
│   └── animations.css   # Keyframe animations
├── App.jsx
└── main.jsx
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd finance-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Usage Guide

### Dashboard View
- View financial summary with interactive charts
- Switch between Balance and Cash Flow chart views
- Hover over chart elements for detailed tooltips

### Transactions View
- **Search**: Use the search bar to find transactions by description or category
- **Filter**: Filter by type (income/expense), category, or date range
- **Sort**: Choose sort order (date, amount, category)
- **Admin Actions**: Add, edit, or delete transactions

### Insights View
- View spending analysis and trends
- Check budget status and recommendations

### Role Switching
- Use the role dropdown in the header to switch between Viewer and Admin
- Admin can modify transactions; Viewer has read-only access

### Theme Toggle
- Click the sun/moon icon to toggle dark/light mode
- Theme preference is saved to localStorage

### Export Data
- Click "Export" to download transactions as CSV or JSON
- Exports respect current filters

## Data Model

```javascript
Transaction {
  id: string (UUID),
  type: 'income' | 'expense',
  amount: number,
  category: string,
  description: string,
  date: string (ISO date),
  createdAt: string (ISO datetime)
}
```

## Categories

**Income:**
- Salary
- Investments
- Freelance
- Other

**Expenses:**
- Food & Dining
- Transportation
- Shopping
- Bills & Utilities
- Entertainment
- Health
- Other

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License

## Author

Built with React and modern web technologies.
