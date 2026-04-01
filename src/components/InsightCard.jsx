import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

export default function InsightCard({ insight, delay = 0 }) {
  const IconComponent = LucideIcons[insight.icon] || LucideIcons.TrendingUp;

  return (
    <motion.div
      className="insight-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className={`insight-icon ${insight.color}`}>
        <IconComponent size={22} />
      </div>
      <div className="insight-title">{insight.title}</div>
      <div className={`insight-value ${insight.color}`}>{insight.value}</div>
      <div className="insight-detail">{insight.detail}</div>
    </motion.div>
  );
}
