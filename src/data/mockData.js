const categories = {
  income: ['Salary', 'Freelance', 'Investments', 'Refunds'],
  expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Education', 'Travel'],
};

const allCategories = [...categories.income, ...categories.expense];

let idCounter = 1;
function tx(date, description, amount, category, type) {
  return {
    id: String(idCounter++),
    date,
    description,
    amount: Math.round(amount * 100) / 100,
    category,
    type,
  };
}

const mockTransactions = [
  tx('2026-01-02', 'Monthly Salary', 5200, 'Salary', 'income'),
  tx('2026-01-04', 'Grocery Store', 127.45, 'Food', 'expense'),
  tx('2026-01-06', 'Netflix Subscription', 15.99, 'Entertainment', 'expense'),
  tx('2026-01-08', 'Freelance Project - Logo Design', 850, 'Freelance', 'income'),
  tx('2026-01-10', 'Electric Bill', 94.30, 'Bills', 'expense'),
  tx('2026-01-12', 'Gas Station', 52.10, 'Transport', 'expense'),
  tx('2026-01-15', 'Online Course - React Advanced', 49.99, 'Education', 'expense'),
  tx('2026-01-18', 'Pharmacy', 32.50, 'Health', 'expense'),
  tx('2026-01-20', 'Restaurant Dinner', 78.60, 'Food', 'expense'),
  tx('2026-01-25', 'Dividend Income', 120, 'Investments', 'income'),

  tx('2026-02-01', 'Monthly Salary', 5200, 'Salary', 'income'),
  tx('2026-02-03', 'Supermarket', 142.80, 'Food', 'expense'),
  tx('2026-02-05', 'Spotify + Apple Music', 19.98, 'Entertainment', 'expense'),
  tx('2026-02-07', 'Uber Rides', 45.30, 'Transport', 'expense'),
  tx('2026-02-10', 'Internet Bill', 65.00, 'Bills', 'expense'),
  tx('2026-02-12', 'Freelance - Website Revamp', 1200, 'Freelance', 'income'),
  tx('2026-02-14', 'Valentine\'s Day Dinner', 135.00, 'Food', 'expense'),
  tx('2026-02-16', 'New Headphones', 249.99, 'Shopping', 'expense'),
  tx('2026-02-20', 'Gym Membership', 45.00, 'Health', 'expense'),
  tx('2026-02-22', 'Product Refund', 89.99, 'Refunds', 'income'),

  tx('2026-03-01', 'Monthly Salary', 5400, 'Salary', 'income'),
  tx('2026-03-03', 'Weekly Groceries', 98.20, 'Food', 'expense'),
  tx('2026-03-05', 'Movie Tickets', 32.00, 'Entertainment', 'expense'),
  tx('2026-03-07', 'Car Maintenance', 320.00, 'Transport', 'expense'),
  tx('2026-03-10', 'Phone Bill', 55.00, 'Bills', 'expense'),
  tx('2026-03-12', 'Freelance - App UI', 950, 'Freelance', 'income'),
  tx('2026-03-14', 'Coffee & Snacks', 24.50, 'Food', 'expense'),
  tx('2026-03-16', 'New Sneakers', 129.99, 'Shopping', 'expense'),
  tx('2026-03-18', 'Dentist Appointment', 180.00, 'Health', 'expense'),
  tx('2026-03-22', 'Stock Dividend', 150.00, 'Investments', 'income'),
  tx('2026-03-25', 'Electricity Bill', 88.50, 'Bills', 'expense'),
  tx('2026-03-28', 'Weekend Trip', 420.00, 'Travel', 'expense'),

  tx('2026-04-01', 'Monthly Salary', 5400, 'Salary', 'income'),

  tx('2025-11-01', 'Monthly Salary', 5000, 'Salary', 'income'),
  tx('2025-11-05', 'Groceries', 110.30, 'Food', 'expense'),
  tx('2025-11-08', 'Gaming Subscription', 14.99, 'Entertainment', 'expense'),
  tx('2025-11-10', 'Fuel', 61.40, 'Transport', 'expense'),
  tx('2025-11-15', 'Water & Gas Bill', 72.00, 'Bills', 'expense'),
  tx('2025-11-18', 'Freelance - Branding', 700, 'Freelance', 'income'),
  tx('2025-11-20', 'Winter Jacket', 189.99, 'Shopping', 'expense'),
  tx('2025-11-25', 'Thanksgiving Dinner', 95.00, 'Food', 'expense'),

  tx('2025-12-01', 'Monthly Salary', 5000, 'Salary', 'income'),
  tx('2025-12-05', 'Holiday Shopping', 456.78, 'Shopping', 'expense'),
  tx('2025-12-08', 'Concert Tickets', 120.00, 'Entertainment', 'expense'),
  tx('2025-12-10', 'Train Pass', 85.00, 'Transport', 'expense'),
  tx('2025-12-12', 'Year-end Bonus', 2000, 'Salary', 'income'),
  tx('2025-12-15', 'Heating Bill', 110.00, 'Bills', 'expense'),
  tx('2025-12-18', 'Freelance - Holiday Cards', 350, 'Freelance', 'income'),
  tx('2025-12-20', 'Christmas Gifts', 320.00, 'Shopping', 'expense'),
  tx('2025-12-22', 'Annual Health Checkup', 250.00, 'Health', 'expense'),
  tx('2025-12-28', 'New Year Travel', 580.00, 'Travel', 'expense'),
  tx('2025-12-30', 'Investment Returns', 200.00, 'Investments', 'income'),
];

export { mockTransactions, categories, allCategories };
