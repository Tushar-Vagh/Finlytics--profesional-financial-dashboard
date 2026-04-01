import { motion } from 'framer-motion';

export default function SummaryCard({ label, value, icon: Icon, type, delay = 0 }) {
  return (
    <motion.div
      className={`summary-card ${type}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="card-accent" />
      <div className="card-header">
        <span className="card-label">{label}</span>
        <div className="card-icon">
          <Icon size={20} />
        </div>
      </div>
      <div className="card-value">{value}</div>
    </motion.div>
  );
}
