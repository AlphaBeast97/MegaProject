"use client";

import "./animations.css";
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
import { Camera, Upload, Loader2, Sparkles, ArrowLeft, Clock, Users, ChefHat, Star } from "lucide-react";
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
      if (file.size > 1024 * 1024) {
        toast({
          title: "Image too large",
          description: "Please upload an image smaller than 1MB.",
          variant: "destructive",
        });
        return;
      }
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
          <p className="text-gray-600 font-medium">Loading your culinary experience...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="text-center py-12 px-8">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Camera className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Sign In Required</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Please sign in to unlock the magic of AI-powered recipe generation from your food photos.
            </p>
            <Link href="/sign-in">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                <Sparkles className="mr-2 h-5 w-5" />
                Sign In to Continue
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-red-200 to-orange-200 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-br from-pink-200 to-red-200 rounded-full opacity-25 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 animate-bounce delay-500"></div>
      </div>

      <div className="container mx-auto p-6 max-w-6xl relative z-10">
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-6 hover:bg-white/50 transition-colors duration-200">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-12 space-y-4">
            <div className="animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-headline font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent mb-4">
                Image to Recipe
              </h1>
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Camera className="h-8 w-8 text-orange-500 animate-pulse" />
                <div className="w-8 border-t-2 border-orange-300"></div>
                <Sparkles className="h-8 w-8 text-red-500 animate-pulse delay-500" />
                <div className="w-8 border-t-2 border-red-300"></div>
                <ChefHat className="h-8 w-8 text-pink-500 animate-pulse delay-1000" />
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Transform any food photo into a complete recipe with our advanced AI.
                Simply upload an image and watch the magic happen! 🎨✨
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-fade-in-left">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center text-xl">
                <Camera className="mr-3 h-6 w-6 animate-pulse" />
                Upload Your Photo
              </CardTitle>
              <CardDescription className="text-orange-100">
                Choose a clear photo of the dish you'd like to recreate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="border-2 border-dashed border-orange-200 rounded-xl p-8 text-center hover:border-orange-400 transition-colors duration-300 bg-gradient-to-br from-orange-50 to-red-50">
                {imagePreview ? (
                  <div className="space-y-4 animate-fade-in">
                    <div className="relative w-full h-64 mx-auto group">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setImagePreview(null);
                        setSelectedImage(null);
                        setGeneratedRecipe(null);
                      }}
                      className="hover:bg-orange-100 transition-colors duration-200"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Choose Different Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 animate-fade-in">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                      <Upload className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <div className="text-lg font-semibold text-gray-700 mb-2">
                          Click to upload or drag and drop
                        </div>
                        <div className="text-sm text-gray-500">
                          PNG, JPG up to 1MB
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
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
                  disabled={isGenerating}
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Processing Magic...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-3 h-5 w-5 animate-pulse" />
                      Generate Recipe with AI
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Generated Recipe Section */}
          <Card className="group hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-xl animate-fade-in-right">
            <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center text-xl">
                <Sparkles className="mr-3 h-6 w-6 animate-pulse" />
                Generated Recipe
              </CardTitle>
              <CardDescription className="text-red-100">
                AI-analyzed recipe based on your image
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {generatedRecipe ? (
                <div className="space-y-8 animate-fade-in-up">
                  {/* Recipe Header */}
                  <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-200">
                    <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3 animate-fade-in">
                      {generatedRecipe.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed animate-fade-in delay-200">
                      {generatedRecipe.description}
                    </p>

                    {/* Recipe Stats */}
                    <div className="flex items-center justify-center space-x-6 mt-4 animate-fade-in delay-400">
                      <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium text-gray-700">30 min</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                        <Users className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-medium text-gray-700">4 servings</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700">Easy</span>
                      </div>
                    </div>
                  </div>

                  {/* Ingredients Section */}
                  <div className="animate-fade-in delay-600">
                    <div className="flex items-center mb-4">
                      <ChefHat className="h-6 w-6 text-orange-500 mr-2" />
                      <h4 className="text-xl font-bold text-gray-800">Ingredients</h4>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                      <ul className="space-y-3">
                        {generatedRecipe.ingredients.map(
                          (ingredient: string, index: number) => (
                            <li key={index} className="group flex items-center animate-slide-in-left" style={{ animationDelay: `${index * 100}ms` }}>
                              <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
                              <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                                {ingredient}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Instructions Section */}
                  <div className="animate-fade-in delay-800">
                    <div className="flex items-center mb-4">
                      <Sparkles className="h-6 w-6 text-red-500 mr-2" />
                      <h4 className="text-xl font-bold text-gray-800">Instructions</h4>
                    </div>
                    <div className="space-y-4">
                      {generatedRecipe.instructions.map(
                        (instruction: string, index: number) => (
                          <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-slide-in-right" style={{ animationDelay: `${index * 150}ms` }}>
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform duration-200">
                                {index + 1}
                              </div>
                              <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                                {instruction}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Save Recipe Button */}
                  <div className="text-center animate-fade-in delay-1000">
                    <Button
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                      size="lg"
                    >
                      <Star className="mr-2 h-5 w-5" />
                      Save This Recipe
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 space-y-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <Camera className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Ready to Create Magic?
                  </h3>
                  <p className="text-gray-500">
                    Upload an image to generate your personalized recipe
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
