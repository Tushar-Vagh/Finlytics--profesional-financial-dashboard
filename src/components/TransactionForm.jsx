import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { categories as catGroups } from '../data/mockData';
import Dropdown from './Dropdown';

const typeOptions = [
  { value: 'expense', label: 'Expense' },
  { value: 'income', label: 'Income' },
];

const defaultForm = {
  date: new Date().toISOString().split('T')[0],
  description: '',
  amount: '',
  category: 'Food',
  type: 'expense',
};

export default function TransactionForm({ isOpen, onClose, onSubmit, editData }) {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setForm({
        date: editData.date,
        description: editData.description,
        amount: String(editData.amount),
        category: editData.category,
        type: editData.type,
      });
    } else {
      setForm(defaultForm);
    }
    setErrors({});
  }, [editData, isOpen]);

  const availableCategories =
    form.type === 'income' ? catGroups.income : catGroups.expense;

  const categoryOptions = availableCategories.map((c) => ({ value: c, label: c }));

  // Reset category if switching type and current category doesn't match
  useEffect(() => {
    if (!availableCategories.includes(form.category)) {
      setForm((prev) => ({ ...prev, category: availableCategories[0] }));
    }
  }, [form.type]);

  const validate = () => {
    const errs = {};
    if (!form.date) errs.date = 'Required';
    if (!form.description.trim()) errs.description = 'Required';
    if (!form.amount || Number(form.amount) <= 0) errs.amount = 'Enter a valid amount';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit({
      ...form,
      amount: parseFloat(form.amount),
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>{editData ? 'Edit Transaction' : 'Add Transaction'}</h3>
              <button className="close-btn" onClick={onClose}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>Type</label>
                    <Dropdown
                      options={typeOptions}
                      value={form.type}
                      onChange={(val) => setForm({ ...form, type: val })}
                      placeholder="Select type"
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <Dropdown
                      options={categoryOptions}
                      value={form.category}
                      onChange={(val) => setForm({ ...form, category: val })}
                      placeholder="Select category"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    placeholder="Enter description…"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    style={errors.description ? { borderColor: 'var(--expense-color)' } : {}}
                  />
                  {errors.description && (
                    <span style={{ color: 'var(--expense-color)', fontSize: '0.75rem' }}>
                      {errors.description}
                    </span>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Amount ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: e.target.value })}
                      style={errors.amount ? { borderColor: 'var(--expense-color)' } : {}}
                    />
                    {errors.amount && (
                      <span style={{ color: 'var(--expense-color)', fontSize: '0.75rem' }}>
                        {errors.amount}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      style={errors.date ? { borderColor: 'var(--expense-color)' } : {}}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editData ? 'Save Changes' : 'Add Transaction'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
