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
        {/* Animated Gradient Background with Particles */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Floating Orbs */}
          <motion.div 
            className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-screen filter blur-3xl opacity-30"
            animate={{ y: [0, 40, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full mix-blend-screen filter blur-3xl opacity-30"
            animate={{ y: [0, -40, 0], x: [0, -20, 0], scale: [1, 0.9, 1] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />
          <motion.div 
            className="absolute bottom-0 left-1/2 w-96 h-96 bg-orange-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-30"
            animate={{ y: [0, 30, 0], x: [0, 30, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 9, repeat: Infinity, delay: 0.5 }}
          />
          
          {/* Floating Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{
                y: [0, -300, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{ 
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
          
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-pink-500/30 text-transparent bg-clip-text font-semibold mb-8 backdrop-blur-sm hover:scale-110 transition-transform duration-300 animate-glow-pulse"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500 animate-pulse-ring"></span>
            </span>
            <motion.span 
              className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent font-bold"
              animate={{ textShadow: ["0 0 10px rgba(255,0,255,0.5)", "0 0 20px rgba(0,255,255,0.5)", "0 0 10px rgba(255,0,255,0.5)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              NOW LIVE - v3.0
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, delay: 0.2, type: "spring" }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter mb-6 leading-tight">
              <motion.span 
                className="inline-block bg-gradient-to-r from-pink-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl"
                animate={{ filter: ["drop-shadow(0 0 5px rgba(255,0,255,0))", "drop-shadow(0 0 20px rgba(255,0,255,0.5))", "drop-shadow(0 0 5px rgba(255,0,255,0))"] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                FIND YOUR OWN
              </motion.span>
              <br />
              <motion.span 
                className="inline-block bg-gradient-to-r from-cyan-400 via-pink-400 to-orange-400 bg-clip-text text-transparent"
                animate={{ filter: ["drop-shadow(0 0 5px rgba(0,255,255,0))", "drop-shadow(0 0 20px rgba(0,255,255,0.5))", "drop-shadow(0 0 5px rgba(0,255,255,0))"] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                MOOD WITH MOODY
              </motion.span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            The most powerful music bot for Discord. Studio-quality audio, 
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 font-bold"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {" "}advanced effects,{" "}
            </motion.span>
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
      <section className="py-32 relative z-10 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"
            animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
            animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, type: "spring" }}
            className="text-center mb-20"
          >
            <motion.h2 
              className="text-5xl md:text-6xl font-display font-black mb-4 overflow-hidden"
              initial={{ height: 0 }}
              whileInView={{ height: "auto" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="block bg-gradient-to-r from-pink-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent animate-neon"
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Why Choose Moody?
              </motion.span>
            </motion.h2>
            
            <motion.div
              className="h-1 bg-gradient-to-r from-pink-400 via-cyan-400 to-orange-400 rounded-full mx-auto mb-6 w-0"
              initial={{ width: 0 }}
              whileInView={{ width: "60px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            
            <motion.p 
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              Everything you need for the ultimate Discord music experience
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 80, rotateX: 90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.12, duration: 0.8, type: "spring", stiffness: 100 }}
                whileHover={{ y: -25, scale: 1.05 }}
                className="group h-full perspective"
              >
                <div className="relative overflow-hidden rounded-3xl p-8 h-full glass-card card-hover-glow holographic futuristic-card group-hover:shadow-2xl group-hover:shadow-pink-500/40 transition-all duration-500">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br ${feature.color}`} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${feature.color} opacity-20 rounded-full blur-3xl group-hover:blur-xl transition-all duration-500 animate-float`} />
                  </div>
                  
                  <div className="absolute top-0 left-0 w-full h-0 group-hover:h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent transition-all duration-500" />
                  
                  <motion.div 
                    className={`relative mb-6 p-5 rounded-2xl w-fit bg-gradient-to-br ${feature.color} text-white shadow-lg shadow-pink-500/30 group-hover:shadow-2xl group-hover:shadow-pink-500/60 transition-all duration-400 animate-float`}
                    whileHover={{ scale: 1.4, rotate: 360, y: -5 }}
                    whileInView={{ rotate: [0, 5, -5, 0] }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7 }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <motion.h3 
                    className="relative text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-300 group-hover:to-cyan-300 transition-all duration-400 font-display overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: "auto", opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{ letterSpacing: "0.05em", scale: 1.05 }}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="relative text-gray-300 leading-relaxed group-hover:text-gray-100 transition-colors duration-400 text-sm md:text-base"
                    initial={{ opacity: 0, filter: "blur(5px)" }}
                    whileInView={{ opacity: 0.8, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {feature.description}
                  </motion.p>
                  
                  <motion.div 
                    className="relative mt-6 h-1 w-0 bg-gradient-to-r from-pink-400 to-cyan-400 transition-all duration-500 rounded-full group-hover:w-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1, originX: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 border-t border-white/10 bg-gradient-to-b from-pink-500/5 to-cyan-500/5 relative z-10 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl"
            animate={{ y: [0, 50, 0], x: [0, 30, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl"
            animate={{ y: [0, -50, 0], x: [0, -30, 0], scale: [1, 0.8, 1] }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          />
        </div>
        
        <motion.div
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-display font-black mb-2 bg-gradient-to-r from-pink-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Our Impact
            </motion.h2>
            <motion.div
              className="h-1 w-16 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full mx-auto"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { label: "Active Servers", value: stats.activeServers.toLocaleString(), icon: "🎵" },
              { label: "Vibing Now", value: (Math.floor(stats.usersJamming / 1000)).toLocaleString() + "K+", icon: "🔥" },
              { label: "Songs Played", value: (Math.floor(stats.songsPlayed / 1000)).toLocaleString() + "K+", icon: "🎶" },
              { label: "Uptime", value: stats.uptimePercent, icon: "⚡" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60, scale: 0.7 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ 
                  delay: i * 0.12, 
                  duration: 0.8, 
                  type: "spring", 
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ scale: 1.2, y: -15 }}
                className="group relative"
              >
                <motion.div 
                  className="relative p-8 rounded-2xl glass-card holographic group-hover:animate-glow-pulse transition-all duration-300 border-2 border-transparent group-hover:border-pink-500/50"
                  animate={{ borderColor: ["rgba(255,0,255,0)", "rgba(255,0,255,0.3)", "rgba(255,0,255,0)"] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                >
                  <motion.div 
                    className="text-5xl md:text-6xl mb-4 inline-block"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.15 + 0.2, duration: 0.8, type: "spring" }}
                    whileHover={{ scale: 1.4, rotate: 360 }}
                  >
                    {stat.icon}
                  </motion.div>
                  
                  <motion.div 
                    className="text-3xl md:text-5xl font-display font-black bg-gradient-to-r from-pink-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent mb-3 group-hover:animate-neon"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.15 + 0.4, duration: 0.7 }}
                  >
                    {stat.value}
                  </motion.div>
                  
                  <motion.div 
                    className="text-gray-300 font-medium uppercase tracking-wider text-xs md:text-sm group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-300 group-hover:to-cyan-300 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.15 + 0.5, duration: 0.6 }}
                    whileHover={{ scale: 1.15, letterSpacing: "0.15em" }}
                  >
                    {stat.label}
                  </motion.div>
                  
                  <motion.div 
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/0 via-pink-500/10 to-cyan-500/0 pointer-events-none"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-0 left-1/2 w-full h-96 bg-gradient-to-b from-pink-500/20 to-transparent"
            animate={{ y: [-50, 50, -50] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: -20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, type: "spring" }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-display font-black mb-6 text-white leading-tight"
              whileInView={{ scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Ready to Transform Your <motion.span 
                className="inline-block bg-gradient-to-r from-pink-400 via-orange-400 to-cyan-400 bg-clip-text text-transparent animate-neon"
                animate={{ rotateY: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Server?
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Join 60+ thriving communities using Moody Music Bot. Setup takes less than 2 minutes.
            </motion.p>
            
            <motion.div 
              whileHover={{ scale: 1.12, y: -5 }} 
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Button 
                size="lg" 
                className="btn-gradient h-16 px-16 text-lg font-bold text-white rounded-2xl shadow-2xl shadow-pink-500/50 border-0 relative overflow-hidden group hover:shadow-3xl hover:shadow-pink-400/70 transition-all duration-300 animate-glow-pulse"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ⚡
                  </motion.span>
                  Get Started Now 
                  <motion.span 
                    className="group-hover:translate-x-2 transition-transform duration-300 inline-block"
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
