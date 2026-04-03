# Finance Dashboard - Specification

## Concept & Vision

A sleek, professional finance dashboard that feels like a premium fintech app. The design evokes trust and clarity—think Mint meets Linear. Users should feel empowered and in control of their financial data with smooth interactions and thoughtful data visualizations.

## Design Language

### Aesthetic Direction
Modern fintech aesthetic with glassmorphism touches. Clean card-based layout with subtle depth through shadows and borders. Professional yet approachable.

### Color Palette
- **Primary**: `#6366F1` (Indigo - trust, stability)
- **Secondary**: `#8B5CF6` (Purple - growth)
- **Success/Income**: `#10B981` (Emerald)
- **Danger/Expense**: `#EF4444` (Red)
- **Warning**: `#F59E0B` (Amber)
- **Background Light**: `#F8FAFC`
- **Background Dark**: `#0F172A`
- **Card Light**: `#FFFFFF`
- **Card Dark**: `#1E293B`
- **Text Primary Light**: `#1E293B`
- **Text Primary Dark**: `#F1F5F9`
- **Text Secondary**: `#64748B`

### Typography
- **Primary Font**: Inter (Google Fonts) - clean, modern, excellent for numbers
- **Monospace (amounts)**: JetBrains Mono - clear number distinction
- **Scale**: 12px (xs), 14px (sm), 16px (base), 18px (lg), 24px (xl), 32px (2xl), 48px (3xl)

### Spatial System
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px
- Card padding: 24px
- Card border-radius: 16px
- Button border-radius: 8px

### Motion Philosophy
- Transitions: 200ms ease-out for hover states, 300ms for layout changes
- Micro-interactions: subtle scale (1.02) on card hover
- Page transitions: fade-in with slight upward motion
- Chart animations: 600ms staggered bar/line animations

## Layout & Structure

### Overall Architecture
```
┌─────────────────────────────────────────────────────────┐
│  Header: Logo | Role Switcher | Theme Toggle | User     │
├────────────┬────────────────────────────────────────────┤
│            │                                            │
│  Sidebar   │  Main Content Area                         │
│  - Dashboard│  ┌──────────────────────────────────────┐ │
│  - Trans.  │  │  Summary Cards Row                   │ │
│  - Insights│  └──────────────────────────────────────┘ │
│            │  ┌─────────────────┐ ┌──────────────────┐ │
│            │  │ Balance Chart   │ │ Spending Breakdown│ │
│            │  └─────────────────┘ └──────────────────┘ │
│            │  ┌──────────────────────────────────────┐ │
│            │  │  Transactions Table                   │ │
│            │  └──────────────────────────────────────┘ │
└────────────┴────────────────────────────────────────────┘
```

### Responsive Strategy
- **Desktop (1280px+)**: Full sidebar + 3-column cards + side-by-side charts
- **Tablet (768px-1279px)**: Collapsible sidebar, 2-column cards, stacked charts
- **Mobile (<768px)**: Bottom nav, single column, full-width charts

## Features & Interactions

### 1. Summary Cards
Four cards displaying:
- **Total Balance**: Large number, trend indicator (up/down %), current vs last month
- **Total Income**: Green accent, monthly total with comparison
- **Total Expenses**: Red accent, monthly total with comparison
- **Savings Rate**: Percentage with visual progress bar

**Interactions:**
- Hover: subtle lift effect (translateY -2px, shadow increase)
- Click: navigates to relevant detailed view

### 2. Balance Trend Chart
- Line chart showing balance over time (6 months)
- Gradient fill under line
- Interactive tooltips on hover
- Toggle between weekly/monthly view

### 3. Spending Breakdown Chart
- Donut chart with category breakdown
- Legend with category names and percentages
- Center shows total or selected category
- Hover highlights segment

### 4. Transactions Section
**Features:**
- Search bar with instant filtering
- Filter by: Category, Type (Income/Expense), Date Range
- Sort by: Date, Amount, Category
- Pagination: 10 items per page

**Transaction Row:**
- Date (formatted: "Mar 15, 2024")
- Description/Merchant name
- Category with icon
- Amount (green for income, red for expense)
- Actions (Admin only): Edit, Delete

**Empty State:**
- Illustration placeholder
- "No transactions found" message
- Suggestion to add new transaction (Admin)

**Admin Add/Edit Modal:**
- Fields: Type, Amount, Category, Description, Date
- Form validation
- Success/error feedback

### 5. Role-Based UI
- **Viewer Role**: 
  - Can view all data
  - No add/edit/delete buttons visible
  - Read-only indicators
- **Admin Role**:
  - Full CRUD on transactions
  - Edit/Delete buttons on transactions
  - "Add Transaction" button
  - Visual badge indicating admin status

**Role Switcher:** Dropdown in header with role indicator

### 6. Insights Section
Three insight cards:
1. **Highest Spending Category**: Category name + icon + amount + % of total
2. **Monthly Comparison**: Bar chart comparing last 3 months
3. **Spending Streak**: Days since last overspending + warning if exceeded

### 7. Dark Mode
- Toggle in header
- Smooth transition animation
- Persisted in localStorage
- System preference detection on first load

### 8. Data Persistence
- All transactions saved to localStorage
- Theme preference saved
- Role selection saved (for demo purposes)

### 9. Export Functionality
- Export to CSV
- Export to JSON
- Filter-aware (exports filtered data)

## Component Inventory

### Header
- Logo/Brand name (left)
- Role switcher dropdown (center-right)
- Theme toggle (sun/moon icon button)
- User avatar with name (right)

### Sidebar/Navigation
- Nav items with icons
- Active state indicator (left border accent)
- Hover state (background highlight)
- Collapse button for mobile

### Summary Card
- Icon (top-left, colored background)
- Title (small, muted)
- Value (large, bold)
- Trend indicator (up/down arrow + percentage)
- States: default, hover, loading (skeleton)

### Chart Components
- Consistent padding and margins
- Clear axis labels
- Tooltip component (dark bg, white text)
- Loading state (animated skeleton)
- Empty state (placeholder message)

### Transaction Row
- Hover background change
- Selected state for bulk actions
- Loading skeleton variant
- Responsive: stack info on mobile

### Modal
- Backdrop blur
- Centered with max-width
- Close button (X)
- Form with validation states
- Success/Error toast on submit

### Buttons
- Primary: filled with primary color
- Secondary: outlined
- Danger: red for delete actions
- States: default, hover, active, disabled, loading

### Form Inputs
- Label above input
- Focus ring (primary color)
- Error state (red border + message)
- Success state (green border)

### Toast Notifications
- Position: top-right
- Types: success (green), error (red), info (blue)
- Auto-dismiss after 4 seconds
- Manual dismiss button

## Technical Approach

### Framework & Setup
- React 18 with Vite
- CSS Modules for styling (no Tailwind per instructions)
- React Context for state management
- Recharts for data visualization
- date-fns for date formatting

### Project Structure
```
src/
├── components/
│   ├── common/          (Button, Input, Modal, Toast, etc.)
│   ├── dashboard/       (SummaryCard, Charts, etc.)
│   ├── transactions/    (TransactionList, TransactionForm, etc.)
│   └── layout/          (Header, Sidebar, Layout)
├── context/
│   ├── AppContext.jsx   (Global state)
│   └── ThemeContext.jsx (Dark mode)
├── hooks/
│   ├── useLocalStorage.js
│   └── useTransactions.js
├── data/
│   └── mockData.js      (Initial transaction data)
├── styles/
│   ├── variables.css    (CSS custom properties)
│   ├── global.css       (Reset, base styles)
│   └── animations.css   (Keyframes)
├── utils/
│   ├── formatters.js    (Currency, date formatting)
│   └── calculations.js  (Financial calculations)
├── App.jsx
└── main.jsx
```

### State Management
Using React Context with useReducer:
- `transactions`: Array of transaction objects
- `filters`: { search, category, type, dateRange, sortBy, sortOrder }
- `role`: 'viewer' | 'admin'
- `theme`: 'light' | 'dark'
- Actions: ADD_TRANSACTION, UPDATE_TRANSACTION, DELETE_TRANSACTION, SET_FILTERS, SET_ROLE, SET_THEME

### Data Model
```javascript
Transaction {
  id: string (uuid),
  type: 'income' | 'expense',
  amount: number,
  category: string,
  description: string,
  date: string (ISO date),
  createdAt: string (ISO datetime)
}

Categories: ['Food & Dining', 'Transportation', 'Shopping', 'Bills & Utilities', 
             'Entertainment', 'Health', 'Salary', 'Investments', 'Other']
```

### Mock Data
- 50+ realistic transactions spanning 6 months
- Mix of income (salary, investments) and expenses
- Varied categories
- Realistic merchant names and descriptions
