import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";
import appCss from "../main.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                title: "Playwright kit Test Dapp",
            },
        ],
        links: [
            { rel: "stylesheet", href: appCss },
            {
                rel: "icon",
                type: "image/png",
                sizes: "32x32",
                href: "icon-32x32.png",
            },
            {
                rel: "icon",
                type: "image/png",
                sizes: "16x16",
                href: "icon-16x16.png",
            },
            {
                rel: "icon",
                href: "favicon.ico",
            },
        ],
    }),

    shellComponent: RootDocument,
});

function RootDocument() {
    return (
        <>
            <HeadContent />
            <Outlet />
            <Toaster
                expand
                duration={5000}
                visibleToasts={4}
                toastOptions={{
                    className: "w-[450px]",
                }}
            />
            <TanStackDevtools
                config={{
                    position: "bottom-right",
                }}
                plugins={[
                    {
                        name: "Tanstack Router",
                        render: <TanStackRouterDevtoolsPanel />,
                    },
                ]}
            />
            <Scripts />
        </>
    );
}
