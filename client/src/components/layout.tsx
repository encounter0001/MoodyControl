import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Music, LayoutDashboard, LogOut, User, Loader, Menu, X } from "lucide-react";
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
import { useState } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, login, logout, isAuthenticated, isLoading } = useAuth();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-pink-500/20 bg-gradient-to-r from-background/80 via-background/80 to-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden ring-2 ring-gradient-to-r from-pink-500 to-cyan-500 group-hover:ring-pink-400 transition-all shadow-[0_0_20px_rgba(255,0,255,0.4)]">
                <img src={robotLogo} alt="Moody Bot" className="w-full h-full object-cover" />
              </div>
              <span className="font-display font-black text-xl tracking-wider bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                MOODY<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">BOT</span>
              </span>
            </a>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/">
              <a className={`text-sm font-bold transition-all duration-300 ${location === '/' ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400' : 'text-gray-400 hover:text-pink-400'}`}>
                Home
              </a>
            </Link>
            <Link href="/features">
              <a className={`text-sm font-bold transition-all duration-300 ${location === '/features' ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400' : 'text-gray-400 hover:text-pink-400'}`}>
                Features
              </a>
            </Link>
            <Link href="/commands">
              <a className={`text-sm font-bold transition-all duration-300 ${location === '/commands' ? 'text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400' : 'text-gray-400 hover:text-pink-400'}`}>
                Commands
              </a>
            </Link>
            <a href="#" className="text-sm font-bold text-gray-400 hover:text-pink-400 transition-all duration-300">Support</a>
          </nav>

          <div className="flex items-center gap-4">
            {isLoading ? (
              <Loader className="w-4 h-4 animate-spin bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent" />
            ) : isAuthenticated ? (
              <div className="hidden md:flex items-center gap-4">
                <Link href="/dashboard">
                  <Button className={`gap-2 font-bold rounded-lg ${location.startsWith('/dashboard') ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white' : 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 hover:from-cyan-500/40 hover:to-blue-500/40'}`}>
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="relative h-10 w-10 rounded-full ring-2 ring-gradient-to-r from-pink-500 to-cyan-500 hover:ring-pink-400 p-0 overflow-hidden transition-all shadow-lg shadow-pink-500/30">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.avatar} alt={user?.username} />
                        <AvatarFallback className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold">
                          {user?.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-gradient-to-b from-purple-900/90 to-blue-900/90 border border-pink-500/30 backdrop-blur-xl" align="end" forceMount>
                    <DropdownMenuLabel className="font-bold">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">{user?.username}</p>
                        <p className="text-xs text-gray-400">#{user?.discriminator}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem className="focus:bg-pink-500/20 focus:text-pink-300 cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-red-500/20 focus:text-red-300 cursor-pointer" onClick={() => logout()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button 
                onClick={() => login()}
                className="hidden md:inline-flex font-bold bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white rounded-lg shadow-lg shadow-pink-500/40 hover:scale-105 transition-all"
              >
                Login with Discord
              </Button>
            )}

            {/* Mobile Menu */}
            <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-pink-500/20 bg-gradient-to-b from-background/90 to-background/80 backdrop-blur-xl">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link href="/">
                <a className="block text-sm font-bold text-gray-400 hover:text-pink-400">Home</a>
              </Link>
              <Link href="/features">
                <a className="block text-sm font-bold text-gray-400 hover:text-pink-400">Features</a>
              </Link>
              <Link href="/commands">
                <a className="block text-sm font-bold text-gray-400 hover:text-pink-400">Commands</a>
              </Link>
              {isAuthenticated && (
                <Link href="/dashboard">
                  <Button className="w-full font-bold bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg">
                    Dashboard
                  </Button>
                </Link>
              )}
              {!isAuthenticated && (
                <Button 
                  onClick={() => login()}
                  className="w-full font-bold bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-lg"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 pt-16 relative">
        {children}
      </main>

      <footer className="border-t border-pink-500/20 bg-gradient-to-r from-background via-background to-background py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-gradient-to-r from-pink-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  <Music className="w-5 h-5" />
                </div>
                <span className="font-display font-black text-lg bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">MOODY</span>
              </div>
              <p className="text-sm text-gray-400">
                The ultimate Discord music bot. Developed with love by WYNO LIVE.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-pink-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Premium</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-pink-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">API</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Community</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-pink-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-sm text-gray-400">
            © 2025 Moody Music Bot. All rights reserved. Built with 💖 for Discord.
          </div>
        </div>
      </footer>
    </div>
  );
}
