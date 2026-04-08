import { Link } from "react-router";
import { Lock, Home, Sparkles, ArrowRight } from "lucide-react";
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

    return (
        <div 
            className="min-h-screen relative overflow-hidden" 
            style={{
                backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 27, 75, 0.85) 50%, rgba(15, 23, 42, 0.85) 100%), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5fGVufDB8fHx8MTc3MTIyNzI0MXww&ixlib=rb-4.1.0&q=80&w=1920')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Clean overlay */}
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

            <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-3xl">
                    {/* Header Section */}
                    <div className="text-center mb-16 animate-fade-in">
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-30"></div>
                                <BrandLockup />
                            </div>
                        </div>
                        <h1 className="text-6xl sm:text-7xl font-black text-white mb-4 tracking-tight leading-tight">
                            Welcome to Moroccan Stay
                        </h1>
                        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Choose your role to get started on your Moroccan adventure
                        </p>
                    </div>

                    {/* Role Selection Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {/* Admin Card */}
                        <Link to="/admin/login" onClick={handleAdminClick} className="group">
                            <div className="relative h-full">
                                {/* Card background */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 group-hover:blur-xl"></div>
                                
                                {/* Card content */}
                                <div className="relative h-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-10 border border-blue-500/20 group-hover:border-blue-400/50 transition-all duration-500 shadow-2xl hover:shadow-2xl hover:-translate-y-2">
                                    <div className="flex flex-col h-full justify-between">
                                        {/* Top content */}
                                        <div className="text-center flex-1">
                                            {/* Icon container */}
                                            <div className="relative mb-6 flex justify-center">
                                                <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-2xl group-hover:bg-blue-500/30 transition-all duration-500"></div>
                                                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-400/20 to-blue-500/10 rounded-2xl flex items-center justify-center group-hover:from-blue-400/30 group-hover:to-blue-500/20 transition-all duration-500 border border-blue-400/30 group-hover:border-blue-400/60">
                                                    <Lock className="w-10 h-10 text-blue-300 group-hover:text-blue-200 transition-colors duration-500" strokeWidth={1.5} />
                                                </div>
                                            </div>

                                            <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors duration-500">
                                                Admin Access
                                            </h2>
                                            <p className="text-gray-300 text-sm leading-relaxed mb-6 group-hover:text-gray-100 transition-colors duration-500">
                                                Comprehensive management dashboard for hotels, reservations, and analytics
                                            </p>

                                            {/* Features list */}
                                            <div className="space-y-2 text-left max-w-xs mx-auto">
                                                <div className="flex items-center text-gray-300 text-xs">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></div>
                                                    Manage hotel listings & inventory
                                                </div>
                                                <div className="flex items-center text-gray-300 text-xs">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></div>
                                                    View bookings & reservations
                                                </div>
                                                <div className="flex items-center text-gray-300 text-xs">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></div>
                                                    Access analytics & reports
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom button */}
                                        <div className="mt-8">
                                            <p className="text-xs text-blue-300/70 mb-4 font-medium">Requires authentication</p>
                                            <Button className="w-full group/btn bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl py-3 transition-all duration-500 shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-2">
                                                Admin Login
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Customer Card */}
                        <Link to="/home" onClick={handleCustomerClick} className="group">
                            <div className="relative h-full">
                                {/* Card background */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 group-hover:blur-xl"></div>
                                
                                {/* Card content */}
                                <div className="relative h-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-10 border border-emerald-500/20 group-hover:border-emerald-400/50 transition-all duration-500 shadow-2xl hover:shadow-2xl hover:-translate-y-2">
                                    <div className="flex flex-col h-full justify-between">
                                        {/* Top content */}
                                        <div className="text-center flex-1">
                                            {/* Icon container */}
                                            <div className="relative mb-6 flex justify-center">
                                                <div className="absolute inset-0 bg-emerald-500/20 rounded-2xl blur-2xl group-hover:bg-emerald-500/30 transition-all duration-500"></div>
                                                <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:from-emerald-400/30 group-hover:to-emerald-500/20 transition-all duration-500 border border-emerald-400/30 group-hover:border-emerald-400/60">
                                                    <Home className="w-10 h-10 text-emerald-300 group-hover:text-emerald-200 transition-colors duration-500" strokeWidth={1.5} />
                                                </div>
                                            </div>

                                            <h2 className="text-3xl font-bold text-white mb-3 group-hover:text-emerald-100 transition-colors duration-500">
                                                Book Your Stay
                                            </h2>
                                            <p className="text-gray-300 text-sm leading-relaxed mb-6 group-hover:text-gray-100 transition-colors duration-500">
                                                Browse luxury hotels and book your perfect Moroccan getaway
                                            </p>

                                            {/* Features list */}
                                            <div className="space-y-2 text-left max-w-xs mx-auto">
                                                <div className="flex items-center text-gray-300 text-xs">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></div>
                                                    Explore premium accommodations
                                                </div>
                                                <div className="flex items-center text-gray-300 text-xs">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></div>
                                                    Easy booking & reservations
                                                </div>
                                                <div className="flex items-center text-gray-300 text-xs">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></div>
                                                    Instant confirmation
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom button */}
                                        <div className="mt-8">
                                            <p className="text-xs text-emerald-300/70 mb-4 font-medium">No login required</p>
                                            <Button className="w-full group/btn bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl py-3 transition-all duration-500 shadow-lg hover:shadow-emerald-500/50 flex items-center justify-center gap-2">
                                                Continue as Customer
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Demo Credentials Footer */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
                        <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-lg rounded-2xl p-7 border border-slate-700/50 group-hover:border-slate-600/80 transition-all duration-500">
                            <div className="flex items-center gap-2 mb-5">
                                <Sparkles className="w-5 h-5 text-blue-400" />
                                <h3 className="font-bold text-white text-lg">Try the Demo</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                                    <p className="text-gray-300 text-xs mb-2 font-medium uppercase tracking-wide">Admin Email</p>
                                    <code className="bg-slate-900/50 px-4 py-2 rounded-lg text-blue-300 font-mono text-sm block border border-slate-600/30">
                                        admin@moroccanstay.com
                                    </code>
                                </div>
                                <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                                    <p className="text-gray-300 text-xs mb-2 font-medium uppercase tracking-wide">Password</p>
                                    <code className="bg-slate-900/50 px-4 py-2 rounded-lg text-emerald-300 font-mono text-sm block border border-slate-600/30">
                                        admin123
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fadeIn 0.6s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
