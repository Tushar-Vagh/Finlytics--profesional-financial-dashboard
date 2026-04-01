import { useMemo } from 'react';
import { useTransactions, useNav } from '../context/AppContext';
import {
  formatCurrency,
  calculateSummary,
  getMonthlyTrend,
  getCategoryBreakdown,
  formatDate,
} from '../utils/helpers';
import SummaryCard from '../components/SummaryCard';
import { TrendChart, CategoryChart } from '../components/Chart';
import { Wallet, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { transactions, loading } = useTransactions();
  const { setCurrentPage } = useNav();

  const summary = useMemo(() => calculateSummary(transactions), [transactions]);
  const trend = useMemo(() => getMonthlyTrend(transactions), [transactions]);
  const categoryData = useMemo(() => getCategoryBreakdown(transactions), [transactions]);
  const recentTransactions = useMemo(
    () =>
      [...transactions]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 5),
    [transactions]
  );

  if (loading) {
    return (
      <div>
        <div className="summary-cards">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton skeleton-card" />
          ))}
        </div>
        <div className="charts-grid">
          <div className="skeleton skeleton-chart" />
          <div className="skeleton skeleton-chart" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Welcome back 👋</h2>
          <p>Here's what's happening with your finances.</p>
        </div>
      </div>

      <div className="summary-cards">
        <SummaryCard
          label="Total Balance"
          value={formatCurrency(summary.totalBalance)}
          icon={Wallet}
          type="balance"
          delay={0}
        />
        <SummaryCard
          label="Total Income"
          value={formatCurrency(summary.totalIncome)}
          icon={TrendingUp}
          type="income"
          delay={0.1}
        />
        <SummaryCard
          label="Total Expenses"
          value={formatCurrency(summary.totalExpenses)}
          icon={TrendingDown}
          type="expense"
          delay={0.2}
        />
      </div>

      <div className="charts-grid">
        <TrendChart data={trend} />
        <CategoryChart data={categoryData} />
      </div>

      <motion.div
        className="table-card recent-tx-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="table-header">
          <h3>Recent Transactions</h3>
          <button
            className="view-all-link"
            onClick={() => setCurrentPage('transactions')}
          >
            View all <ArrowRight size={14} style={{ verticalAlign: 'middle' }} />
          </button>
        </div>
        <div className="table-wrapper">
          <table className="tx-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{formatDate(tx.date)}</td>
                  <td className="tx-description">{tx.description}</td>
                  <td className={`tx-amount ${tx.type}`}>
                    {tx.type === 'income' ? '+' : '-'}
                    {formatCurrency(tx.amount)}
                  </td>
                  <td>
                    <span className="tx-category-badge">{tx.category}</span>
                  </td>
                  <td>
                    <span className={`tx-type-badge ${tx.type}`}>{tx.type}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
