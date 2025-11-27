import { motion } from "framer-motion";
import { Music, Zap, Shield, Headphones, Radio, Wind, Sparkles, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: <Music className="w-12 h-12" />,
    title: "High-Quality Audio",
    description: "Crystal clear 320kbps streaming with advanced audio processing for the best listening experience.",
    color: "from-pink-500 to-orange-500"
  },
  {
    icon: <Zap className="w-12 h-12" />,
    title: "Lightning Fast",
    description: "Zero lag playback with optimized infrastructure and global CDN distribution.",
    color: "from-orange-500 to-yellow-500"
  },
  {
    icon: <Wind className="w-12 h-12" />,
    title: "Advanced Filtering",
    description: "Bass boost, nightcore, vaporwave, and more audio effects at your fingertips.",
    color: "from-cyan-500 to-blue-500"
  },
  {
    icon: <Headphones className="w-12 h-12" />,
    title: "Complete Control",
    description: "Full control over volume, queue, and playback from our intuitive dashboard.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: <Radio className="w-12 h-12" />,
    title: "Queue Management",
    description: "Intelligent queue system with pagination, shuffling, and repeat modes.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Shield className="w-12 h-12" />,
    title: "Permission System",
    description: "Granular control with DJ roles, admin-only commands, and user permissions.",
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: <Sliders className="w-12 h-12" />,
    title: "Customizable",
    description: "Customize prefixes, volumes, roles, and more per server.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: <Sparkles className="w-12 h-12" />,
    title: "Premium Effects",
    description: "Special audio effects and visual enhancements for premium members.",
    color: "from-pink-400 to-cyan-400"
  }
];

export default function Features() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-black mb-4">
            <span className="bg-gradient-to-r from-pink-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage music in your Discord server
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl p-8 h-full glass-card hover-glow">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-r ${feature.color}`} />
                
                <div className={`mb-6 p-4 rounded-xl w-fit bg-gradient-to-r ${feature.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-cyan-400 transition-all">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-display font-black mb-4 text-white">
            Ready to upgrade your <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">server?</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of servers enjoying premium music experience with Moody Bot.
          </p>
          <a href="https://discord.com/oauth2/authorize?client_id=1344874349580255293&permissions=321609335434304&integration_type=0&scope=bot">
            <Button className="font-bold bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white rounded-xl hover:scale-105 transition-all shadow-lg shadow-pink-500/40">
              Add to Your Server →
            </Button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
