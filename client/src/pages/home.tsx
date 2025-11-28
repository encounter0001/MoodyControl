import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Music, Zap, Globe, Headphones, Server, Sparkles, Volume2 } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const { login, isAuthenticated } = useAuth();
  const [stats, setStats] = useState({
    activeServers: 0,
    usersJamming: 0,
    songsPlayed: 0,
    uptime: "0d 0h",
    uptimePercent: "99.9%"
  });

  useEffect(() => {
    const fetchStats = () => {
      fetch("/api/stats")
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(err => console.error("Failed to fetch stats:", err));
    };
    
    // Fetch immediately
    fetchStats();
    
    // Refresh every 60 seconds
    const interval = setInterval(fetchStats, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Crystal Clear Audio",
      description: "Experience studio-quality sound with our advanced audio processing technology.",
      color: "from-pink-500 to-orange-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Zero lag playback with optimized infrastructure for seamless music streaming.",
      color: "from-orange-500 to-yellow-500"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Scale",
      description: "Thousands of servers trust us for their music needs every single day.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <Volume2 className="w-8 h-8" />,
      title: "Full Control",
      description: "Customize everything from audio filters to permissions and prefixes.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Easy Management",
      description: "Intuitive dashboard for complete server management and customization.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Premium Effects",
      description: "Apply audio effects like bass boost, nightcore, and vaporwave effects.",
      color: "from-yellow-500 to-pink-500"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-br from-background via-background to-background">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse opacity-20" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full mix-blend-screen filter blur-3xl animate-pulse opacity-20" />
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-orange-500/20 rounded-full mix-blend-screen filter blur-3xl animate-pulse opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-pink-500/30 text-transparent bg-clip-text font-semibold mb-8 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent font-bold">
              NOW LIVE - v3.0
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter mb-6">
              <span className="bg-gradient-to-r from-pink-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl">
                FEEL THE
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                RHYTHM
              </span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            The most powerful music bot for Discord. Studio-quality audio, 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 font-bold"> advanced effects, </span>
            and complete control.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="https://discord.com/oauth2/authorize?client_id=1344874349580255293&permissions=321609335434304&integration_type=0&scope=bot">
              <Button size="lg" className="h-14 px-10 text-lg rounded-xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/40">
                Add to Discord
              </Button>
            </a>
            
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-10 text-lg rounded-xl font-bold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/50 text-cyan-300 hover:from-cyan-500/40 hover:to-blue-500/40 hover:border-cyan-400 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                  Go to Dashboard →
                </Button>
              </Link>
            ) : (
              <Button 
                size="lg" 
                onClick={() => login()}
                className="h-14 px-10 text-lg rounded-xl font-bold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/50 text-cyan-300 hover:from-cyan-500/40 hover:to-blue-500/40 hover:border-cyan-400 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              >
                Login Dashboard →
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-display font-black mb-4">
              <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Why Choose Moody?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need for the ultimate Discord music experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -12 }}
                className="group h-full"
              >
                <div className="relative overflow-hidden rounded-3xl p-8 h-full glass-card card-hover-glow">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${feature.color}`} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${feature.color} opacity-20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500`} />
                  </div>
                  
                  <div className={`relative mb-6 p-5 rounded-2xl w-fit bg-gradient-to-br ${feature.color} text-white group-hover:scale-125 transition-all duration-400 shadow-lg group-hover:shadow-2xl group-hover:shadow-pink-500/50`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="relative text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-300 group-hover:to-cyan-300 transition-all duration-400 font-display">
                    {feature.title}
                  </h3>
                  
                  <p className="relative text-gray-300 leading-relaxed group-hover:text-gray-100 transition-colors duration-400 text-sm md:text-base">
                    {feature.description}
                  </p>
                  
                  <div className="relative mt-6 h-1 w-0 group-hover:w-12 bg-gradient-to-r from-pink-400 to-cyan-400 transition-all duration-500 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-white/5 bg-gradient-to-r from-pink-500/5 to-cyan-500/5 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Active Servers", value: stats.activeServers.toLocaleString(), icon: "🎵" },
              { label: "Users Jamming", value: (Math.floor(stats.usersJamming / 1000)).toLocaleString() + "K+", icon: "👥" },
              { label: "Songs Played", value: (Math.floor(stats.songsPlayed / 1000)).toLocaleString() + "K+", icon: "🎶" },
              { label: "Uptime", value: stats.uptimePercent, icon: "⚡" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-display font-black bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium uppercase tracking-widest text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-display font-black mb-6 text-white">
              Ready to Transform Your <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">Server?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of servers using Moody Music Bot. Setup takes less than 2 minutes.
            </p>
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="btn-gradient h-16 px-12 text-lg font-bold text-white rounded-2xl shadow-2xl shadow-pink-500/50 border-0 relative overflow-hidden group">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Now <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
