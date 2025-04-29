import { Switch, Route } from "wouter";
import { Toaster } from "./components/ui/toaster";
import { useEffect } from "react";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/not-found";
import SmoothScroll from "./components/SmoothScroll";

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="bg-[#171717] min-h-screen">
      <SmoothScroll>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/project/:id" component={ProjectDetails} />
          <Route path="/admin" component={Admin} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </SmoothScroll>
      <Toaster />
    </div>
  );
}

export default App;
