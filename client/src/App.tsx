import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import GuildSettingsPage from "@/pages/guild-settings";
import Features from "@/pages/features";
import Commands from "@/pages/commands";
import Premium from "@/pages/premium";
import Changelog from "@/pages/changelog";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Community from "@/pages/community";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/features" component={Features} />
        <Route path="/commands" component={Commands} />
        <Route path="/premium" component={Premium} />
        <Route path="/changelog" component={Changelog} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/community" component={Community} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/dashboard/:id" component={GuildSettingsPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
