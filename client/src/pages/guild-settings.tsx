import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useAuth, useGuilds, GuildSettings } from "@/lib/mock-auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Disc, Play, Pause, SkipForward, Volume2, Save, Hash, Music } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export default function GuildSettingsPage() {
  const [match, params] = useRoute("/dashboard/:id");
  const { isAuthenticated } = useAuth();
  const { guilds, settings, updatePrefix } = useGuilds();
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
      toast({
        title: "Settings Saved",
        description: `Prefix updated to "${prefixInput.trim()}" for ${guild.name}`,
      });
    } else {
      toast({
        title: "Invalid Prefix",
        description: "Prefix must be between 1 and 5 characters.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => setLocation("/dashboard")}
        className="mb-6 pl-0 text-muted-foreground hover:text-white"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Servers
      </Button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Settings Area */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">{guild.name}</h1>
            <p className="text-muted-foreground">Configure music bot settings for this server.</p>
          </div>

          <Card className="bg-card/40 backdrop-blur-sm border-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-primary" />
                General Settings
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
        </div>

        {/* Sidebar / Music Player Status */}
        <div className="w-full lg:w-96">
          <Card className="bg-card/40 backdrop-blur-sm border-white/5 overflow-hidden sticky top-24">
            <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Disc className={`w-5 h-5 ${guildSettings.musicStatus === 'playing' ? 'animate-spin-slow text-primary' : 'text-muted-foreground'}`} />
                Now Playing
              </CardTitle>
            </CardHeader>
            <CardContent>
              {guildSettings.musicStatus === 'playing' && guildSettings.currentTrack ? (
                <div className="space-y-6">
                  <div className="aspect-video bg-black/40 rounded-lg flex items-center justify-center border border-white/5 relative overflow-hidden group">
                    {/* Fake visualizer bars */}
                    <div className="absolute bottom-0 left-0 right-0 h-full flex items-end justify-center gap-1 p-4 opacity-30">
                      {[...Array(12)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-2 bg-primary/50 rounded-t-sm animate-pulse"
                          style={{ 
                            height: `${Math.random() * 60 + 20}%`,
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: '0.8s'
                          }}
                        />
                      ))}
                    </div>
                    <Music className="w-12 h-12 text-white/20 z-10" />
                  </div>

                  <div>
                    <h3 className="font-bold text-white truncate">{guildSettings.currentTrack.title}</h3>
                    <p className="text-sm text-muted-foreground">{guildSettings.currentTrack.artist}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>2:00</span>
                      <span>4:00</span>
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-1/2" />
                    </div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button size="icon" variant="ghost" className="text-white hover:text-primary hover:bg-white/5">
                      <Pause className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-white hover:text-primary hover:bg-white/5">
                      <SkipForward className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                     <Volume2 className="w-4 h-4 text-muted-foreground" />
                     <Slider defaultValue={[guildSettings.volume]} max={100} step={1} className="flex-1" />
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Nothing is playing right now.</p>
                  <p className="text-xs mt-2">Join a voice channel and use <span className="font-mono text-primary">{guildSettings.prefix}play</span></p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
