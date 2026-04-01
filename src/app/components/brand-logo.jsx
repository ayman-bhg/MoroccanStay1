import { Link } from "react-router";
import { cn } from "./ui/utils";
import { BRAND_NAME } from "../brand";
export function BrandLockup({ className, variant = "default" }) {
    const isLight = variant === "light";
    return (<Link to="/" viewTransition className={cn("inline-block font-brand hover:opacity-85 transition-opacity", className)}>
      <span className={cn("text-xl sm:text-2xl font-semibold tracking-tight", isLight ? "text-white" : "text-gray-900")}>
        {BRAND_NAME}
      </span>
    </Link>);
}

