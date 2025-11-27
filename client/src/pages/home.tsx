import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Music, Shield, Zap, Globe, Headphones, Server } from "lucide-react";
import { Link } from "wouter";
import heroBg from "@assets/generated_images/cyberpunk_abstract_music_waves_background.png";
import { motion } from "framer-motion";

export default function Home() {
  const { login, isAuthenticated } = useAuth();

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/80 to-background" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            v2.0 is now live
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            FEEL THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">RHYTHM</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            The most advanced high-quality music bot for Discord. 
            Crystal clear audio, lag-free playback, and complete control via our dashboard.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="h-12 px-8 text-lg rounded-full bg-white text-black hover:bg-white/90 hover:scale-105 transition-all duration-300 font-bold">
              Add to Discord
            </Button>
            
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-white hover:border-primary/50 backdrop-blur-sm transition-all duration-300">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => login()}
                className="h-12 px-8 text-lg rounded-full border-white/10 bg-white/5 hover:bg-white/10 hover:text-white hover:border-primary/50 backdrop-blur-sm transition-all duration-300"
              >
                Login Dashboard
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Headphones className="w-8 h-8 text-primary" />,
                title: "High Quality Audio",
                description: "Lossless audio streaming for the best listening experience."
              },
              {
                icon: <Shield className="w-8 h-8 text-secondary" />,
                title: "Advanced Control",
                description: "Complete dashboard control over playback and permissions."
              },
              {
                icon: <Zap className="w-8 h-8 text-purple-400" />,
                title: "Zero Lag",
                description: "Optimized infrastructure ensures smooth playback 24/7."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
              >
                <div className="mb-6 p-4 rounded-xl bg-black/40 w-fit group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Servers", value: "10,000+" },
              { label: "Users", value: "5M+" },
              { label: "Songs Played", value: "120M+" },
              { label: "Uptime", value: "99.9%" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{stat.value}</div>
                <div className="text-primary font-medium uppercase tracking-widest text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
