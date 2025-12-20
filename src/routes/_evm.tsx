import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_evm")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <Outlet />
        </div>
    );
}
