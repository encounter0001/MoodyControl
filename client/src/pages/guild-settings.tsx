import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useAuth, useGuilds } from "@/lib/mock-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Disc, Play, Pause, SkipForward, Volume2, Save, Hash, Music, ListMusic, ShieldCheck, Activity, Mic2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { QueueList } from "@/components/queue-list";
import { ConsoleLog } from "@/components/console-log";
import { motion, AnimatePresence } from "framer-motion";

export default function GuildSettingsPage() {
  const [match, params] = useRoute("/dashboard/:id");
  const { isAuthenticated } = useAuth();
  const { 
    guilds, 
    settings, 
    updatePrefix, 
    setVolume, 
    togglePlayPause, 
    skipTrack, 
    toggleFilter,
    removeFromQueue,
    addLog 
  } = useGuilds();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  
  const guildId = params?.id;
  const guild = guilds.find(g => g.id === guildId);
  const guildSettings = guildId ? settings[guildId] : null;

  const [prefixInput, setPrefixInput] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/");
    }
    if (guildSettings) {
      setPrefixInput(guildSettings.prefix);
    }
  }, [isAuthenticated, setLocation, guildSettings]);

  if (!isAuthenticated || !guild || !guildSettings) return null;

  const handleSavePrefix = () => {
    if (prefixInput.trim().length > 0 && prefixInput.trim().length <= 5) {
      updatePrefix(guild.id, prefixInput.trim());
      addLog(guild.id, `Prefix updated to '${prefixInput.trim()}' by User`);
      toast({
        title: "Settings Saved",
        description: `Prefix updated to "${prefixInput.trim()}"`,
      });
    } else {
      toast({
        title: "Invalid Prefix",
        description: "Prefix must be between 1 and 5 characters.",
        variant: "destructive"
      });
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(guild.id, value[0]);
  };

  const handlePlayPause = () => {
    togglePlayPause(guild.id);
    addLog(guild.id, guildSettings.musicStatus === 'playing' ? 'Music paused' : 'Music resumed');
  };

  const handleSkip = () => {
    if (guildSettings.queue.length > 0) {
      const next = guildSettings.queue[0];
      addLog(guild.id, `Skipped track. Now playing: ${next.title}`);
      skipTrack(guild.id);
      toast({ title: "Skipped", description: `Now Playing: ${next.title}` });
    } else {
      skipTrack(guild.id);
      addLog(guild.id, "Skipped track. Queue ended.");
      toast({ title: "Queue Ended", description: "No more tracks in queue." });
    }
  };

  const handleRemoveTrack = (trackId: string) => {
    const track = guildSettings.queue.find(t => t.id === trackId);
    if (track) {
      removeFromQueue(guild.id, trackId);
      addLog(guild.id, `Removed '${track.title}' from queue`);
      toast({ title: "Removed from Queue", description: track.title });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => setLocation("/dashboard")}
        className="mb-6 pl-0 text-muted-foreground hover:text-white group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Servers
      </Button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-white mb-2">{guild.name}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Administrator</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> {guildSettings.musicStatus === 'playing' ? 'Active' : 'Idle'}</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white/5 border border-white/5 p-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="queue">Queue & Player</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              {/* OVERVIEW TAB */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="bg-card/40 backdrop-blur-sm border-white/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Total Queue Duration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">
                        {Math.floor(guildSettings.queue.reduce((acc, t) => acc + t.duration, 0) / 60)}m
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/40 backdrop-blur-sm border-white/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Current Volume</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{guildSettings.volume}%</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-card/40 backdrop-blur-sm border-white/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Active Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">
                        {Object.values(guildSettings.filters).filter(Boolean).length}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-card/40 backdrop-blur-sm border-white/5">
                  <CardHeader>
                    <CardTitle className="text-lg">Live Console</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ConsoleLog logs={guildSettings.logs} />
                  </CardContent>
                </Card>
              </TabsContent>

              {/* QUEUE & PLAYER TAB */}
              <TabsContent value="queue" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-[1fr_300px]">
                  <Card className="bg-card/40 backdrop-blur-sm border-white/5 h-fit">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <ListMusic className="w-5 h-5 text-primary" />
                          Up Next
                        </CardTitle>
                        <CardDescription>{guildSettings.queue.length} tracks pending</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => toast({ title: "Cleared", description: "Queue cleared" })}>
                        Clear Queue
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <QueueList queue={guildSettings.queue} onRemove={handleRemoveTrack} />
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                     <Card className="bg-card/40 backdrop-blur-sm border-white/5">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Mic2 className="w-5 h-5 text-secondary" />
                          Audio Effects
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="bass" className="text-white">Bass Boost</Label>
                          <Switch 
                            id="bass" 
                            checked={guildSettings.filters.bassBoost}
                            onCheckedChange={() => {
                              toggleFilter(guild.id, 'bassBoost');
                              addLog(guild.id, `Bass Boost ${!guildSettings.filters.bassBoost ? 'enabled' : 'disabled'}`);
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="night" className="text-white">Nightcore</Label>
                          <Switch 
                            id="night" 
                            checked={guildSettings.filters.nightcore}
                            onCheckedChange={() => {
                              toggleFilter(guild.id, 'nightcore');
                              addLog(guild.id, `Nightcore ${!guildSettings.filters.nightcore ? 'enabled' : 'disabled'}`);
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="vapor" className="text-white">Vaporwave</Label>
                          <Switch 
                            id="vapor" 
                            checked={guildSettings.filters.vaporwave}
                            onCheckedChange={() => {
                              toggleFilter(guild.id, 'vaporwave');
                              addLog(guild.id, `Vaporwave ${!guildSettings.filters.vaporwave ? 'enabled' : 'disabled'}`);
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* SETTINGS TAB */}
              <TabsContent value="settings" className="space-y-6">
                <Card className="bg-card/40 backdrop-blur-sm border-white/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Hash className="w-5 h-5 text-primary" />
                      General Configuration
                    </CardTitle>
                    <CardDescription>Manage basic bot configuration.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="prefix" className="text-white">Command Prefix</Label>
                      <div className="flex gap-2">
                        <Input 
                          type="text" 
                          id="prefix" 
                          value={prefixInput}
                          onChange={(e) => setPrefixInput(e.target.value)}
                          className="bg-black/20 border-white/10 text-white"
                        />
                        <Button onClick={handleSavePrefix} className="bg-primary hover:bg-primary/90">
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Current prefix: <span className="font-mono bg-primary/20 text-primary px-1 rounded">{guildSettings.prefix}</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>

        {/* Sidebar / Player (Sticky) */}
        <div className="w-full lg:w-80 xl:w-96 shrink-0">
          <Card className="bg-black/40 backdrop-blur-xl border-white/10 overflow-hidden sticky top-24 shadow-2xl shadow-primary/5">
            <div className="h-1 bg-gradient-to-r from-primary via-purple-400 to-secondary" />
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Disc className={`w-5 h-5 ${guildSettings.musicStatus === 'playing' ? 'animate-spin-slow text-primary' : 'text-muted-foreground'}`} />
                Now Playing
              </CardTitle>
            </CardHeader>
            <CardContent>
              {guildSettings.currentTrack ? (
                <div className="space-y-6">
                  <div className="aspect-square bg-gradient-to-br from-gray-900 to-black rounded-xl border border-white/10 relative overflow-hidden group shadow-inner">
                     {/* Animated Visualizer */}
                     {guildSettings.musicStatus === 'playing' && (
                       <div className="absolute inset-0 flex items-end justify-center gap-1 p-6 opacity-50">
                         {[...Array(16)].map((_, i) => (
                           <motion.div 
                             key={i} 
                             className="w-2 bg-gradient-to-t from-primary to-transparent rounded-t-sm"
                             animate={{ height: ["20%", "80%", "30%"] }}
                             transition={{ 
                               duration: 0.6, 
                               repeat: Infinity, 
                               delay: i * 0.05,
                               ease: "easeInOut" 
                             }}
                           />
                         ))}
                       </div>
                     )}
                     
                     <div className="absolute inset-0 flex items-center justify-center">
                       <Music className="w-20 h-20 text-white/10 drop-shadow-lg" />
                     </div>

                     {/* Overlay Controls */}
                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-14 w-14 rounded-full bg-white text-black hover:bg-white/90 hover:scale-110 transition-all"
                          onClick={handlePlayPause}
                        >
                          {guildSettings.musicStatus === 'playing' ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                        </Button>
                     </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-white text-lg truncate leading-tight">{guildSettings.currentTrack.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{guildSettings.currentTrack.artist}</p>
                    <p className="text-xs text-primary/80 pt-1">Requested by {guildSettings.currentTrack.requester}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer group">
                      <motion.div 
                        className="h-full bg-primary group-hover:bg-primary/80 transition-colors relative" 
                        initial={{ width: "0%" }}
                        animate={{ width: guildSettings.musicStatus === 'playing' ? "45%" : "45%" }}
                        transition={{ duration: 1 }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-lg" />
                      </motion.div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground font-mono">
                      <span>1:45</span>
                      <span>{Math.floor(guildSettings.currentTrack.duration / 60)}:{(guildSettings.currentTrack.duration % 60).toString().padStart(2, '0')}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-white" disabled>
                      <SkipForward className="w-5 h-5 rotate-180" />
                    </Button>

                    <Button 
                      size="icon" 
                      className={`h-12 w-12 rounded-full shadow-lg shadow-primary/20 ${guildSettings.musicStatus === 'playing' ? 'bg-primary text-white' : 'bg-white text-black'}`}
                      onClick={handlePlayPause}
                    >
                      {guildSettings.musicStatus === 'playing' ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                    </Button>

                    <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-white" onClick={handleSkip}>
                      <SkipForward className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-3 pt-2 bg-white/5 p-3 rounded-lg border border-white/5">
                     <Volume2 className={`w-4 h-4 ${guildSettings.volume === 0 ? 'text-muted-foreground' : 'text-primary'}`} />
                     <Slider 
                        defaultValue={[guildSettings.volume]} 
                        max={100} 
                        step={1} 
                        className="flex-1 cursor-pointer"
                        onValueCommit={handleVolumeChange}
                     />
                     <span className="text-xs font-mono w-8 text-right text-muted-foreground">{guildSettings.volume}%</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                    <Disc className="w-8 h-8 text-muted-foreground opacity-50" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-white">Nothing Playing</p>
                    <p className="text-xs text-muted-foreground max-w-[200px] mx-auto">
                      Join a voice channel and use <span className="font-mono text-primary bg-primary/10 px-1 rounded">{guildSettings.prefix}play</span>
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
