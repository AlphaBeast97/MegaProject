import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    icon: LucideIcon;
    description: string;
}

export default function StatCard({ title, value, icon: Icon, description }: StatCardProps) {
    return (
        <Card className="transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium font-body">{title}</CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold font-headline text-primary">{value}</div>
                <p className="text-xs text-muted-foreground pt-1">{description}</p>
            </CardContent>
        </Card>
    )
}
