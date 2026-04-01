import { useState, useCallback } from 'react';
import { useTransactions, useRole } from '../context/AppContext';
import { exportCSV, exportJSON } from '../utils/helpers';
import { filterTransactions } from '../utils/helpers';
import FilterBar from '../components/FilterBar';
import TransactionTable from '../components/TransactionTable';
import TransactionForm from '../components/TransactionForm';
import { Plus, Download, FileJson, RotateCcw } from 'lucide-react';

export default function Transactions() {
  const {
    transactions,
    loading,
    filters,
    resetFilters,
    addTransaction,
    updateTransaction,
  } = useTransactions();
  const { role } = useRole();

  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleAdd = () => {
    setEditData(null);
    setFormOpen(true);
  };

  const handleEdit = useCallback((tx) => {
    setEditData(tx);
    setFormOpen(true);
  }, []);

  const handleFormSubmit = async (data) => {
    if (editData) {
      await updateTransaction(editData.id, data);
    } else {
      await addTransaction(data);
    }
  };

  const handleExportCSV = () => {
    const filtered = filterTransactions(transactions, filters);
    exportCSV(filtered);
  };

  const handleExportJSON = () => {
    const filtered = filterTransactions(transactions, filters);
    exportJSON(filtered);
  };

  if (loading) {
    return (
      <div>
        <div className="skeleton" style={{ height: 44, marginBottom: 20 }} />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton skeleton-table-row" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h2>Transactions</h2>
          <p>View and manage all your financial transactions.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-secondary btn-sm" onClick={resetFilters}>
            <RotateCcw size={14} />
            Reset
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleExportCSV}>
            <Download size={14} />
            CSV
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleExportJSON}>
            <FileJson size={14} />
            JSON
          </button>
          {role === 'admin' && (
            <button className="btn btn-primary btn-sm" onClick={handleAdd}>
              <Plus size={14} />
              Add Transaction
            </button>
          )}
        </div>
      </div>

      <FilterBar />
      <TransactionTable onEdit={handleEdit} />

      <TransactionForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        editData={editData}
      />
    </div>
  );
}
