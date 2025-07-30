import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Minus, Save, ArrowLeft } from 'lucide-react';
import { recipeApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const recipeSchema = z.object({
  title: z.string().min(1, 'Recipe title is required').max(100, 'Title must be under 100 characters'),
  ingredients: z.array(z.object({
    value: z.string().min(1, 'Ingredient cannot be empty')
  })).min(1, 'At least one ingredient is required'),
  instructions: z.array(z.object({
    value: z.string().min(1, 'Instruction cannot be empty')
  })).min(1, 'At least one instruction is required'),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

export default function CreateRecipe() {
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: '',
      ingredients: [{ value: '' }],
      instructions: [{ value: '' }],
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    name: 'instructions',
  });

  const onSubmit = async (data: RecipeFormData) => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to create a recipe.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const recipeData = {
        title: data.title,
        ingredients: data.ingredients.map(ing => ing.value),
        instructions: data.instructions.map(inst => inst.value),
        userId: user.id, // Fixed: Changed from 'userid' to 'userId'
      };

      await recipeApi.createRecipe(recipeData);

      toast({
        title: "Success! 🎉",
        description: "Your recipe has been created successfully.",
      });

      navigate('/recipes');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create recipe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/recipes')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Create New Recipe</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Share your culinary masterpiece with the world
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Recipe Title */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Recipe Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Recipe Title *
                </label>
                <Input
                  {...register('title')}
                  placeholder="Enter your recipe name..."
                  className="form-input text-lg"
                />
                {errors.title && (
                  <p className="text-destructive text-sm mt-1">{errors.title.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Ingredients</span>
                <Button
                  type="button"
                  onClick={() => appendIngredient({ value: '' })}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {ingredientFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-3">
                    <div className="flex-1">
                      <Input
                        {...register(`ingredients.${index}.value` as const)}
                        placeholder={`Ingredient ${index + 1}...`}
                        className="form-input"
                      />
                      {errors.ingredients?.[index]?.value && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.ingredients[index]?.value?.message}
                        </p>
                      )}
                    </div>
                    {ingredientFields.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Instructions</span>
                <Button
                  type="button"
                  onClick={() => appendInstruction({ value: '' })}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Step</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {instructionFields.map((field, index) => (
                  <div key={field.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold mt-1">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <Textarea
                        {...register(`instructions.${index}.value` as const)}
                        placeholder={`Step ${index + 1} instructions...`}
                        className="form-input min-h-[80px] resize-none"
                        rows={3}
                      />
                      {errors.instructions?.[index]?.value && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.instructions[index]?.value?.message}
                        </p>
                      )}
                    </div>
                    {instructionFields.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeInstruction(index)}
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive mt-1"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/recipes')}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="btn-hero flex items-center space-x-2 min-w-[140px]"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>{isLoading ? 'Creating...' : 'Create Recipe'}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}