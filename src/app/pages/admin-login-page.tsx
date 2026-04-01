import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Loader } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { BrandLockup } from "../components/brand-logo";
import { useAuth } from "../hooks/useAuth";

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!email || !password) {
      setLocalError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setLocalError("Please enter a valid email");
      return;
    }

    try {
      await login(email, password);
      navigate("/admin", { replace: true });
    } catch {
      setLocalError(error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <BrandLockup />
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600 text-sm">Enter your credentials to access the admin dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-gray-700 font-medium mb-2 block">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@moroccanstay.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="rounded-lg border-gray-300 focus:border-[#2563EB] focus:ring-[#2563EB]"
              />
            </div>

            {/* Password Field */}
            <div>
              <Label htmlFor="password" className="text-gray-700 font-medium mb-2 block">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="rounded-lg border-gray-300 focus:border-[#2563EB] focus:ring-[#2563EB]"
              />
            </div>

            {/* Error Messages */}
            {(localError || error) && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{localError || error}</p>
              </div>
            )}

            {/* Demo Credentials Info */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-700 font-medium">Demo Credentials:</p>
              <p className="text-xs text-blue-600 mt-1">
                Email: <code className="bg-white px-1 py-0.5 rounded">admin@moroccanstay.com</code>
              </p>
              <p className="text-xs text-blue-600">
                Password: <code className="bg-white px-1 py-0.5 rounded">admin123</code>
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white h-11 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  Logging in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6 text-center">
            <p className="text-sm text-gray-600">
              Not an admin?{" "}
              <Link to="/" className="text-[#2563EB] font-medium hover:underline">
                Back to Home
              </Link>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center text-xs text-gray-500 bg-white/50 p-4 rounded-lg">
          <p>🔒 This is a demo login. In production, use secure authentication.</p>
          <p>Credentials are hardcoded for testing purposes only.</p>
        </div>
      </div>
    </div>
  );
}
