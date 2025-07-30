import { Link } from 'react-router-dom';
import { ChefHat, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <ChefHat className="h-24 w-24 text-primary mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Recipe Not Found
          </h2>
          <p className="text-muted-foreground mb-8">
            Looks like this recipe went missing from our cookbook! 
            Let's get you back to cooking.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Kitchen
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;