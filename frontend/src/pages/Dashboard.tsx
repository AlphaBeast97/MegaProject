import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { PlusCircle, BookOpen, Clock, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Recipe } from '@/types';
import { recipeApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RecipeCard from '@/components/recipe/RecipeCard';
import heroImage from '@/assets/hero-cooking.jpg';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchUserRecipes();
    }
  }, [user]);

  const fetchUserRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipeApi.getUserRecipes(user?.id || '');
      setRecipes(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load recipes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const recentRecipes = recipes.slice(0, 3);
  const totalRecipes = recipes.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in-up">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Welcome back,{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {user?.firstName || 'Chef'}
                </span>
                ! 👨‍🍳
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Ready to create something delicious? Manage your recipes, discover new flavors, 
                and bring your culinary dreams to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate('/recipes/new')}
                  className="btn-hero text-lg px-8 py-4"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Create New Recipe
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/recipes')}
                  className="text-lg px-8 py-4 border-2 hover:border-primary"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  View All Recipes
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Beautiful cooking scene"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Recipes
                </CardTitle>
                <BookOpen className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{totalRecipes}</div>
                <p className="text-xs text-muted-foreground">
                  Your culinary collection
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Recent Activity
                </CardTitle>
                <Clock className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {recipes.length > 0 ? 'Active' : 'Getting Started'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {recipes.length > 0 ? 'Keep cooking!' : 'Create your first recipe'}
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Growth
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">📈</div>
                <p className="text-xs text-muted-foreground">
                  Building your cookbook
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Recipes */}
      {recentRecipes.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Recent Recipes</h2>
              <Link 
                to="/recipes" 
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                View all →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentRecipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {recipes.length === 0 && !loading && (
        <section className="py-16">
          <div className="max-w-md mx-auto text-center px-4">
            <div className="text-6xl mb-6">👨‍🍳</div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Start Your Culinary Journey
            </h2>
            <p className="text-muted-foreground mb-8">
              You haven't created any recipes yet. Let's get cooking and build your personal cookbook!
            </p>
            <Button 
              onClick={() => navigate('/recipes/new')}
              className="btn-hero text-lg px-8 py-4"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Create Your First Recipe
            </Button>
          </div>
        </section>
      )}
    </div>
  );
}