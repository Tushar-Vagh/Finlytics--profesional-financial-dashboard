import { useState, useRef, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';

export default function DateRangePicker({ dateFrom, dateTo, onChange }) {
  const [open, setOpen] = useState(false);
  const [localFrom, setLocalFrom] = useState(dateFrom || '');
  const [localTo, setLocalTo] = useState(dateTo || '');
  const ref = useRef(null);

  useEffect(() => {
    setLocalFrom(dateFrom || '');
    setLocalTo(dateTo || '');
  }, [dateFrom, dateTo]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleApply = () => {
    onChange({ dateFrom: localFrom, dateTo: localTo });
    setOpen(false);
  };

  const handleClear = () => {
    setLocalFrom('');
    setLocalTo('');
    onChange({ dateFrom: '', dateTo: '' });
    setOpen(false);
  };

  const formatLabel = (d) => {
    if (!d) return '';
    const date = new Date(d + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const hasRange = dateFrom || dateTo;
  const label = hasRange
    ? `${formatLabel(dateFrom) || '…'} – ${formatLabel(dateTo) || '…'}`
    : 'Date Range';

  return (
    <div className="date-range-picker" ref={ref}>
      <button
        className={`date-range-trigger ${hasRange ? 'active' : ''}`}
        onClick={() => setOpen(!open)}
        type="button"
      >
        <Calendar size={15} />
        <span className="date-range-label">{label}</span>
        {hasRange && (
          <span
            className="date-range-clear"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
          >
            <X size={14} />
          </span>
        )}
      </button>

      {open && (
        <div className="date-range-dropdown">
          <div className="date-range-fields">
            <div className="date-range-field">
              <label>From</label>
              <input
                type="date"
                value={localFrom}
                max={localTo || undefined}
                onChange={(e) => setLocalFrom(e.target.value)}
              />
            </div>
            <div className="date-range-field">
              <label>To</label>
              <input
                type="date"
                value={localTo}
                min={localFrom || undefined}
                onChange={(e) => setLocalTo(e.target.value)}
              />
            </div>
          </div>
          <div className="date-range-actions">
            <button className="btn btn-secondary btn-sm" onClick={handleClear}>
              Clear
            </button>
            <button className="btn btn-primary btn-sm" onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
