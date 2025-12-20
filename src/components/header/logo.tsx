import { Link } from "@tanstack/react-router";

export default function Logo() {
    return (
        <Link to="/" className="flex items-center">
            <span className="size-16 block">
                <img src="/logo.svg" alt="Playwright Logo" className="size-full" />
            </span>
            <span className="text-2xl capitalize font-mono font-thin">Test Kit</span>
        </Link>
    );
}
