import { Link } from "react-router";
import { House } from "lucide-react";
import { Button } from "../components/ui/button";
export function NotFoundPage() {
    return (<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl font-bold text-[#2563EB] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Oops! We couldn't find the page you're looking for. It might have been moved or doesn't exist.
      </p>
      <Button asChild className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl px-6 h-12">
        <Link to="/" viewTransition className="flex items-center">
          <House className="w-5 h-5 mr-2"/>
          Back to Home
        </Link>
      </Button>
    </div>);
}

