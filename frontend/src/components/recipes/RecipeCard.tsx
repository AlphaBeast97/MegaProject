import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import type { Recipe } from '@/types';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe._id}`} className="group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1.5">
        <div className="relative h-48 w-full">
          <Image
            src={recipe.imageUrl || 'https://placehold.co/600x400'}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={recipe.dataAiHint}
          />
        </div>
        <CardHeader>
          <Badge variant="secondary" className="w-fit mb-2">{recipe.category}</Badge>
          <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">
            {recipe.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {recipe.description}
          </p>
        </CardContent>
        <CardFooter>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            <span>{recipe.prepTime} + {recipe.cookTime}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
