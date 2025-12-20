import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_injective/injective")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello Injective!</div>;
}
