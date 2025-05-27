
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MartialArtDetails from "./pages/MartialArtDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import OlympicFighting from "./pages/OlympicFighting";
import Curiosities from "./pages/Curiosities";
import TimeLine from "./pages/TimeLine";
import FightSocialPage from "./pages/FightSocialPage";
import FindGymsPage from "./pages/FindGymsPage";
import Mobile from "./pages/MobilePage";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/martial-art/:id" element={<MartialArtDetails />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/olympic-fighting" element={<OlympicFighting />} />
            <Route path="/curiosities" element={<Curiosities />} />
            <Route path="/timeline" element={<TimeLine />} />
            <Route path="/fight-social/:id" element={<FightSocialPage />} />
            <Route path="/find-gyms/:id" element={<FindGymsPage />} />
            <Route path="/mobile-game" element={<Mobile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
