import { motion } from "framer-motion";
import { Sparkles, Zap, Crown } from "lucide-react";

export default function PremiumPage() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-display font-black mb-4 bg-gradient-to-r from-pink-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent">
            Premium Features
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Unlock exclusive features and take your music experience to the next level.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-pink-500/10 to-orange-500/5 border border-pink-500/20 rounded-xl p-6">
              <Crown className="w-8 h-8 text-pink-400 mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Advanced Filters</h3>
              <p className="text-gray-400">Access to premium audio effects like bass boost, nightcore, vaporwave, and more.</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 rounded-xl p-6">
              <Zap className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Priority Support</h3>
              <p className="text-gray-400">Get instant support from our team for setup and customization.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 rounded-xl p-6">
              <Sparkles className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Custom Themes</h3>
              <p className="text-gray-400">Personalize your dashboard with custom color schemes and themes.</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20 rounded-xl p-6">
              <Crown className="w-8 h-8 text-yellow-400 mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Unlimited Queue</h3>
              <p className="text-gray-400">Manage unlimited songs in your queue without restrictions.</p>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-pink-500/30 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
            <p className="text-gray-400">Premium features are coming soon. Stay tuned for exclusive upgrades!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
