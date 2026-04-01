import { Link } from "react-router";
import { Lock, Home } from "lucide-react";
import { Button } from "../components/ui/button";
import { BrandLockup } from "../components/brand-logo";
import { useAuth } from "../hooks/useAuth";

export function RoleSelectionPage() {
  const { setRole } = useAuth();

  const handleAdminClick = () => {
    setRole("admin");
  };

  const handleCustomerClick = () => {
    setRole("customer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <BrandLockup />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome to Moroccan Stay</h1>
          <p className="text-lg text-gray-600">Select your access level to continue</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Admin Card */}
          <Link to="/admin/login" onClick={handleAdminClick}>
            <div className="group h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border-2 border-transparent hover:border-[#2563EB] cursor-pointer">
              <div className="flex flex-col items-center text-center h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-[#2563EB]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#2563EB]/20 transition-colors">
                    <Lock className="w-8 h-8 text-[#2563EB]" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h2>
                  <p className="text-gray-600 text-sm mb-4">
                    Manage hotels, guides, bookings, and view reports
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-xs text-gray-500 mb-3">Requires authentication</p>
                  <Button className="w-full rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
                    Admin Login
                  </Button>
                </div>
              </div>
            </div>
          </Link>

          {/* Customer Card */}
          <Link to="/home" onClick={handleCustomerClick}>
            <div className="group h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border-2 border-transparent hover:border-green-500 cursor-pointer">
              <div className="flex flex-col items-center text-center h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <Home className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Book a Hotel</h2>
                  <p className="text-gray-600 text-sm mb-4">
                    Browse hotels, make reservations, and book your stay
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-xs text-gray-500 mb-3">No login required</p>
                  <Button className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white">
                    Continue as Customer
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Info Section */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">Quick Demo Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Admin Email:</span>
              </p>
              <code className="bg-gray-100 px-3 py-1 rounded text-gray-800">
                admin@moroccanstay.com
              </code>
            </div>
            <div>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Admin Password:</span>
              </p>
              <code className="bg-gray-100 px-3 py-1 rounded text-gray-800">
                admin123
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
