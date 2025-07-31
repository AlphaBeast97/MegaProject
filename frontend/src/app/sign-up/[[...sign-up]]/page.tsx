import { SignUp } from "@clerk/nextjs";
import { ChefHat } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <ChefHat className="h-12 w-12 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Join Culinary Canvas</h1>
          <p className="text-gray-600 mt-2">Create your account and start cooking</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-1">
          <SignUp path="/sign-up" />
        </div>
      </div>
    </div>
  );
}
