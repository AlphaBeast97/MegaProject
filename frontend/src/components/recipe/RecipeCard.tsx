import { Clock, Users, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Recipe } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Link to={`/recipes/${recipe._id}`} className="block">
      <Card className="recipe-card h-full hover:border-primary/50 transition-all duration-300">
        <CardHeader className="pb-3">
          <h3 className="font-semibold text-lg text-foreground line-clamp-2 leading-tight">
            {recipe.title}
          </h3>
        </CardHeader>
        
        <CardContent className="pb-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>{recipe.ingredients.length} ingredients</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4 text-secondary" />
                <span>{recipe.instructions.length} steps</span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0">
          <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>Created {formatDate(recipe.createdAt)}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}