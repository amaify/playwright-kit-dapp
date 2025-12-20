import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_near/near")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello Near!</div>;
}
