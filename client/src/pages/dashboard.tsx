import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { guildsApi } from "@/lib/api";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, Plus, AlertCircle, Loader } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

interface Guild {
  id: string;
  name: string;
  icon: string | null;
  isAdmin: boolean;
  botInGuild: boolean;
}

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const [_, setLocation] = useLocation();
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, setLocation]);

  useEffect(() => {
    if (isAuthenticated) {
      loadGuilds();
    }
  }, [isAuthenticated]);

  async function loadGuilds() {
    try {
      setLoading(true);
      const data = await guildsApi.getAll();
      setGuilds(data);
    } catch (error) {
      console.error("Failed to load guilds:", error);
    } finally {
      setLoading(false);
    }
  }

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-12 h-12 text-pink-500 animate-spin" />
          <p className="text-gray-400">Loading your servers...</p>
        </div>
      </div>
    );
  }

  const adminGuilds = guilds.filter(g => g.isAdmin);

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-12"
      >
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-black mb-2 text-white">
            <span className="bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">Your Servers</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Manage Moody Bot settings across your Discord servers.
          </p>
        </div>
        <div className="hidden lg:flex px-6 py-3 rounded-full bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-pink-500/30 text-white text-sm font-bold">
          {adminGuilds.length} Server{adminGuilds.length !== 1 ? 's' : ''}
        </div>
      </motion.div>

      {adminGuilds.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center bg-gradient-to-br from-pink-500/10 to-cyan-500/10 rounded-3xl border-2 border-dashed border-pink-500/30"
        >
          <AlertCircle className="w-16 h-16 text-pink-500/50 mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">No Servers Found</h3>
          <p className="text-gray-400 max-w-md mb-8">
            You don't have any servers where you are an administrator. Invite Moody to your server first!
          </p>
          <Button className="font-bold bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white rounded-lg">
            Invite Bot
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminGuilds.map((guild, i) => (
            <motion.div
              key={guild.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="relative overflow-hidden h-full border-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-cyan-900/20 hover-glow group">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="h-24 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 group-hover:from-pink-500/30 group-hover:to-cyan-500/30 transition-all relative" />
                
                <CardHeader className="relative pb-2">
                  <Avatar className="w-16 h-16 absolute -top-8 left-6 border-4 border-background shadow-xl ring-2 ring-gradient-to-r from-pink-500 to-cyan-500">
                    <AvatarImage src={guild.icon || undefined} />
                    <AvatarFallback className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white text-lg font-bold">
                      {guild.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="pt-8">
                    <CardTitle className="text-xl text-white truncate group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-cyan-400 transition-all">
                      {guild.name}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`w-3 h-3 rounded-full ${guild.botInGuild ? 'bg-gradient-to-r from-green-400 to-emerald-400 shadow-lg shadow-green-500/50' : 'bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg shadow-yellow-500/50'}`} />
                    <span className="text-gray-400">{guild.botInGuild ? '✓ Bot Active' : '⚠ Bot Not Added'}</span>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t border-white/10 relative">
                  {guild.botInGuild ? (
                    <Link href={`/dashboard/${guild.id}`}>
                      <Button className="w-full font-bold rounded-lg bg-gradient-to-r from-pink-500/20 to-cyan-500/20 hover:from-pink-500/40 hover:to-cyan-500/40 border border-pink-500/30 hover:border-pink-500/50 text-white transition-all">
                        <Settings className="w-4 h-4 mr-2" />
                        Manage Bot
                      </Button>
                    </Link>
                  ) : (
                    <Button className="w-full font-bold rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Invite Bot
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
