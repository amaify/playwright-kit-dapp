import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_solana")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <Outlet />
        </div>
    );
}
