import { createFileRoute } from "@tanstack/react-router";
import { SparklesIcon } from "lucide-react";
import NavigationCards from "@/components/ui/navigation-cards";

export const Route = createFileRoute("/")({ component: App });

function App() {
    return (
        <main>
            <section className="mt-16">
                <div className="flex justify-center items-center gap-2 px-4 py-2 bg-glass-background border-glass-border w-max mx-auto rounded-full border mb-6">
                    <SparklesIcon size={16} />
                    <span className="text-base text-foreground-muted">Playwright Test Dapp</span>
                </div>
                <h1 className="text-5xl mt-4 font-medium text-center md:text-7xl font-display mb-6 lg:text-8xl">
                    <span className="gradient-text">Web3</span>
                    <span className="block">Test DApp</span>
                </h1>
            </section>
            <section className="mt-16 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 px-8">
                <NavigationCards />
            </section>
        </main>
    );
}
