import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Zap, Music, Shield, Sliders, Headphones, Radio, Activity, Volume2 } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Music,
      title: "High Fidelity Audio",
      description: "Experience music as it was meant to be heard. Moody Bot delivers crystal clear, lossless audio streaming directly to your voice channels.",
      color: "text-cyan-400"
    },
    {
      icon: Volume2,
      title: "200% Volume Boost",
      description: "Need it louder? Crank the volume up to 200% for those hype moments or lower it for background vibes. Complete control in your hands.",
      color: "text-green-400"
    },
    {
      icon: Radio,
      title: "Smart Queue System",
      description: "Advanced queue management with pagination. View upcoming tracks, total duration, and manage the playlist with ease.",
      color: "text-purple-400"
    },
    {
      icon: Activity,
      title: "Zero Lag Architecture",
      description: "Built on high-performance infrastructure to ensure skip-free playback even during peak hours. 99.9% uptime guaranteed.",
      color: "text-red-400"
    },
    {
      icon: Sliders,
      title: "Advanced Filters",
      description: "Customize your listening experience with real-time audio effects like Bass Boost, Nightcore, and Vaporwave directly from the dashboard.",
      color: "text-yellow-400"
    },
    {
      icon: Shield,
      title: "Secure Dashboard",
      description: "Web-based control panel restricted to server administrators. Manage prefixes, playback, and permissions securely.",
      color: "text-blue-400"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
            >
              <Zap className="w-4 h-4" />
              Next Generation Music Bot
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-display font-bold text-white"
            >
              Features that <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Empower</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Moody Bot isn't just another music bot. It's a complete audio experience designed for power users and casual listeners alike.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/40 backdrop-blur-sm border-white/5 hover:border-primary/30 hover:bg-white/5 transition-all duration-300 group">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl text-white group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack / Under the Hood */}
      <section className="py-20 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Powered by Modern Tech</h2>
            <p className="text-muted-foreground">Built with the latest technologies for maximum performance.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {["Node.js", "Discord.js", "FFmpeg", "TypeScript", "React", "Tailwind"].map((tech) => (
              <div key={tech} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-mono text-sm font-bold">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
