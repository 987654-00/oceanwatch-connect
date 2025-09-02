import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import ReportHazard from "./pages/ReportHazard";
import InteractiveMap from "./pages/InteractiveMap";
import SocialMediaMonitoring from "./pages/SocialMediaMonitoring";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="map" element={<InteractiveMap />} />
            <Route path="report" element={<ReportHazard />} />
            <Route path="reports" element={<div className="p-6">My Reports - Coming Soon</div>} />
            <Route path="monitoring" element={<div className="p-6">Real-time Data - Coming Soon</div>} />
            <Route path="social" element={<SocialMediaMonitoring />} />
            <Route path="analytics" element={<div className="p-6">Analytics - Coming Soon</div>} />
            <Route path="hotspots" element={<div className="p-6">Hotspots - Coming Soon</div>} />
            <Route path="users" element={<div className="p-6">User Management - Coming Soon</div>} />
            <Route path="settings" element={<div className="p-6">Settings - Coming Soon</div>} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
