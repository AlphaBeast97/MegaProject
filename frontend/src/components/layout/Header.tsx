import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { ChefHat, PlusCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Recipe Manager
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <SignedIn>
              <Link 
                to="/recipes" 
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                My Recipes
              </Link>
              <Button 
                onClick={() => navigate('/recipes/new')}
                className="btn-hero flex items-center space-x-2"
              >
                <PlusCircle className="h-4 w-4" />
                <span>New Recipe</span>
              </Button>
            </SignedIn>
          </nav>

          {/* Auth */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" className="font-medium">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10"
                  }
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}