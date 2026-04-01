import { useMemo } from 'react';
import { useTransactions } from '../context/AppContext';
import {
  calculateInsights,
  getMonthlyTrend,
  getCategoryBreakdown,
  formatCurrency,
} from '../utils/helpers';
import InsightCard from '../components/InsightCard';
import { MiniTrendChart } from '../components/Chart';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const COLORS = [
  '#14b8a6', '#f43f5e', '#8b5cf6', '#f59e0b',
  '#3b82f6', '#ec4899', '#06b6d4', '#84cc16',
];

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        padding: '10px 14px',
        boxShadow: 'var(--shadow-lg)',
        fontSize: '0.82rem',
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 4, color: 'var(--text-primary)' }}>
        {label}
      </div>
      {payload.map((entry, idx) => (
        <div key={idx} style={{ color: 'var(--text-secondary)' }}>
          <span style={{ textTransform: 'capitalize' }}>{entry.name}: </span>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
            ${entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Insights() {
  const { transactions, loading } = useTransactions();

  const insights = useMemo(() => calculateInsights(transactions), [transactions]);
  const trend = useMemo(() => getMonthlyTrend(transactions), [transactions]);
  const categoryData = useMemo(() => getCategoryBreakdown(transactions), [transactions]);

  const savingsData = useMemo(
    () =>
      trend.map((m) => ({
        ...m,
        savings: Math.round((m.income - m.expense) * 100) / 100,
      })),
    [trend]
  );

  if (loading) {
    return (
      <div>
        <div className="insights-grid">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="skeleton" style={{ height: 180 }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Insights</h2>
          <p>Smart observations about your financial activity.</p>
        </div>
      </div>

      <div className="insights-grid">
        {insights.map((insight, idx) => (
          <InsightCard key={insight.id} insight={insight} delay={idx * 0.1} />
        ))}
      </div>

      <div className="charts-grid">
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="chart-title">Monthly Savings</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={savingsData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="monthLabel" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v.toLocaleString()}`} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="savings" radius={[6, 6, 0, 0]} maxBarSize={40}>
                {savingsData.map((entry, idx) => (
                  <Cell
                    key={idx}
                    fill={entry.savings >= 0 ? '#34d399' : '#fb7185'}
                    fillOpacity={0.8}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="chart-title">Expense Trend</h3>
          <MiniTrendChart data={trend} dataKey="expense" color="#fb7185" />
          <div style={{ marginTop: 20 }}>
            <h3 className="chart-title" style={{ marginBottom: 8 }}>
              Income Trend
            </h3>
            <MiniTrendChart data={trend} dataKey="income" color="#34d399" />
          </div>
        </motion.div>
      </div>

      <motion.div
        className="chart-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ marginTop: 20 }}
      >
        <h3 className="chart-title">Top Spending Categories</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {categoryData.slice(0, 6).map((cat, idx) => {
            const maxVal = categoryData[0]?.value || 1;
            const pct = (cat.value / maxVal) * 100;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.08 }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 6,
                    fontSize: '0.85rem',
                  }}
                >
                  <span style={{ fontWeight: 500 }}>{cat.name}</span>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
                    {formatCurrency(cat.value)}
                  </span>
                </div>
                <div
                  style={{
                    height: 10,
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-surface-elevated)',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: 0.5 + idx * 0.08 }}
                    style={{
                      height: '100%',
                      borderRadius: 'var(--radius-full)',
                      background: COLORS[idx % COLORS.length],
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
