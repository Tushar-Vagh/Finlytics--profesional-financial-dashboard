import { useState } from 'react';
import {
  ThemeProvider,
  RoleProvider,
  TransactionProvider,
  NavProvider,
  useNav,
} from './context/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';
import { AnimatePresence, motion } from 'framer-motion';

function PageRouter() {
  const { currentPage } = useNav();

  const pages = {
    dashboard: Dashboard,
    transactions: Transactions,
    insights: Insights,
  };

  const Page = pages[currentPage] || Dashboard;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.25 }}
      >
        <Page />
      </motion.div>
    </AnimatePresence>
  );
}

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Navbar onMenuToggle={() => setSidebarOpen((o) => !o)} />
        <main className="app-content">
          <PageRouter />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RoleProvider>
        <NavProvider>
          <TransactionProvider>
            <AppLayout />
          </TransactionProvider>
        </NavProvider>
      </RoleProvider>
    </ThemeProvider>
  );
}
