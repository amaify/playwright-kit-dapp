import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_injective")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <Outlet />
        </div>
    );
}
