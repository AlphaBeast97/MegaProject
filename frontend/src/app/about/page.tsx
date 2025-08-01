import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Code, Heart, Users, Github, ArrowLeft, Rocket, Milestone, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const timeline = [
  {
    title: "AI-Powered Recipe Generation",
    description: "Upload any food image to get a complete recipe, discover random AI-generated dishes, and create recipes from available ingredients.",
    icon: Lightbulb,
    color: "text-yellow-500",
  },
  {
    title: "Advanced Recipe Management",
    description: "A complete recipe database with advanced search, filtering, and a comprehensive recipe view with ingredients and instructions.",
    icon: Code,
    color: "text-blue-500",
  },
  {
    title: "Secure Authentication & User Profiles",
    description: "Powered by Clerk with OAuth support, personalized dashboards, and automatic image storage via Cloudinary.",
    icon: Rocket,
    color: "text-green-500",
  },
  {
    title: "Continuous Improvement",
    description: "Ongoing development, bug fixes, and new features based on user feedback. Preparing for a full public launch!",
    icon: Milestone,
    color: "text-purple-500",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="absolute top-8 left-8">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <ChefHat className="h-16 w-16 text-blue-500 animate-bounce" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            About Culinary Canvas
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            An AI-Powered Recipe Management Platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 animate-fade-in-up animation-delay-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            Culinary Canvas is a modern, intelligent recipe management application that transforms how you discover, create, and manage recipes. Built with cutting-edge AI technology, it offers innovative features like image-to-recipe generation, random recipe suggestions, and ingredients-based recipe creation.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12 animate-fade-in-up animation-delay-400">
            Technology Stack
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-blue-200 animate-fade-in-up animation-delay-600">
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

            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-green-200 animate-fade-in-up animation-delay-800">
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

            <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-purple-200 animate-fade-in-up animation-delay-1000">
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

        <div className="max-w-4xl mx-auto text-center mt-20 animate-fade-in-up animation-delay-1200">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Project Timeline</h2>
          <div className="relative">
            <div className="absolute left-1/2 h-full w-1 bg-gray-300"></div>
            {timeline.map((item, index) => (
              <div key={index} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className="order-1 w-5/12"></div>
                <div className={`z-20 flex items-center order-1 bg-gray-800 shadow-xl w-12 h-12 rounded-full`}>
                  <item.icon className={`mx-auto font-semibold text-lg ${item.color} w-6 h-6`} />
                </div>
                <div className={`order-1 bg-white rounded-lg shadow-xl w-5/12 px-6 py-4`} style={{ animationDelay: `${1400 + index * 200}ms` }}>
                  <h3 className="font-bold text-gray-800 text-xl">{item.title}</h3>
                  <p className="text-sm leading-snug tracking-wide text-gray-600 text-opacity-100">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center mt-20 animate-fade-in-up animation-delay-1200">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">The Team</h2>
          <div className="flex justify-center gap-8">
            <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
              <Users className="h-12 w-12 text-blue-500 mb-2" />
              <Link href="https://github.com/AlphaBeast97" target="_blank" rel="noopener noreferrer">
                <h3 className="text-xl font-semibold hover:text-blue-600 transition-colors">AlphaBeast</h3>
              </Link>
              <p className="text-gray-600">Full Stack Developer</p>
            </div>
            <div className="flex flex-col items-center transform hover:scale-105 transition-transform duration-300">
              <Users className="h-12 w-12 text-green-500 mb-2" />
              <Link href="https://github.com/MaximumCell" target="_blank" rel="noopener noreferrer">
                <h3 className="text-xl font-semibold hover:text-green-600 transition-colors">MaximumCell</h3>
              </Link>
              <p className="text-gray-600">Frontend Developer</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-20 animate-fade-in-up animation-delay-1400">
          <Link href="https://github.com/AlphaBeast97/MegaProject" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 transform hover:scale-105 transition-transform duration-300">
            <Github className="mr-2 h-6 w-6" />
            View Source Code
          </Link>
        </div>

        <div className="text-center mt-16 text-gray-600 animate-fade-in-up animation-delay-1600">
          <p className="flex items-center justify-center">
            Made with <Heart className="h-5 w-5 mx-1 text-red-500 animate-pulse" /> by the Culinary Canvas Team
          </p>
        </div>
      </div>
    </div>
  );
}
