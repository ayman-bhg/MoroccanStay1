import { Link } from "react-router";
import { Lock, Home } from "lucide-react";
import { Button } from "../components/ui/button";
import { BrandLockup } from "../components/brand-logo";
import { useAuth } from "../hooks/useAuth";
import { useDarkMode } from "../context/DarkModeContext";
export function RoleSelectionPage() {
    const { setRole } = useAuth();
    const { isDark } = useDarkMode();

    const handleAdminClick = () => {
        setRole("admin");
    };
    const handleCustomerClick = () => {
        setRole("customer");
    };

    return (<div className="min-h-screen relative overflow-hidden" style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5fGVufDB8fHx8MTc3MTIyNzI0MXww&ixlib=rb-4.1.0&q=80&w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-purple-900/20"></div>
        <div className="relative min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <BrandLockup />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Welcome to Moroccan Stay</h1>
          <p className="text-lg text-gray-100">Select your access level to continue</p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <Link to="/admin/login" onClick={handleAdminClick}>
            <div className="group h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border-2 border-transparent hover:border-[#2563EB] cursor-pointer">
              <div className="flex flex-col items-center text-center h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-[#2563EB]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#2563EB]/20 transition-colors">
                    <Lock className="w-8 h-8 text-[#2563EB]"/>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Admin Access</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Manage hotels, guides, bookings, and view reports
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Requires authentication</p>
                  <Button className="w-full rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] text-white">
                    Admin Login
                  </Button>
                </div>
              </div>
            </div>
          </Link>

          
          <Link to="/home" onClick={handleCustomerClick}>
            <div className="group h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border-2 border-transparent hover:border-green-500 cursor-pointer">
              <div className="flex flex-col items-center text-center h-full justify-between">
                <div>
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-900/30 transition-colors">
                    <Home className="w-8 h-8 text-green-600 dark:text-green-400"/>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Book a Hotel</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    Browse hotels, make reservations, and book your stay
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">No login required</p>
                  <Button className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white">
                    Continue as Customer
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        </div>

        
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Demo Credentials</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium">Admin Email:</span>
              </p>
              <code className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-gray-800 dark:text-gray-200">
                admin@moroccanstay.com
              </code>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium">Admin Password:</span>
              </p>
              <code className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded text-gray-800 dark:text-gray-200">
                admin123
              </code>
            </div>
          </div>
        </div>
      </div>
        </div>
    </div>);
}
