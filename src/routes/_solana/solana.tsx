import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_solana/solana")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello Solana!</div>;
}
