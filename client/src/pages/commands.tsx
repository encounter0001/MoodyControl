import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Search, Command, Terminal, Music, Pause, Play, SkipForward, Square, Volume2, ListMusic, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const commands = [
  {
    name: "play",
    description: "Play a song from YouTube or search query",
    usage: "m!play <query>",
    category: "Music",
    icon: Play,
    args: [
      { name: "query", description: "YouTube URL or song search query", required: true }
    ]
  },
  {
    name: "join",
    description: "Connect the bot to your voice channel",
    usage: "m!join",
    category: "Music",
    icon: Play,
    args: []
  },
  {
    name: "skip",
    description: "Skip the current song (aliases: s, next)",
    usage: "m!skip",
    category: "Music",
    icon: SkipForward,
    args: []
  },
  {
    name: "stop",
    description: "Stop playing and disconnect bot (aliases: leave, dc)",
    usage: "m!stop",
    category: "Music",
    icon: Square,
    args: []
  },
  {
    name: "current",
    description: "Show details of the currently playing song (aliases: np, nowplaying)",
    usage: "m!current",
    category: "Music",
    icon: Music,
    args: []
  },
  {
    name: "volume",
    description: "Control the playback volume (0-200%)",
    usage: "m!volume <level>",
    category: "Music",
    icon: Volume2,
    args: [
      { name: "level", description: "Volume level (0-200)", required: true }
    ]
  },
  {
    name: "loop",
    description: "Cycle through loop modes (Off, Single, All)",
    usage: "m!loop",
    category: "Music",
    icon: Music,
    args: []
  },
  {
    name: "replay",
    description: "Replay the current song from the beginning",
    usage: "m!replay",
    category: "Music",
    icon: Play,
    args: []
  },
  {
    name: "autoplay",
    description: "Toggle autoplay to automatically play related songs",
    usage: "m!autoplay",
    category: "Music",
    icon: Music,
    args: []
  },
  {
    name: "lyrics",
    description: "Fetch and display song lyrics",
    usage: "m!lyrics [query]",
    category: "Music",
    icon: Music,
    args: [
      { name: "query", description: "Song name (optional, uses current if not provided)", required: false }
    ]
  },
  {
    name: "eq",
    description: "Access the advanced equalizer and audio effects (aliases: equalizer, filter)",
    usage: "m!eq",
    category: "Audio Effects",
    icon: Music,
    args: []
  },
  {
    name: "speed",
    description: "Control playback speed/tempo (0.5x - 2.0x)",
    usage: "m!speed <value>",
    category: "Audio Effects",
    icon: Music,
    args: [
      { name: "value", description: "Speed value (0.5 to 2.0)", required: false }
    ]
  },
  {
    name: "games",
    description: "Start an interactive trivia game - Song or Movie Trivia (aliases: game)",
    usage: "m!games [rounds]",
    category: "Games",
    icon: Music,
    args: [
      { name: "rounds", description: "Number of trivia rounds (default: 5)", required: false }
    ]
  },
  {
    name: "trivia stop",
    description: "Stop the currently running trivia game",
    usage: "m!trivia stop",
    category: "Games",
    icon: Music,
    args: []
  },
  {
    name: "help",
    description: "Show all available commands and their usage",
    usage: "m!help",
    category: "Utility",
    icon: HelpCircle,
    args: []
  },
  {
    name: "stats",
    description: "Display bot statistics (servers, active players)",
    usage: "m!stats",
    category: "Utility",
    icon: Music,
    args: []
  },
  {
    name: "prefix",
    description: "Change the bot prefix for your server (Admin only)",
    usage: "m!prefix <new-prefix>",
    category: "Admin",
    icon: Music,
    args: [
      { name: "new-prefix", description: "New prefix (max 5 characters)", required: true }
    ]
  },
  {
    name: "247",
    description: "Toggle 24/7 mode - bot stays in voice channel (Admin only)",
    usage: "m!247",
    category: "Admin",
    icon: Music,
    args: []
  }
];

export default function Commands() {
  const [search, setSearch] = useState("");

  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(search.toLowerCase()) || 
    cmd.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16 space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-display font-black text-white"
        >
          Command <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">Library</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto"
        >
          Master Moody Bot with our comprehensive list of commands. Get help in our <a href="https://discord.gg/9WJSP4Kqg4" className="text-pink-400 hover:text-pink-300 font-bold underline">support server</a>.
        </motion.p>
      </div>

      <div className="max-w-2xl mx-auto mb-12 relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input 
          placeholder="Search commands..." 
          className="pl-10 h-12 bg-white/5 border border-pink-500/30 text-white text-lg focus:border-pink-500 focus:ring-pink-500/50 transition-all rounded-xl focus:bg-white/10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommands.map((cmd, index) => (
          <motion.div
            key={cmd.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-cyan-900/20 backdrop-blur-sm border border-pink-500/20 hover:border-pink-500/50 transition-all duration-300 group hover-glow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="bg-gradient-to-r from-pink-500/20 to-orange-500/20 text-pink-300 border-pink-500/30 font-bold">
                    {cmd.category}
                  </Badge>
                  <cmd.icon className="w-5 h-5 text-gray-400 group-hover:text-pink-400 transition-colors" />
                </div>
                <CardTitle className="font-mono text-xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-cyan-400 transition-all">
                  /{cmd.name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {cmd.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-black/40 rounded-lg p-3 font-mono text-sm text-gray-400 border border-pink-500/20 group-hover:border-pink-500/40 transition-colors">
                  <span className="text-pink-400">$</span> {cmd.usage}
                </div>
                
                {cmd.args.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-white uppercase tracking-wider">Arguments</p>
                    {cmd.args.map(arg => (
                      <div key={arg.name} className="flex items-start gap-2 text-sm">
                        <Badge variant="secondary" className="font-mono text-xs bg-pink-500/20 text-pink-300 border-pink-500/30">
                          {arg.name}
                        </Badge>
                        <span className="text-gray-400 text-xs leading-5">
                          {arg.description}
                          {arg.required && <span className="text-red-400 ml-1">*</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
