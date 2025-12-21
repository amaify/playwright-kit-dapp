import { Link } from "@tanstack/react-router";
import { navigation } from "@/lib/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

export default function NavigationCards() {
    return navigation.map((item) => (
        <Link to={item.href} key={item.name}>
            <Card className="px-4 py-6">
                <CardHeader>
                    <CardTitle className="text-lg font-light uppercase">{item.name}</CardTitle>
                    <CardDescription className="text-foreground-muted text-base">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col">
                    <span className="text-sm text-foreground-muted uppercase">Native Token</span>
                    <span className="text-lg">{item.nativeToken}</span>
                </CardContent>
            </Card>
        </Link>
    ));
}
