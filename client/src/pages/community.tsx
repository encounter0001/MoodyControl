import { motion } from "framer-motion";
import { Users, MessageSquare, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommunityPage() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-display font-black mb-4 bg-gradient-to-r from-pink-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent">
            Join Our Community
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Connect with other Moody Music Bot users, share tips, and get support from our community.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-pink-500/10 to-orange-500/5 border border-pink-500/20 rounded-xl p-8"
            >
              <Users className="w-10 h-10 text-pink-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Discord Server</h3>
              <p className="text-gray-400 mb-6">
                Join thousands of users in our official Discord server. Share music recommendations, get help, and stay updated on new features.
              </p>
              <Button className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold" asChild>
                <a href="https://discord.com/servers/wyno-is-live-1129884940385914880" target="_blank" rel="noopener noreferrer">
                  Join Server
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 rounded-xl p-8"
            >
              <MessageSquare className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Discussion Forums</h3>
              <p className="text-gray-400 mb-6">
                Discuss features, share feedback, and connect with other users in our community forums. Your ideas shape our roadmap.
              </p>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold" disabled>
                Coming Soon
              </Button>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 rounded-xl p-6 text-center"
            >
              <Heart className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <h4 className="font-bold text-white mb-2">Supportive</h4>
              <p className="text-sm text-gray-400">A welcoming community where everyone helps each other</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-xl p-6 text-center"
            >
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h4 className="font-bold text-white mb-2">Active</h4>
              <p className="text-sm text-gray-400">Daily discussions and constant updates from the team</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/20 rounded-xl p-6 text-center"
            >
              <Users className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h4 className="font-bold text-white mb-2">Growing</h4>
              <p className="text-sm text-gray-400">Join thousands of music enthusiasts worldwide</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
