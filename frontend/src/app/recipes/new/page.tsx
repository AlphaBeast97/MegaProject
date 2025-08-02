"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Trash2, Loader2, Sparkles, ChefHat } from "lucide-react";
import { useUser, useAuth } from "@clerk/nextjs";
import "./animations.css";

const recipeSchema = z.object({
  ingredients: z
    .array(
      z.object({ value: z.string().min(1, "Ingredient cannot be empty.") })
    )
    .min(1, "At least one ingredient is required"),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

export default function NewRecipePage() {
  const { toast } = useToast();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<any>(null);

  const API_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      ingredients: [{ value: "" }],
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const handleGenerate = async () => {
    const ingredients = form
      .getValues("ingredients")
      .map((i) => i.value.trim())
      .filter((i) => i !== "");

    if (ingredients.length === 0) {
      toast({
        title: "Error",
        description:
          "Please provide at least one ingredient to generate a recipe.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      toast({
        title: "Generating Recipe...",
        description:
          "Our AI is creating a complete recipe from your ingredients.",
      });

      const token = await getToken();
      const response = await fetch(`${API_URL}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "ingredients",
          content: {
            userid: user?.id,
            ingredients: ingredients,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipe");
      }

      const generatedRecipe = await response.json();
      setGeneratedRecipe(generatedRecipe);

      toast({
        title: "Recipe Generated!",
        description:
          "A complete recipe has been created from your ingredients.",
      });
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast({
        title: "Generation Failed",
        description: "Could not generate recipe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const onSubmit = (data: RecipeFormValues) => {
    handleGenerate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative z-0">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 via-green-100/20 to-teal-100/20"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-40 right-10 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 pt-12 sm:pt-16 pb-12 max-w-6xl relative z-0">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12 space-y-4">
          <div className="animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-bold bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 bg-clip-text text-transparent mb-4">
              Create Recipe from Ingredients
            </h1>
            <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-6">
              <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500 animate-pulse" />
              <div className="w-6 sm:w-8 border-t-2 border-emerald-300"></div>
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 animate-pulse delay-500" />
              <div className="w-6 sm:w-8 border-t-2 border-green-300"></div>
              <PlusCircle className="h-6 w-6 sm:h-8 sm:w-8 text-teal-500 animate-pulse delay-1000" />
            </div>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Transform your available ingredients into amazing recipes with our AI-powered recipe generator! 🥬✨
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-0">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Ingredients Input Section */}
            <Card className="group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-fade-in-left">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-t-lg p-4 sm:p-6">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <ChefHat className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
                  Your Ingredients
                </CardTitle>
                <CardDescription className="text-emerald-100 text-sm sm:text-base">
                  List the ingredients you have available
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div className="space-y-3 sm:space-y-4">
                      {ingredientFields.map((field, index) => (
                        <FormField
                          key={field.id}
                          control={form.control}
                          name={`ingredients.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="relative flex-1">
                                  <FormControl>
                                    <Input
                                      placeholder={`Ingredient ${index + 1}`}
                                      {...field}
                                      className="pr-12 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 text-sm sm:text-base h-10 sm:h-11"
                                    />
                                  </FormControl>
                                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-pulse"></div>
                                  </div>
                                </div>
                                {ingredientFields.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeIngredient(index)}
                                    className="hover:bg-red-100 hover:text-red-600 transition-colors duration-200 h-10 w-10 sm:h-11 sm:w-11"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>

                    <div className="space-y-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendIngredient({ value: "" })}
                        className="w-full sm:w-auto hover:bg-emerald-50 border-emerald-200 hover:border-emerald-300 transition-all duration-200 text-sm sm:text-base py-2 sm:py-2.5"
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Add Ingredient</span>
                        <span className="sm:hidden">Add</span>
                      </Button>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-3 sm:py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
                        disabled={isGenerating}
                        size="lg"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                            <span className="hidden sm:inline">Generating Recipe...</span>
                            <span className="sm:hidden">Generating...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
                            <span className="hidden sm:inline">Generate Recipe with AI</span>
                            <span className="sm:hidden">Generate Recipe</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Generated Recipe Section */}
            <Card className="group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-fade-in-right">
              <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-t-lg p-4 sm:p-6">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                  <Sparkles className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
                  Generated Recipe
                </CardTitle>
                <CardDescription className="text-green-100 text-sm sm:text-base">
                  AI-created recipe based on your ingredients
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center py-12 sm:py-16 space-y-4 sm:space-y-6 animate-pulse-glow">
                    <div className="relative">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full animate-spin-slow"></div>
                      <div className="absolute inset-2 sm:inset-3 bg-white rounded-full flex items-center justify-center">
                        <ChefHat className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500 animate-bounce" />
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-base sm:text-lg font-semibold text-gray-700">
                        Our AI chef is creating your recipe...
                      </p>
                      <p className="text-sm text-gray-500">
                        Combining your ingredients into something delicious
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-400 rounded-full animate-bounce-1"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-bounce-2"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-teal-400 rounded-full animate-bounce-3"></div>
                    </div>
                  </div>
                ) : generatedRecipe ? (
                  <div className="space-y-4 sm:space-y-6 animate-fade-in-up">
                    {/* Recipe Header with Image */}
                    <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                      {generatedRecipe.imageUrl && (
                        <div className="md:w-1/3">
                          <div className="relative h-40 sm:h-48 w-full group">
                            <img
                              src={generatedRecipe.imageUrl}
                              alt={generatedRecipe.title}
                              className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                console.error("Image load error:", e);
                                e.currentTarget.style.display = "none";
                                const fallback =
                                  e.currentTarget.parentElement?.querySelector(
                                    ".fallback-div"
                                  );
                                if (fallback)
                                  (fallback as HTMLElement).style.display = "flex";
                              }}
                            />
                            <div
                              className="fallback-div absolute inset-0 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center"
                              style={{ display: "none" }}
                            >
                              <div className="text-center text-emerald-600">
                                <ChefHat className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2" />
                                <span className="text-xs sm:text-sm font-medium">
                                  Recipe Image
                                </span>
                              </div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        </div>
                      )}
                      <div
                        className={generatedRecipe.imageUrl ? "md:w-2/3" : "w-full"}
                      >
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                          {generatedRecipe.title}
                        </h3>
                        <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                          {generatedRecipe.description}
                        </p>

                        {/* Recipe Metadata */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm mb-3 sm:mb-4">
                          <div className="text-center p-2 sm:p-3 bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg border border-emerald-100">
                            <div className="font-semibold text-emerald-700">
                              Prep Time
                            </div>
                            <div className="text-emerald-600 font-medium">
                              {generatedRecipe.prepTime || "N/A"}
                            </div>
                          </div>
                          <div className="text-center p-2 sm:p-3 bg-gradient-to-br from-green-50 to-teal-50 rounded-lg border border-green-100">
                            <div className="font-semibold text-green-700">
                              Cook Time
                            </div>
                            <div className="text-green-600 font-medium">
                              {generatedRecipe.cookTime || "N/A"}
                            </div>
                          </div>
                          <div className="text-center p-2 sm:p-3 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg border border-teal-100">
                            <div className="font-semibold text-teal-700">
                              Category
                            </div>
                            <div className="text-teal-600 font-medium">
                              {generatedRecipe.category || "Uncategorized"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Ingredients and Instructions */}
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 sm:p-6 border border-emerald-100">
                        <h4 className="font-semibold mb-3 text-base sm:text-lg flex items-center text-emerald-700">
                          <ChefHat className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                          Ingredients:
                        </h4>
                        <ul className="space-y-2 sm:space-y-3">
                          {generatedRecipe.ingredients?.map(
                            (ingredient: string, index: number) => (
                              <li key={index} className="text-xs sm:text-sm flex items-start group animate-slide-in-left" style={{ animationDelay: `${index * 100}ms` }}>
                                <span className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mr-3 mt-1.5 sm:mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></span>
                                <span className="text-gray-700 group-hover:text-emerald-700 transition-colors duration-200">{ingredient}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4 sm:p-6 border border-green-100">
                        <h4 className="font-semibold mb-3 text-base sm:text-lg flex items-center text-green-700">
                          <Sparkles className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                          Instructions:
                        </h4>
                        <ol className="space-y-2 sm:space-y-3">
                          {generatedRecipe.instructions?.map(
                            (instruction: string, index: number) => (
                              <li key={index} className="text-xs sm:text-sm flex group animate-slide-in-right" style={{ animationDelay: `${index * 150}ms` }}>
                                <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                                  {index + 1}
                                </span>
                                <span className="text-gray-700 leading-relaxed group-hover:text-green-700 transition-colors duration-200">{instruction}</span>
                              </li>
                            )
                          )}
                        </ol>
                      </div>
                    </div>

                    {/* Additional Recipe Details */}
                    {(generatedRecipe.createdAt || generatedRecipe._id) && (
                      <div className="pt-3 sm:pt-4 border-t border-gray-200 animate-fade-in delay-1000">
                        <div className="text-xs text-gray-500 text-center">
                          Recipe generated on{" "}
                          {new Date(
                            generatedRecipe.createdAt || generatedRecipe._id
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center animate-fade-in">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-200 to-green-200 rounded-full flex items-center justify-center mb-4 sm:mb-6 animate-float">
                      <ChefHat className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-500" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                      Ready to Cook Something Amazing?
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 max-w-sm">
                      Add your ingredients and let our AI create a personalized recipe just for you
                    </p>
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-400">
                      <div className="flex items-center">
                        <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-emerald-400" />
                        AI-Powered Creation
                      </div>
                      <div className="flex items-center">
                        <ChefHat className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-green-400" />
                        Instant Results
                      </div>
                      <div className="flex items-center">
                        <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-teal-400" />
                        Custom Recipes
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
