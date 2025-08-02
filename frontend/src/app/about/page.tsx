"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChefHat,
    Code,
    Heart,
    Users,
    Github,
    ArrowLeft,
    Rocket,
    Milestone,
    Lightbulb,
    Camera,
    Shuffle,
    Brain,
    Database,
    Globe,
    Sparkles,
    Star,
    ExternalLink,
    FileCode,
    Palette,
    Shield,
    Cloud,
    Zap,
    Monitor,
    Server,
    Eye,
    Settings,
    Cpu
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const aiFeatures = [
    {
        title: "Image to Recipe",
        description: "Upload any food image and our AI will analyze it to generate a complete recipe with ingredients and cooking instructions.",
        icon: Camera,
        gradient: "from-pink-500 to-rose-500",
        bgGradient: "from-pink-50 to-rose-50"
    },
    {
        title: "Random Recipe Generator",
        description: "Get personalized AI-generated recipes based on your preferences, dietary restrictions, and cuisine choices.",
        icon: Shuffle,
        gradient: "from-purple-500 to-indigo-500",
        bgGradient: "from-purple-50 to-indigo-50"
    },
    {
        title: "Smart Ingredient Analysis",
        description: "Input your available ingredients and let AI create the perfect recipe using what you have on hand.",
        icon: Brain,
        gradient: "from-orange-500 to-red-500",
        bgGradient: "from-orange-50 to-red-50"
    }
];

const techStack = [
    {
        category: "Frontend Excellence",
        icon: Globe,
        color: "text-blue-500",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        description: "Modern, responsive user interfaces built for performance",
        technologies: [
            { name: "Next.js 15", detail: "Latest App Router with server components", icon: Rocket },
            { name: "TypeScript", detail: "Type-safe development for reliability", icon: Shield },
            { name: "Tailwind CSS", detail: "Utility-first styling framework", icon: Palette },
            { name: "shadcn/ui", detail: "Beautiful, accessible component library", icon: Monitor },
            { name: "Framer Motion", detail: "Smooth animations and transitions", icon: Zap }
        ]
    },
    {
        category: "Backend Power",
        icon: Database,
        color: "text-green-500",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        description: "Scalable server architecture with modern database solutions",
        technologies: [
            { name: "Node.js & Express", detail: "High-performance JavaScript runtime", icon: Server },
            { name: "MongoDB Atlas", detail: "Cloud-native NoSQL database", icon: Database },
            { name: "Mongoose ODM", detail: "Elegant object modeling for MongoDB", icon: Code },
            { name: "JWT & Clerk", detail: "Secure authentication & authorization", icon: Shield },
            { name: "n8n Workflows", detail: "Visual automation platform", icon: Settings }
        ]
    },
    {
        category: "AI & Cloud Services",
        icon: Sparkles,
        color: "text-purple-500",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        description: "Cutting-edge AI integration with cloud infrastructure",
        technologies: [
            { name: "Google Gemini 2.0", detail: "Advanced multimodal AI capabilities", icon: Brain },
            { name: "Computer Vision", detail: "Image analysis and recognition", icon: Eye },
            { name: "Cloudinary CDN", detail: "Optimized image storage & delivery", icon: Cloud },
            { name: "OpenAI Integration", detail: "Natural language processing", icon: Cpu },
            { name: "Smart Caching", detail: "Redis for lightning-fast responses", icon: Zap }
        ]
    }
];

const teamMembers = [
    {
        name: "AlphaBeast",
        role: "Lead Backend Developer & AI Integration",
        description: "Specialized in backend architecture, AI implementation, and system integration",
        github: "https://github.com/AlphaBeast97",
        avatar: "AB",
        color: "from-blue-500 to-purple-500"
    },
    {
        name: "MaximumCell",
        role: "Frontend Developer & UI/UX Designer",
        description: "Expert in modern frontend technologies and user experience design",
        github: "https://github.com/MaximumCell",
        avatar: "MC",
        color: "from-green-500 to-teal-500"
    }
];

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
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 relative overflow-hidden z-0">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute top-1/2 -left-40 w-60 h-60 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 animate-pulse delay-300"></div>
                <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-gradient-to-br from-green-200 to-teal-200 rounded-full opacity-20 animate-pulse delay-700"></div>
            </div>

            {/* Navigation */}
            <div className="absolute top-6 sm:top-8 left-4 sm:left-8 z-10">
                <Link href="/">
                    <Button variant="ghost" className="hover:bg-white/80 backdrop-blur-sm shadow-lg text-sm sm:text-base">
                        <ArrowLeft className="mr-1 sm:mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Back to Home</span>
                        <span className="sm:hidden">Back</span>
                    </Button>
                </Link>
            </div>

            <div className="container mx-auto px-4 pt-16 sm:pt-20 pb-12 sm:pb-16 relative z-10">
                {/* Hero Section */}
                <div className="text-center mb-16 sm:mb-20">
                    <div className="relative mb-6 sm:mb-8">
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                                <ChefHat className="h-16 w-16 sm:h-20 md:h-24 sm:w-20 md:w-24 text-orange-500 relative z-10 animate-bounce" />
                                <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 z-20">
                                    <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 animate-spin" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black bg-gradient-to-r from-orange-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6 px-2">
                        Culinary Canvas
                    </h1>

                    <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
                        The future of cooking is here. Harness the power of AI to transform how you discover, create, and manage recipes.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4">
                        <span className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 rounded-full text-xs sm:text-sm font-bold shadow-lg transform hover:scale-105 transition-transform">
                            🤖 AI-Powered
                        </span>
                        <span className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 rounded-full text-xs sm:text-sm font-bold shadow-lg transform hover:scale-105 transition-transform">
                            🎨 Modern Design
                        </span>
                        <span className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-xs sm:text-sm font-bold shadow-lg transform hover:scale-105 transition-transform">
                            🚀 Lightning Fast
                        </span>
                    </div>
                </div>

                {/* Mission Statement */}
                <div className="max-w-5xl mx-auto mb-16 sm:mb-20 px-4">
                    <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
                        <CardContent className="p-6 sm:p-8 md:p-12">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6 sm:mb-8">
                                Our Mission
                            </h2>
                            <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-center">
                                Culinary Canvas is a modern, intelligent recipe management application that transforms how you discover, create, and manage recipes. Built with cutting-edge AI technology, it offers innovative features like image-to-recipe generation, random recipe suggestions, and ingredients-based recipe creation.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* AI Features Section */}
                <div className="mb-16 sm:mb-20">
                    <div className="text-center mb-12 sm:mb-16 px-4">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                            AI-Powered Magic
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            Experience the cutting-edge artificial intelligence that makes cooking effortless and exciting
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto px-4">
                        {aiFeatures.map((feature, index) => (
                            <Card
                                key={index}
                                className={`group relative overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-3 sm:hover:-translate-y-6 hover:rotate-1 bg-gradient-to-br ${feature.bgGradient}`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`}></div>

                                <CardHeader className="text-center pb-4 sm:pb-6">
                                    <div className="relative mb-4 sm:mb-6">
                                        <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl sm:rounded-3xl bg-gradient-to-r ${feature.gradient} p-4 sm:p-5 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl`}>
                                            <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                                        </div>
                                    </div>
                                    <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors px-2">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="px-4 sm:px-6">
                                    <p className="text-gray-600 leading-relaxed text-center text-base sm:text-lg">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Technology Stack */}
                <div className="mb-16 sm:mb-20">
                    <div className="text-center mb-12 sm:mb-16 px-4">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                            Built with Modern Tech
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            Cutting-edge technologies powering exceptional user experiences
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto px-4">
                        {techStack.map((stack, index) => (
                            <Card
                                key={index}
                                className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-4 hover:rotate-1 ${stack.bgColor} ${stack.borderColor} border-2 shadow-xl`}
                            >
                                <CardHeader className="text-center">
                                    <div className="flex justify-center mb-4 sm:mb-6">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white shadow-2xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                                            <stack.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stack.color}`} />
                                        </div>
                                    </div>
                                    <CardTitle className={`text-xl sm:text-2xl font-bold ${stack.color.replace('text-', 'text-')} group-hover:scale-105 transition-transform duration-300 px-2`}>
                                        {stack.category}
                                    </CardTitle>
                                    <p className="text-gray-600 mt-2 text-xs sm:text-sm leading-relaxed px-2">
                                        {stack.description}
                                    </p>
                                </CardHeader>

                                <CardContent className="px-4 sm:px-6">
                                    <ul className="space-y-3 sm:space-y-4">
                                        {stack.technologies.map((tech, techIndex) => (
                                            <li key={techIndex} className="group/tech">
                                                <div className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                                                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg ${stack.bgColor} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/tech:scale-110 transition-transform duration-200`}>
                                                        <tech.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${stack.color}`} />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-800 text-xs sm:text-sm">
                                                            {tech.name}
                                                        </div>
                                                        <div className="text-gray-600 text-xs leading-relaxed">
                                                            {tech.detail}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="mb-16 sm:mb-20">
                    <div className="text-center mb-12 sm:mb-16 px-4">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                            Meet the Dream Team
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            The brilliant minds and passionate developers behind Culinary Canvas
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-center items-center gap-8 sm:gap-12 max-w-6xl mx-auto px-4">
                        {teamMembers.map((member, index) => (
                            <Card
                                key={index}
                                className="group w-full max-w-sm lg:w-96 hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-4 sm:hover:-translate-y-8 hover:rotate-2 bg-white border-0 shadow-2xl overflow-hidden"
                            >
                                <CardHeader className="text-center pb-4 sm:pb-6 bg-gradient-to-br from-gray-50 to-white relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="relative mb-4 sm:mb-6">
                                        <div className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-gradient-to-r ${member.color} flex items-center justify-center text-white text-2xl sm:text-3xl font-black group-hover:scale-125 transition-transform duration-500 shadow-2xl`}>
                                            {member.avatar}
                                        </div>
                                    </div>

                                    <Link
                                        href={member.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group/link relative"
                                    >
                                        <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 group-hover/link:text-blue-600 transition-colors duration-300 mb-2 sm:mb-3 px-2">
                                            {member.name}
                                        </CardTitle>
                                    </Link>

                                    <p className="text-xs sm:text-sm font-bold text-orange-600 mb-2 px-2">
                                        {member.role}
                                    </p>
                                </CardHeader>

                                <CardContent className="relative px-4 sm:px-6">
                                    <p className="text-gray-600 text-center leading-relaxed mb-4 sm:mb-6 text-sm sm:text-lg">
                                        {member.description}
                                    </p>

                                    <Link
                                        href={member.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button
                                            className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 sm:py-3 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                                        >
                                            <Github className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                                            <span className="hidden sm:inline">View GitHub Profile</span>
                                            <span className="sm:hidden">GitHub</span>
                                            <ExternalLink className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mb-12 sm:mb-16">
                    <div className="bg-gradient-to-r from-orange-500 to-purple-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 max-w-5xl mx-auto text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-1000"></div>

                        <div className="relative z-10">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 sm:mb-6">
                                Ready to Transform Your Cooking?
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 opacity-90 leading-relaxed">
                                Join thousands of home chefs using AI to discover amazing recipes and revolutionize their kitchen experience
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                                <Link href="https://github.com/AlphaBeast97/MegaProject" target="_blank" rel="noopener noreferrer">
                                    <Button
                                        size="lg"
                                        className="w-full sm:w-auto bg-white text-purple-600 hover:bg-gray-100 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300 text-sm sm:text-base"
                                    >
                                        <Github className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                                        <span className="hidden sm:inline">View Source Code</span>
                                        <span className="sm:hidden">Source Code</span>
                                        <ExternalLink className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5" />
                                    </Button>
                                </Link>

                                <Link href="/">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl transform hover:scale-110 transition-all duration-300 bg-purple-600/20 backdrop-blur-sm text-sm sm:text-base"
                                    >
                                        <Rocket className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                                        <span className="hidden sm:inline">Try Culinary Canvas</span>
                                        <span className="sm:hidden">Try Now</span>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center">
                    <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-xl max-w-2xl mx-auto">
                        <CardContent className="p-6 sm:p-8">
                            <p className="flex items-center justify-center text-base sm:text-lg text-gray-600 flex-wrap">
                                <span className="mr-2">Made with</span>
                                <Heart className="h-5 w-5 sm:h-6 sm:w-6 mx-1 sm:mx-2 text-red-500 animate-pulse" />
                                <span className="ml-1 sm:ml-2">and cutting-edge AI by the Culinary Canvas Team</span>
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
