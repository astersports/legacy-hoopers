import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import Records from "./pages/Records";
import Schedule from "./pages/Schedule";
import Highlights from "./pages/Highlights";
import Dashboard from "./pages/Dashboard";
import Mission from "./pages/Mission";
import CoachKenny from "./pages/CoachKenny";
import Layout from "./components/Layout";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/programs" component={Programs} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/records" component={Records} />
        <Route path="/highlights" component={Highlights} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/mission" component={Mission} />
        <Route path="/coach-kenny" component={CoachKenny} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
