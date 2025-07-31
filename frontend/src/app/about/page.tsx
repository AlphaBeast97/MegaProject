import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Code, GitFork, Heart, Star, Users, Github } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <ChefHat className="h-16 w-16 text-blue-500" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            About Culinary Canvas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            An AI-Powered Recipe Management Platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            Culinary Canvas is a modern, intelligent recipe management application that transforms how you discover, create, and manage recipes. Built with cutting-edge AI technology, it offers innovative features like image-to-recipe generation, random recipe suggestions, and ingredients-based recipe creation.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Technology Stack
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Code className="h-6 w-6 mr-2 text-blue-500" />
                  Frontend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Next.js 15 (App Router)</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>shadcn/ui</li>
                  <li>Clerk for Authentication</li>

                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <Code className="h-6 w-6 mr-2 text-green-500" />
                  Backend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Node.js & Express.js</li>
                  <li>MongoDB with Mongoose</li>
                  <li>Clerk for Authentication</li>
                  <li>Google Gemini AI</li>
                  <li>Cloudinary for Image Storage</li>
                  <li>n8n for Workflows</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-800">
                  <Code className="h-6 w-6 mr-2 text-purple-500" />
                  AI & Machine Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Google Gemini 2.0 Flash</li>
                  <li>Computer Vision</li>
                  <li>Natural Language Processing</li>
                  <li>AI-powered Image Generation</li>
                  <li>n8n for AI Pipelines</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center mt-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">The Team</h2>
          <div className="flex justify-center gap-8">
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-blue-500 mb-2" />
              <h3 className="text-xl font-semibold">AlphaBeast</h3>
              <p className="text-gray-600">Full Stack Developer</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-green-500 mb-2" />
              <h3 className="text-xl font-semibold">MaximumCell</h3>
              <p className="text-gray-600">Frontend Developer</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-20">
          <Link href="https://github.com/AlphaBeast97/MegaProject" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900">
            <Github className="mr-2 h-6 w-6" />
            View Source Code
          </Link>
        </div>

        <div className="text-center mt-16 text-gray-600">
          <p className="flex items-center justify-center">
            Made with <Heart className="h-5 w-5 mx-1 text-red-500" /> by the Culinary Canvas Team
          </p>
        </div>
      </div>
    </div>
  );
}


