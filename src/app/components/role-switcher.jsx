import { useNavigate } from "react-router";
import { LogOut, Shield, Home } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, } from "./ui/dropdown-menu";
import { useAuth } from "../hooks/useAuth";
export function RoleSwitcher() {
    const { role, switchRole, logout } = useAuth();
    const navigate = useNavigate();
    const handleSwitchRole = () => {
        logout();
        navigate("/select-role", { replace: true });
    };
    const handleLogout = () => {
        logout();
        navigate("/select-role", { replace: true });
    };
    if (!role)
        return null;
    return (<DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-xl gap-2" size="sm">
          {role === "admin" ? (<>
              <Shield className="w-4 h-4"/>
              <span>Admin</span>
            </>) : (<>
              <Home className="w-4 h-4"/>
              <span>Customer</span>
            </>)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-xl">
        <DropdownMenuItem className="text-xs text-gray-500">
          Current: {role === "admin" ? "Admin Access" : "Customer Mode"}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSwitchRole} className="cursor-pointer">
          <span className="text-sm">
            Change Role
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
          <LogOut className="w-4 h-4 mr-2"/>
          <span className="text-sm">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>);
}

