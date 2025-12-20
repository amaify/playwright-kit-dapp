import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_aptos/aptos")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello Welcome to Aptos!</div>;
}
