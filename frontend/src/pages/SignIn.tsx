import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <SignIn
                    routing="path"
                    path="/sign-in"
                    signUpUrl="/sign-up"
                    afterSignInUrl="/dashboard"
                    appearance={{
                        elements: {
                            formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
                            card: 'shadow-lg border border-border',
                            headerTitle: 'text-foreground',
                            headerSubtitle: 'text-muted-foreground',
                            socialButtonsBlockButton: 'border-border hover:bg-accent',
                            formFieldInput: 'border-border bg-background',
                            footerActionLink: 'text-primary hover:text-primary/90',
                        },
                        variables: {
                            colorPrimary: 'hsl(var(--primary))',
                            colorBackground: 'hsl(var(--background))',
                            colorInputBackground: 'hsl(var(--background))',
                            colorInputText: 'hsl(var(--foreground))',
                        }
                    }}
                />
            </div>
        </div>
    );
}
