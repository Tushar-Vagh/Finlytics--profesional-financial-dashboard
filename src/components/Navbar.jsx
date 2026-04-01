import { useNav } from '../context/AppContext';
import RoleSwitcher from './RoleSwitcher';
import ThemeToggle from './ThemeToggle';
import { Menu } from 'lucide-react';

const pageTitles = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  insights: 'Insights',
};

export default function Navbar({ onMenuToggle }) {
  const { currentPage } = useNav();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={onMenuToggle}>
          <Menu size={20} />
        </button>
        <span className="page-title">{pageTitles[currentPage] || 'Dashboard'}</span>
      </div>
      <div className="navbar-right">
        <RoleSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
