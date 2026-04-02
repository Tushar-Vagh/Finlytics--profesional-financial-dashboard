import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransactions, useRole } from '../context/AppContext';
import {
  formatDate,
  formatCurrency,
  filterTransactions,
  sortTransactions,
  groupTransactions,
} from '../utils/helpers';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  Inbox,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export default function TransactionTable({ onEdit }) {
  const { transactions, filters, sortConfig, setSortConfig, deleteTransaction } =
    useTransactions();
  const { role } = useRole();
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = useMemo(
    () => filterTransactions(transactions, filters),
    [transactions, filters]
  );

  const sorted = useMemo(
    () => sortTransactions(filtered, sortConfig.key, sortConfig.dir),
    [filtered, sortConfig]
  );

  const groups = useMemo(
    () => groupTransactions(sorted, filters.groupBy),
    [sorted, filters.groupBy]
  );

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    if (groups) return sorted;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sorted.slice(start, start + ITEMS_PER_PAGE);
  }, [sorted, currentPage, groups]);

  useMemo(() => setCurrentPage(1), [filters]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      dir: prev.key === key && prev.dir === 'desc' ? 'asc' : 'desc',
    }));
  };

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <ArrowUpDown size={14} className="sort-icon" />;
    return sortConfig.dir === 'asc' ? (
      <ArrowUp size={14} className="sort-icon" />
    ) : (
      <ArrowDown size={14} className="sort-icon" />
    );
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
    setConfirmDelete(null);
  };

  const renderRow = (tx) => (
    <motion.tr
      key={tx.id}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
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
        <span className={`tx-type-badge ${tx.type}`}>
          <span>{tx.type}</span>
        </span>
      </td>
      {role === 'admin' && (
        <td>
          <div className="tx-actions">
            <button title="Edit" onClick={() => onEdit(tx)}>
              <Pencil size={15} />
            </button>
            <button
              title="Delete"
              className="delete"
              onClick={() => setConfirmDelete(tx.id)}
            >
              <Trash2 size={15} />
            </button>
          </div>
        </td>
      )}
    </motion.tr>
  );

  const renderTableHead = () => (
    <thead>
      <tr>
        <th
          className={sortConfig.key === 'date' ? 'sorted' : ''}
          onClick={() => handleSort('date')}
        >
          Date <SortIcon column="date" />
        </th>
        <th>Description</th>
        <th
          className={sortConfig.key === 'amount' ? 'sorted' : ''}
          onClick={() => handleSort('amount')}
        >
          Amount <SortIcon column="amount" />
        </th>
        <th
          className={sortConfig.key === 'category' ? 'sorted' : ''}
          onClick={() => handleSort('category')}
        >
          Category <SortIcon column="category" />
        </th>
        <th>Type</th>
        {role === 'admin' && <th>Actions</th>}
      </tr>
    </thead>
  );

  if (sorted.length === 0) {
    return (
      <div className="table-card">
        <div className="table-header">
          <h3>Transactions</h3>
        </div>
        <div className="table-empty">
          <div className="empty-icon">
            <Inbox size={28} />
          </div>
          <h4>No transactions found</h4>
          <p>Try adjusting your filters or add a new transaction.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="table-card">
        <div className="table-header">
          <h3>
            Transactions{' '}
            <span className="text-muted text-xs">({sorted.length} results)</span>
          </h3>
        </div>

        <div className="table-wrapper">
          {groups ? (
            <table className="tx-table">
              {renderTableHead()}
              <tbody>
                {Object.entries(groups).map(([groupName, items]) => (
                  <AnimatePresence key={groupName}>
                    <tr>
                      <td
                        colSpan={role === 'admin' ? 6 : 5}
                        className="group-header"
                      >
                        {groupName} ({items.length})
                      </td>
                    </tr>
                    {items.map(renderRow)}
                  </AnimatePresence>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="tx-table">
              {renderTableHead()}
              <tbody>
                <AnimatePresence>{paginated.map(renderRow)}</AnimatePresence>
              </tbody>
            </table>
          )}
        </div>

        {!groups && totalPages > 1 && (
          <div className="table-pagination">
            <span>
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, sorted.length)} of {sorted.length}
            </span>
            <div className="pagination-buttons">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - currentPage) <= 1
                )
                .map((p, idx, arr) => (
                  <span key={p} style={{ display: 'contents' }}>
                    {idx > 0 && arr[idx - 1] !== p - 1 && (
                      <button disabled style={{ border: 'none', background: 'none' }}>
                        …
                      </button>
                    )}
                    <button
                      className={currentPage === p ? 'active' : ''}
                      onClick={() => setCurrentPage(p)}
                    >
                      {p}
                    </button>
                  </span>
                ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>


      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            className="confirm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setConfirmDelete(null)}
          >
            <motion.div
              className="confirm-box"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h4>Delete Transaction?</h4>
              <p>This action cannot be undone.</p>
              <div className="confirm-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setConfirmDelete(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(confirmDelete)}
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
