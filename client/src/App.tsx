import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Timer from "@/pages/timer";
import History from "@/pages/history";
import Navigation from "@/components/navigation";

function Router() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Switch>
        <Route path="/" component={Timer} />
        <Route path="/timer" component={Timer} />
        <Route path="/history" component={History} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
