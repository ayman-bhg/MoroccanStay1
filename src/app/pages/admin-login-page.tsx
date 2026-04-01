import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Lock, LogIn, Home } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { BrandLockup } from "../components/brand-logo";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Admin login successful!");
      navigate("/admin", { replace: true });
    } catch (err) {
      toast.error(error || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <BrandLockup />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Access</h1>
          <p className="text-gray-600">Sign in to your administrator account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-900">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@moroccanstay.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="mt-2 rounded-lg border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-900">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="mt-2 rounded-lg border-gray-300"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white py-3 font-medium"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="w-5 h-5" />
                  Sign In
                </span>
              )}
            </Button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-3 font-medium">DEMO CREDENTIALS</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Email:</span>
                <code className="bg-gray-100 px-2 py-1 rounded text-gray-800 font-mono">
                  admin@moroccanstay.com
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Password:</span>
                <code className="bg-gray-100 px-2 py-1 rounded text-gray-800 font-mono">
                  admin123
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link
            to="/select-role"
            className="inline-flex items-center gap-2 text-sm text-[#2563EB] hover:text-[#1d4ed8] font-medium"
          >
            <Home className="w-4 h-4" />
            Back to Role Selection
          </Link>
        </div>
      </div>
    </div>
  );
}
