
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import MyEngagements from "./pages/MyEngagements";
import RecentEngagements from "./pages/RecentEngagements";
import EngagementDetail from "./pages/EngagementDetail";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="my-engagements" element={<MyEngagements />} />
                <Route path="recent-engagements" element={<RecentEngagements />} />
                <Route path="engagement/:id" element={<EngagementDetail />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
