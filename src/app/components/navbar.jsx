import { Link, useLocation, useNavigate } from "react-router";
import { User } from "lucide-react";
import { BrandLockup } from "./brand-logo";
import { BRAND_NAME } from "../brand";
import { Button } from "./ui/button";
import { RoleSwitcher } from "./role-switcher";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
export function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { role, logout } = useAuth();
    const [loginOpen, setLoginOpen] = useState(false);
    const [signupOpen, setSignupOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        setUserName("");
        navigate("/select-role", { replace: true });
    };
    const isActive = (path) => {
        return location.pathname === path;
    };
    const handleLogin = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        setUserName(email?.toString().split("@")[0] || "User");
        setIsLoggedIn(true);
        setLoginOpen(false);
    };
    const handleSignup = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        setUserName(name?.toString() || "User");
        setIsLoggedIn(true);
        setSignupOpen(false);
    };
    if (location.pathname === "/select-role" || location.pathname === "/admin/login") {
        return null;
    }
    return (<nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          <BrandLockup className="hover:opacity-90 transition-opacity"/>

          
          <div className="flex items-center gap-8">
            <Link to="/home" viewTransition className={`font-medium transition-colors ${isActive('/home') ? 'text-[#2563EB]' : 'text-gray-600 hover:text-gray-900'}`}>
              Home
            </Link>
            {role === "customer" && (<Link to="/guide" viewTransition className={`font-medium transition-colors ${isActive('/guide') ? 'text-[#2563EB]' : 'text-gray-600 hover:text-gray-900'}`}>
                Tourist Guides
              </Link>)}
          </div>

          
          <div className="flex items-center gap-3">
            {role ? (<>
                <RoleSwitcher />
                <Button onClick={handleLogout} variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Logout
                </Button>
              </>) : (<>
                {!isLoggedIn ? (<>
                    
                    <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                          Login
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Welcome Back</DialogTitle>
                          <DialogDescription>
                            {`Connectez-vous à ${BRAND_NAME}`}
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleLogin} className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="login-email">Email</Label>
                            <Input id="login-email" name="email" type="email" placeholder="your@email.com" required className="w-full"/>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="login-password">Password</Label>
                            <Input id="login-password" name="password" type="password" placeholder="••••••••" required className="w-full"/>
                          </div>
                          <Button type="submit" className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl">
                            Login
                          </Button>
                          <p className="text-sm text-center text-gray-600">
                            Don't have an account?{" "}
                            <button type="button" onClick={() => {
                    setLoginOpen(false);
                    setSignupOpen(true);
                }} className="text-[#2563EB] hover:underline">
                              Sign up
                            </button>
                          </p>
                        </form>
                      </DialogContent>
                    </Dialog>

                    
                    <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl px-6">
                          Sign Up
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Create Account</DialogTitle>
                          <DialogDescription>
                            {`Rejoignez ${BRAND_NAME} et réservez vos séjours au Maroc`}
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSignup} className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="signup-name">Full Name</Label>
                            <Input id="signup-name" name="name" type="text" placeholder="John Doe" required className="w-full"/>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signup-email">Email</Label>
                            <Input id="signup-email" name="email" type="email" placeholder="your@email.com" required className="w-full"/>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="signup-password">Password</Label>
                            <Input id="signup-password" name="password" type="password" placeholder="••••••••" required className="w-full"/>
                          </div>
                          <Button type="submit" className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-xl">
                            Create Account
                          </Button>
                          <p className="text-sm text-center text-gray-600">
                            Already have an account?{" "}
                            <button type="button" onClick={() => {
                    setSignupOpen(false);
                    setLoginOpen(true);
                }} className="text-[#2563EB] hover:underline">
                              Login
                            </button>
                          </p>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </>) : (<>
                    <span className="text-gray-700 font-medium">Hi, {userName}</span>
                    <Button onClick={handleLogout} variant="ghost" className="text-gray-600 hover:text-gray-900">
                      Logout
                    </Button>
                  </>)}

                <Link to="/select-role" viewTransition>
                  <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                    <User className="w-5 h-5"/>
                  </Button>
                </Link>
              </>)}
          </div>
        </div>
      </div>
    </nav>);
}

