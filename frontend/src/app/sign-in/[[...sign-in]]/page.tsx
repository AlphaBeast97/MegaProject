import { SignIn } from "@clerk/nextjs";
import { ChefHat } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <ChefHat className="h-12 w-12 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your culinary canvas</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-5 flex justify-center">
          <SignIn path="/sign-in" />
        </div>
      </div>
    </div>
  );
}
