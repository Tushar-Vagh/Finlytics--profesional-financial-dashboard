import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function Dropdown({ options, value, onChange, placeholder = 'Select…' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectedLabel =
    options.find((o) => o.value === value)?.label || placeholder;

  return (
    <div className="custom-dropdown" ref={ref}>
      <button
        type="button"
        className={`custom-dropdown-trigger ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
      >
        <span className="custom-dropdown-value">{selectedLabel}</span>
        <ChevronDown size={15} className={`custom-dropdown-chevron ${open ? 'rotated' : ''}`} />
      </button>

      {open && (
        <div className="custom-dropdown-menu">
          <div className="custom-dropdown-scroll">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`custom-dropdown-item ${value === opt.value ? 'selected' : ''}`}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                <span>{opt.label}</span>
                {value === opt.value && <Check size={14} className="custom-dropdown-check" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
