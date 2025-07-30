import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Recipes from "./pages/Recipes";
import CreateRecipe from "./pages/CreateRecipe";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient();

const App = () => {
  console.log('App component rendering...');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header />
            <Routes>
              <Route path="/" element={
                <>
                  <SignedOut>
                    <Index />
                  </SignedOut>
                  <SignedIn>
                    <Dashboard />
                  </SignedIn>
                </>
              } />
              <Route path="/dashboard" element={
                <SignedIn>
                  <Dashboard />
                </SignedIn>
              } />
              <Route path="/recipes" element={
                <SignedIn>
                  <Recipes />
                </SignedIn>
              } />
              <Route path="/recipes/new" element={
                <SignedIn>
                  <CreateRecipe />
                </SignedIn>
              } />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
