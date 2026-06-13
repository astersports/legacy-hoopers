import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Records from "./pages/Records";
import Academy from "./pages/Academy";
import Mission from "./pages/Mission";
import CoachKenny from "./pages/CoachKenny";
import Locations from "./pages/Locations";
import Register from "./pages/Register";
import Layout from "./components/Layout";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/records" component={Records} />
        <Route path="/academy" component={Academy} />
        <Route path="/mission" component={Mission} />
        <Route path="/coach-kenny" component={CoachKenny} />
        <Route path="/locations" component={Locations} />
        <Route path="/register" component={Register} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
