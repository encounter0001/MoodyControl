import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/mock-auth";
import { Button } from "@/components/ui/button";
import { Music, LayoutDashboard, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import robotLogo from "@assets/generated_images/neon_robot_music_bot_logo.png";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, login, logout, isAuthenticated } = useAuth();
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden ring-2 ring-primary/50 group-hover:ring-primary transition-all shadow-[0_0_15px_-3px_rgba(139,92,246,0.5)]">
                <img src={robotLogo} alt="Moody Bot" className="w-full h-full object-cover" />
              </div>
              <span className="font-display font-bold text-xl tracking-wider text-white group-hover:text-primary transition-colors">
                MOODY<span className="text-primary">BOT</span>
              </span>
            </a>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/">
              <a className={`text-sm font-medium hover:text-primary transition-colors ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>Home</a>
            </Link>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Commands</a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Support</a>
          </nav>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button variant="ghost" className={`hidden md:flex gap-2 ${location.startsWith('/dashboard') ? 'bg-primary/10 text-primary' : ''}`}>
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-white/10 hover:ring-primary/50 p-0 overflow-hidden transition-all">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.avatar} alt={user?.username} />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {user?.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-card border-white/10" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-white">{user?.username}</p>
                        <p className="text-xs leading-none text-muted-foreground">#{user?.discriminator}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem className="focus:bg-primary/20 focus:text-white cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-primary/20 focus:text-white cursor-pointer" onClick={() => logout()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button 
                onClick={() => login()}
                className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)] border border-white/10"
              >
                Login with Discord
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16 relative">
        {children}
      </main>

      <footer className="border-t border-white/5 bg-black/40 backdrop-blur-sm py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary">
                  <Music className="w-5 h-5" />
                </div>
                <span className="font-display font-bold text-lg">MOODY</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The most advanced music bot for your Discord server. Developed by WYNO LIVE.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Premium</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm text-muted-foreground">
            © 2025 Moody Music Bot. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
