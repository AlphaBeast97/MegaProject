"use client";

import { useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload, Loader2, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";

export default function ImageToRecipePage() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<any>(null);

  const API_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

  // Function to upload image to backend (which uploads to Cloudinary)
  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const base64Data = e.target?.result as string;
          const token = await getToken();

          const response = await fetch(`${API_URL}/upload-image`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              image: base64Data,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to upload image");
          }

          const data = await response.json();
          resolve(data.imageUrl);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateRecipe = async () => {
    if (!selectedImage || !user) return;

    setIsGenerating(true);
    try {
      toast({
        title: "Uploading Image...",
        description: "Please wait while we upload your image.",
      });

      // Step 1: Upload image to Cloudinary
      const imageUrl = await uploadImageToCloudinary(selectedImage);

      toast({
        title: "Analyzing Image...",
        description: "Our AI is analyzing your image to generate a recipe.",
      });

      // Step 2: Send request to backend with image URL
      const token = await getToken();
      const response = await fetch(`${API_URL}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: "image",
          content: {
            userid: user?.id,
            image: imageUrl,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipe from image");
      }

      const generatedRecipe = await response.json();
      setGeneratedRecipe(generatedRecipe);

      toast({
        title: "Recipe Generated!",
        description: "We've analyzed your image and created a recipe for you.",
      });
    } catch (error) {
      console.error("Error generating recipe:", error);
      toast({
        title: "Error",
        description: "Failed to generate recipe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-0">
        <div className="text-center py-16">
          <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Sign In Required</h2>
          <p className="text-muted-foreground mb-4">
            Please sign in to use the Image to Recipe feature.
          </p>
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-0 max-w-4xl">
      <div className="mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <h1 className="text-4xl font-headline font-bold mb-2">
          Image to Recipe
        </h1>
        <p className="text-muted-foreground">
          Upload a photo of any dish and our AI will generate a complete recipe
          for you.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Camera className="mr-2 h-5 w-5" />
              Upload Your Photo
            </CardTitle>
            <CardDescription>
              Choose a clear photo of the dish you'd like to recreate
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              {imagePreview ? (
                <div className="space-y-4">
                  <div className="relative w-full h-48 mx-auto">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setImagePreview(null);
                      setSelectedImage(null);
                      setGeneratedRecipe(null);
                    }}
                  >
                    Choose Different Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <Label htmlFor="image-upload" className="cursor-pointer">
                      <div className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        PNG, JPG up to 10MB
                      </div>
                    </Label>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              )}
            </div>

            {selectedImage && !generatedRecipe && (
              <Button
                onClick={handleGenerateRecipe}
                className="w-full"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Image...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Recipe
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Generated Recipe Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5" />
              Generated Recipe
            </CardTitle>
            <CardDescription>
              AI-analyzed recipe based on your image
            </CardDescription>
          </CardHeader>
          <CardContent>
            {generatedRecipe ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {generatedRecipe.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {generatedRecipe.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Ingredients:</h4>
                  <ul className="space-y-1">
                    {generatedRecipe.ingredients.map(
                      (ingredient: string, index: number) => (
                        <li key={index} className="text-sm flex items-center">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                          {ingredient}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Instructions:</h4>
                  <ol className="space-y-2">
                    {generatedRecipe.instructions.map(
                      (instruction: string, index: number) => (
                        <li key={index} className="text-sm flex">
                          <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-medium mr-2">
                            {index + 1}
                          </span>
                          {instruction}
                        </li>
                      )
                    )}
                  </ol>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Upload an image to generate a recipe</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
