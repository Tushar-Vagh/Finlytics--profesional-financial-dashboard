export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatMonthYear(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function getMonthKey(dateStr) {
  return dateStr.substring(0, 7);
}

export function calculateSummary(transactions) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalBalance: income - expenses,
    totalIncome: income,
    totalExpenses: expenses,
  };
}

export function getMonthlyTrend(transactions) {
  const monthMap = {};

  transactions.forEach((t) => {
    const key = getMonthKey(t.date);
    if (!monthMap[key]) {
      monthMap[key] = { month: key, income: 0, expense: 0 };
    }
    if (t.type === 'income') {
      monthMap[key].income += t.amount;
    } else {
      monthMap[key].expense += t.amount;
    }
  });

  return Object.values(monthMap)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((m) => ({
      ...m,
      monthLabel: formatMonthYear(m.month + '-01'),
      income: Math.round(m.income * 100) / 100,
      expense: Math.round(m.expense * 100) / 100,
    }));
}

export function getCategoryBreakdown(transactions) {
  const catMap = {};

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      if (!catMap[t.category]) {
        catMap[t.category] = 0;
      }
      catMap[t.category] += t.amount;
    });

  return Object.entries(catMap)
    .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
    .sort((a, b) => b.value - a.value);
}

export function filterTransactions(transactions, filters) {
  let result = [...transactions];

  if (filters.search) {
    const query = filters.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query) ||
        String(t.amount).includes(query)
    );
  }

  if (filters.type && filters.type !== 'all') {
    result = result.filter((t) => t.type === filters.type);
  }

  if (filters.category && filters.category !== 'all') {
    result = result.filter((t) => t.category === filters.category);
  }

  if (filters.dateFrom) {
    result = result.filter((t) => t.date >= filters.dateFrom);
  }

  if (filters.dateTo) {
    result = result.filter((t) => t.date <= filters.dateTo);
  }

  return result;
}

export function sortTransactions(transactions, sortKey, sortDir) {
  return [...transactions].sort((a, b) => {
    let comparison = 0;
    if (sortKey === 'date') {
      comparison = a.date.localeCompare(b.date);
    } else if (sortKey === 'amount') {
      comparison = a.amount - b.amount;
    } else if (sortKey === 'category') {
      comparison = a.category.localeCompare(b.category);
    }
    return sortDir === 'asc' ? comparison : -comparison;
  });
}

export function groupTransactions(transactions, groupBy) {
  if (!groupBy || groupBy === 'none') return null;

  const groups = {};
  transactions.forEach((t) => {
    let key;
    if (groupBy === 'category') {
      key = t.category;
    } else if (groupBy === 'month') {
      key = formatMonthYear(t.date);
    } else if (groupBy === 'type') {
      key = t.type === 'income' ? 'Income' : 'Expense';
    }
    if (!groups[key]) groups[key] = [];
    groups[key].push(t);
  });
  return groups;
}

export function exportCSV(transactions) {
  const headers = ['Date', 'Description', 'Amount', 'Category', 'Type'];
  const rows = transactions.map((t) =>
    [t.date, `"${t.description}"`, t.amount, t.category, t.type].join(',')
  );
  const csv = [headers.join(','), ...rows].join('\n');
  downloadFile(csv, 'transactions.csv', 'text/csv');
}

export function exportJSON(transactions) {
  const json = JSON.stringify(transactions, null, 2);
  downloadFile(json, 'transactions.json', 'application/json');
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function calculateInsights(transactions) {
  const insights = [];
  const expenses = transactions.filter((t) => t.type === 'expense');
  const incomes = transactions.filter((t) => t.type === 'income');

  const categoryBreakdown = getCategoryBreakdown(transactions);
  if (categoryBreakdown.length > 0) {
    const topCat = categoryBreakdown[0];
    const totalExpenses = expenses.reduce((s, t) => s + t.amount, 0);
    const pct = totalExpenses > 0 ? ((topCat.value / totalExpenses) * 100).toFixed(1) : 0;
    insights.push({
      id: 'top-spending',
      icon: 'TrendingUp',
      title: 'Highest Spending Category',
      value: topCat.name,
      detail: `${formatCurrency(topCat.value)} (${pct}% of total expenses)`,
      color: 'red',
    });
  }

  const trend = getMonthlyTrend(transactions);
  if (trend.length >= 2) {
    const latest = trend[trend.length - 1];
    const prev = trend[trend.length - 2];
    const expenseChange = latest.expense - prev.expense;
    const expenseChangePct =
      prev.expense > 0 ? ((expenseChange / prev.expense) * 100).toFixed(1) : 0;
    const direction = expenseChange > 0 ? 'increased' : 'decreased';
    insights.push({
      id: 'monthly-compare',
      icon: expenseChange > 0 ? 'ArrowUpRight' : 'ArrowDownRight',
      title: 'Monthly Spending Change',
      value: `${direction === 'increased' ? '+' : ''}${formatCurrency(expenseChange)}`,
      detail: `Spending ${direction} by ${Math.abs(expenseChangePct)}% compared to ${prev.monthLabel}`,
      color: expenseChange > 0 ? 'red' : 'green',
    });

    const incomeChange = latest.income - prev.income;
    const incomeChangePct =
      prev.income > 0 ? ((incomeChange / prev.income) * 100).toFixed(1) : 0;
    insights.push({
      id: 'income-compare',
      icon: incomeChange >= 0 ? 'ArrowUpRight' : 'ArrowDownRight',
      title: 'Monthly Income Change',
      value: `${incomeChange >= 0 ? '+' : ''}${formatCurrency(incomeChange)}`,
      detail: `Income ${incomeChange >= 0 ? 'grew' : 'dropped'} by ${Math.abs(incomeChangePct)}% from ${prev.monthLabel}`,
      color: incomeChange >= 0 ? 'green' : 'red',
    });
  }

  const totalIncome = incomes.reduce((s, t) => s + t.amount, 0);
  const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);
  if (totalIncome > 0) {
    const savingsRate = (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1);
    insights.push({
      id: 'savings-rate',
      icon: 'PiggyBank',
      title: 'Overall Savings Rate',
      value: `${savingsRate}%`,
      detail:
        Number(savingsRate) > 20
          ? 'Great job! You\'re saving more than 20% of your income.'
          : Number(savingsRate) > 0
            ? 'You\'re saving money, but there\'s room to grow.'
            : 'You\'re spending more than you earn. Time to review!',
      color: Number(savingsRate) > 20 ? 'green' : Number(savingsRate) > 0 ? 'yellow' : 'red',
    });
  }

  if (expenses.length > 0) {
    const avgExpense = totalExpense / expenses.length;
    insights.push({
      id: 'avg-expense',
      icon: 'Calculator',
      title: 'Average Expense',
      value: formatCurrency(avgExpense),
      detail: `Across ${expenses.length} expense transactions`,
      color: 'blue',
    });
  }

  return insights;
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
