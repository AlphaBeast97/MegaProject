'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateRecipeSuggestionsFromImage } from '@/ai/flows/generate-recipe-suggestions-from-image';
import { Lightbulb, Loader2, Upload, Image as ImageIcon, X } from 'lucide-react';
import NextImage from 'next/image';

export default function GenerateFromImagePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          title: "Image too large",
          description: "Please upload an image smaller than 4MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setImageData(result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const clearImage = () => {
      setImagePreview(null);
      setImageData(null);
      if(fileInputRef.current) {
          fileInputRef.current.value = "";
      }
  }

  const handleSubmit = async () => {
    if (!imageData) {
      toast({
        title: 'No Image Selected',
        description: 'Please upload an image of your ingredients first.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setSuggestions([]);
    try {
      const result = await generateRecipeSuggestionsFromImage({ foodImageUri: imageData });
      setSuggestions(result.suggestions);
    } catch (error) {
      toast({
        title: 'Generation Failed',
        description: 'Could not generate suggestions from the image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-0">
      <div className="mb-8">
        <h1 className="text-4xl font-headline font-bold mb-2 flex items-center gap-2">
            <ImageIcon className="w-8 h-8" />
            Recipe from Image
        </h1>
        <p className="text-muted-foreground">
          Upload a picture of your ingredients, and let AI inspire your next meal.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Your Ingredients</CardTitle>
            <CardDescription>Take a picture of what you have, and we'll do the rest.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div 
              className="relative w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center text-muted-foreground cursor-pointer hover:border-primary hover:bg-secondary/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange}
              />
              {imagePreview ? (
                <>
                    <NextImage src={imagePreview} layout="fill" objectFit="contain" alt="Ingredients preview" className="rounded-md p-2"/>
                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 z-10 h-8 w-8" onClick={(e) => {e.stopPropagation(); clearImage();}}>
                        <X className="h-4 w-4"/>
                    </Button>
                </>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12" />
                  <p>Click to upload or drag and drop</p>
                  <p className="text-xs">PNG, JPG, GIF up to 4MB</p>
                </div>
              )}
            </div>

            <Button onClick={handleSubmit} disabled={isLoading || !imageData} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Image...
                </>
              ) : (
                <>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Generate Recipes
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle>AI-Powered Suggestions</CardTitle>
            <CardDescription>Recipe ideas based on your image will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center h-full min-h-[200px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            {suggestions.length > 0 && (
              <ul className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="p-3 bg-card rounded-md shadow-sm border flex items-center gap-3">
                    <span className="font-bold text-primary">{index + 1}.</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            )}
            {!isLoading && suggestions.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full min-h-[200px]">
                 <Lightbulb className="h-10 w-10 mb-4"/>
                 <p>Upload an image to see what you can cook!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
