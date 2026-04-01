import { useTransactions } from '../context/AppContext';
import { allCategories } from '../data/mockData';
import { Search } from 'lucide-react';
import DateRangePicker from './DateRangePicker';
import Dropdown from './Dropdown';

const typeOptions = [
  { value: 'all', label: 'All Types' },
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
];

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  ...allCategories.map((c) => ({ value: c, label: c })),
];

const groupOptions = [
  { value: 'none', label: 'No Grouping' },
  { value: 'category', label: 'Group by Category' },
  { value: 'month', label: 'Group by Month' },
  { value: 'type', label: 'Group by Type' },
];

export default function FilterBar() {
  const { filters, updateFilters } = useTransactions();

  return (
    <div className="filter-bar">
      <div className="search-box">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Search transactions…"
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
        />
      </div>

      <Dropdown
        options={typeOptions}
        value={filters.type}
        onChange={(val) => updateFilters({ type: val })}
        placeholder="All Types"
      />

      <Dropdown
        options={categoryOptions}
        value={filters.category}
        onChange={(val) => updateFilters({ category: val })}
        placeholder="All Categories"
      />

      <DateRangePicker
        dateFrom={filters.dateFrom}
        dateTo={filters.dateTo}
        onChange={({ dateFrom, dateTo }) => updateFilters({ dateFrom, dateTo })}
      />

      <Dropdown
        options={groupOptions}
        value={filters.groupBy}
        onChange={(val) => updateFilters({ groupBy: val })}
        placeholder="No Grouping"
      />
    </div>
  );
}
