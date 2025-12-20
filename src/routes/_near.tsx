import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_near")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <Outlet />
        </div>
    );
}
