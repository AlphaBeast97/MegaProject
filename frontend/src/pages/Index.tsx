import { SignInButton, SignUpButton } from '@clerk/clerk-react';
import { ChefHat, BookOpen, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-cooking.jpg';

const Index = () => {
  console.log('Index component rendering...');
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <div className="flex items-center space-x-2 mb-6">
                <ChefHat className="h-10 w-10 text-primary" />
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Recipe Manager
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Your Personal
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
                  Digital Cookbook
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Organize, create, and share your favorite recipes. Build your culinary collection 
                and never lose a great recipe again. Start cooking with confidence! 👨‍🍳
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <SignUpButton mode="modal">
                  <Button className="btn-hero text-lg px-8 py-4">
                    Start Cooking Free
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button variant="outline" className="text-lg px-8 py-4 border-2 hover:border-primary">
                    Sign In
                  </Button>
                </SignInButton>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl shadow-2xl w-full h-[500px] flex items-center justify-center">
                <div className="text-center">
                  <ChefHat className="h-24 w-24 text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">Recipe Management App</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need to Cook Better
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make recipe management effortless and enjoyable
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Organize Recipes</h3>
              <p className="text-muted-foreground">
                Keep all your favorite recipes in one place. Add ingredients, instructions, and notes with ease.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Share & Discover</h3>
              <p className="text-muted-foreground">
                Share your culinary creations with friends and discover new recipes from the community.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Cook with Confidence</h3>
              <p className="text-muted-foreground">
                Step-by-step instructions and ingredient lists help you create perfect dishes every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Culinary Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of home cooks who are already organizing their recipes with Recipe Manager
          </p>
          <SignUpButton mode="modal">
            <Button className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4 font-semibold">
              Get Started for Free
            </Button>
          </SignUpButton>
        </div>
      </section>
    </div>
  );
};

export default Index;
