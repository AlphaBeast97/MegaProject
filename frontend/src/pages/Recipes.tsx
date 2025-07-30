import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Search, PlusCircle, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '@/types';
import { recipeApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RecipeCard from '@/components/recipe/RecipeCard';
import { useToast } from '@/hooks/use-toast';

export default function Recipes() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user?.id) {
      fetchUserRecipes();
    }
  }, [user]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredRecipes(filtered);
    }
  }, [searchQuery, recipes]);

  const fetchUserRecipes = async () => {
    try {
      setLoading(true);
      const response = await recipeApi.getUserRecipes(user?.id || '');
      setRecipes(response.data);
      setFilteredRecipes(response.data);
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">My Recipes</h1>
            <p className="text-lg text-muted-foreground">
              Manage and explore your culinary creations
            </p>
          </div>
          <Button 
            onClick={() => navigate('/recipes/new')}
            className="btn-hero flex items-center space-x-2 self-start lg:self-auto"
          >
            <PlusCircle className="h-5 w-5" />
            <span>New Recipe</span>
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search recipes by title or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 form-input"
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg p-6 animate-pulse">
                <div className="h-6 bg-muted rounded mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            ))}
          </div>
        )}

        {/* Recipes Grid */}
        {!loading && filteredRecipes.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && recipes.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📚</div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              No Recipes Yet
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Your recipe collection is empty. Start building your personal cookbook by creating your first recipe!
            </p>
            <Button 
              onClick={() => navigate('/recipes/new')}
              className="btn-hero text-lg px-8 py-4"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Create Your First Recipe
            </Button>
          </div>
        )}

        {/* No Search Results */}
        {!loading && recipes.length > 0 && filteredRecipes.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              No Recipes Found
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              We couldn't find any recipes matching "{searchQuery}". Try adjusting your search terms.
            </p>
            <Button 
              onClick={() => setSearchQuery('')}
              variant="outline"
              className="text-lg px-8 py-4"
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}