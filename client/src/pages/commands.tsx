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
    description: "Play a song from YouTube",
    usage: "/play <query>",
    category: "Music",
    icon: Play,
    args: [
      { name: "query", description: "YouTube URL or search query", required: true }
    ]
  },
  {
    name: "pause",
    description: "Pause the current song",
    usage: "/pause",
    category: "Music",
    icon: Pause,
    args: []
  },
  {
    name: "resume",
    description: "Resume the paused song",
    usage: "/resume",
    category: "Music",
    icon: Play,
    args: []
  },
  {
    name: "stop",
    description: "Stop playing music and clear the queue",
    usage: "/stop",
    category: "Music",
    icon: Square,
    args: []
  },
  {
    name: "skip",
    description: "Skip the current song",
    usage: "/skip",
    category: "Music",
    icon: SkipForward,
    args: []
  },
  {
    name: "queue",
    description: "Show the current music queue",
    usage: "/queue [page]",
    category: "Queue",
    icon: ListMusic,
    args: [
      { name: "page", description: "Page number of the queue", required: false }
    ]
  },
  {
    name: "volume",
    description: "Adjust the music volume (0-200%)",
    usage: "/volume <level>",
    category: "Settings",
    icon: Volume2,
    args: [
      { name: "level", description: "Volume level (0-200)", required: true }
    ]
  },
  {
    name: "help",
    description: "Show all available commands",
    usage: "/help [command]",
    category: "Utility",
    icon: HelpCircle,
    args: [
      { name: "command", description: "Get detailed help for a specific command", required: false }
    ]
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
          className="text-4xl md:text-6xl font-display font-bold text-white"
        >
          Command <span className="text-primary">Library</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Master Moody Bot with our comprehensive list of commands.
        </motion.p>
      </div>

      <div className="max-w-2xl mx-auto mb-12 relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input 
          placeholder="Search commands..." 
          className="pl-10 h-12 bg-white/5 border-white/10 text-lg focus:ring-primary/50 transition-all rounded-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCommands.map((cmd, index) => (
          <motion.div
            key={cmd.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full bg-card/40 backdrop-blur-sm border-white/5 hover:border-primary/50 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {cmd.category}
                  </Badge>
                  <cmd.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <CardTitle className="font-mono text-xl text-white group-hover:text-primary transition-colors">
                  /{cmd.name}
                </CardTitle>
                <CardDescription>
                  {cmd.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-black/40 rounded-lg p-3 font-mono text-sm text-muted-foreground border border-white/5 group-hover:border-white/10 transition-colors">
                  <span className="text-primary">$</span> {cmd.usage}
                </div>
                
                {cmd.args.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-white uppercase tracking-wider">Arguments</p>
                    {cmd.args.map(arg => (
                      <div key={arg.name} className="flex items-start gap-2 text-sm">
                        <Badge variant="secondary" className="font-mono text-xs">
                          {arg.name}
                        </Badge>
                        <span className="text-muted-foreground text-xs leading-5">
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
