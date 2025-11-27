import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useAuth, useGuilds } from "@/lib/mock-auth";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, Plus, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { guilds } = useGuilds();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) return null;

  // Filter guilds where user is admin
  const adminGuilds = guilds.filter(g => g.isAdmin);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Select a Server</h1>
          <p className="text-muted-foreground">
            Manage Moody Bot settings for your Discord servers.
          </p>
        </div>
        <div className="hidden md:block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
          {adminGuilds.length} Manageable Servers
        </div>
      </div>

      {adminGuilds.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-card/30 rounded-2xl border border-white/5 border-dashed">
          <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Servers Found</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            You don't have any servers where you are an administrator, or Moody Bot isn't in your servers yet.
          </p>
          <Button>Invite Moody Bot</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminGuilds.map((guild, i) => (
            <motion.div
              key={guild.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-card/40 backdrop-blur-sm border-white/5 hover:border-primary/50 transition-all duration-300 group overflow-hidden">
                <div className="h-24 bg-gradient-to-r from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors" />
                
                <CardHeader className="relative pb-2">
                  <Avatar className="w-16 h-16 absolute -top-8 left-6 border-4 border-background shadow-lg">
                    <AvatarImage src={guild.icon || undefined} />
                    <AvatarFallback className="bg-muted text-muted-foreground text-lg">
                      {guild.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="pt-8">
                    <CardTitle className="text-xl text-white truncate">{guild.name}</CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className={`w-2 h-2 rounded-full ${guild.botInGuild ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    {guild.botInGuild ? 'Bot Active' : 'Bot Not Added'}
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t border-white/5">
                  {guild.botInGuild ? (
                    <Link href={`/dashboard/${guild.id}`}>
                      <Button className="w-full bg-white/5 hover:bg-primary hover:text-white border-white/10 transition-all">
                        <Settings className="w-4 h-4 mr-2" />
                        Manage Bot
                      </Button>
                    </Link>
                  ) : (
                    <Button className="w-full" variant="secondary">
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
