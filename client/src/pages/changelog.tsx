import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const changes = [
  { version: "1.2.0", date: "Nov 27, 2025", items: ["Real Discord OAuth integration", "Actual server management", "Guild-specific settings synchronization"] },
  { version: "1.1.0", date: "Nov 20, 2025", items: ["Vibrant gradient theme", "Guild settings dashboard", "Audio filter controls"] },
  { version: "1.0.0", date: "Nov 13, 2025", items: ["Initial release", "Core music bot features", "Dashboard foundation"] },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-display font-black mb-4 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Changelog
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Track all updates and improvements to Moody Music Bot.
          </p>

          <div className="space-y-8">
            {changes.map((change, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-r from-pink-500/10 to-cyan-500/10 border border-pink-500/20 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">v{change.version}</h2>
                  <span className="text-sm text-gray-400">{change.date}</span>
                </div>
                <ul className="space-y-2">
                  {change.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
