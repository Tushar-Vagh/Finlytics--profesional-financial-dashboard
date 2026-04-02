import { useRef, useEffect, useState } from 'react';
import { useRole } from '../context/AppContext';
import { Eye, Shield } from 'lucide-react';

export default function RoleSwitcher() {
  const { role, setRole } = useRole();
  const viewerRef = useRef(null);
  const adminRef = useRef(null);
  const [sliderStyle, setSliderStyle] = useState({});

  useEffect(() => {
    const activeRef = role === 'viewer' ? viewerRef : adminRef;
    if (activeRef.current) {
      const { offsetLeft, offsetWidth } = activeRef.current;
      setSliderStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [role]);

  return (
    <div className="role-switcher">
      <div className="role-slider" style={sliderStyle} />
      <button
        ref={viewerRef}
        className={`role-option ${role === 'viewer' ? 'active' : ''}`}
        onClick={() => setRole('viewer')}
      >
        <Eye size={14} />
        <span>Viewer</span>
      </button>
      <button
        ref={adminRef}
        className={`role-option ${role === 'admin' ? 'active' : ''}`}
        onClick={() => setRole('admin')}
      >
        <Shield size={14} />
        <span>Admin</span>
      </button>
    </div>
  );
}
