import { useEffect, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { guildsApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Hash, Loader } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

interface GuildSettings {
  id: string;
  guildName: string;
  guildIcon: string | null;
  prefix: string;
  volume: number;
  djRole: string | null;
  bassBoost: boolean;
  nightcore: boolean;
  vaporwave: boolean;
}

export default function GuildSettingsPage() {
  const [match, params] = useRoute("/dashboard/:id");
  const { isAuthenticated } = useAuth();
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  
  const guildId = params?.id;
  const [settings, setSettings] = useState<GuildSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [prefixInput, setPrefixInput] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, setLocation]);

  useEffect(() => {
    if (guildId && isAuthenticated) {
      loadSettings();
    }
  }, [guildId, isAuthenticated]);

  async function loadSettings() {
    try {
      setLoading(true);
      const data = await guildsApi.getSettings(guildId!);
      setSettings(data);
      setPrefixInput(data.prefix);
    } catch (error) {
      console.error("Failed to load settings:", error);
      toast({ title: "Error", description: "Failed to load guild settings", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  const handleSavePrefix = async () => {
    if (!settings) return;
    if (prefixInput.trim().length > 0 && prefixInput.trim().length <= 5) {
      try {
        setSaving(true);
        const updated = await guildsApi.updateSettings(guildId!, { prefix: prefixInput.trim() });
        setSettings(updated);
        toast({ title: "Settings Saved", description: `Prefix updated to "${prefixInput.trim()}"` });
      } catch (error) {
        toast({ title: "Error", description: "Failed to save prefix", variant: "destructive" });
      } finally {
        setSaving(false);
      }
    } else {
      toast({ title: "Invalid Prefix", description: "Prefix must be between 1 and 5 characters.", variant: "destructive" });
    }
  };

  const handleVolumeChange = async (value: number[]) => {
    if (!settings) return;
    try {
      const updated = await guildsApi.updateSettings(guildId!, { volume: value[0] });
      setSettings(updated);
    } catch (error) {
      console.error("Failed to update volume:", error);
    }
  };

  const handleToggleFilter = async (filter: 'bassBoost' | 'nightcore' | 'vaporwave') => {
    if (!settings) return;
    try {
      const updated = await guildsApi.updateSettings(guildId!, { 
        [filter]: !settings[filter]
      });
      setSettings(updated);
    } catch (error) {
      console.error("Failed to toggle filter:", error);
    }
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-12 h-12 text-pink-500 animate-spin" />
          <p className="text-gray-400">Loading guild settings...</p>
        </div>
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => setLocation("/dashboard")}
        className="mb-6 pl-0 text-gray-400 hover:text-pink-400 group transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Servers
      </Button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl font-display font-black text-white mb-2">
                <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  {settings.guildName}
                </span>
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>⚙️ Server Settings</span>
              </div>
            </div>
          </motion.div>

          <Tabs defaultValue="settings" className="space-y-6">
            <TabsList className="bg-white/5 border border-pink-500/20 p-1 rounded-xl">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="bg-gradient-to-br from-pink-500/10 to-orange-500/5 border border-pink-500/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">Current Prefix</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-pink-400 font-mono">{settings.prefix}</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">Current Volume</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-cyan-400">{settings.volume}%</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-400">Active Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-purple-400">
                        {Object.values({ bassBoost: settings.bassBoost, nightcore: settings.nightcore, vaporwave: settings.vaporwave }).filter(Boolean).length}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className="bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-cyan-900/20 backdrop-blur-sm border border-pink-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Hash className="w-5 h-5 text-pink-400" />
                      General Configuration
                    </CardTitle>
                    <CardDescription className="text-gray-400">Manage basic bot configuration.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="prefix" className="text-white font-bold">Command Prefix</Label>
                      <div className="flex gap-2">
                        <Input 
                          type="text" 
                          id="prefix" 
                          value={prefixInput}
                          onChange={(e) => setPrefixInput(e.target.value)}
                          className="bg-white/5 border border-pink-500/30 text-white focus:border-pink-500 focus:ring-pink-500/50"
                          disabled={saving}
                        />
                        <Button 
                          onClick={handleSavePrefix} 
                          className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold"
                          disabled={saving}
                        >
                          {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                          {saving ? "Saving..." : "Save"}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4 border-t border-white/5 pt-6">
                      <h3 className="font-bold text-white text-sm uppercase tracking-wider">🎵 Audio Effects</h3>
                      
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <Label htmlFor="bass" className="text-white font-semibold">Bass Boost</Label>
                        <Switch 
                          id="bass" 
                          checked={settings.bassBoost}
                          onCheckedChange={() => handleToggleFilter('bassBoost')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <Label htmlFor="night" className="text-white font-semibold">Nightcore</Label>
                        <Switch 
                          id="night" 
                          checked={settings.nightcore}
                          onCheckedChange={() => handleToggleFilter('nightcore')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                        <Label htmlFor="vapor" className="text-white font-semibold">Vaporwave</Label>
                        <Switch 
                          id="vapor" 
                          checked={settings.vaporwave}
                          onCheckedChange={() => handleToggleFilter('vaporwave')}
                        />
                      </div>
                    </div>

                    <div className="space-y-4 border-t border-white/5 pt-6">
                      <Label className="text-white font-bold flex items-center gap-2">
                        🔊 Volume Control
                      </Label>
                      <div className="flex items-center gap-4">
                        <Slider 
                          defaultValue={[settings.volume]} 
                          max={200} 
                          step={1} 
                          className="flex-1 cursor-pointer"
                          onValueCommit={handleVolumeChange}
                        />
                        <span className="text-sm font-mono font-bold w-12 text-right text-pink-400">{settings.volume}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
