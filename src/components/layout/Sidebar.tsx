import { LayoutDashboard, Shield, Gift, Settings, LogOut, Coins } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SidebarProps {
  coins: number;
}

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/whitelist", icon: Shield, label: "Whitelist" },
  { to: "/get-access", icon: Gift, label: "Get Access" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

const Sidebar = ({ coins }: SidebarProps) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo and Brand */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">UID Bypass</h1>
            <p className="text-xs text-muted-foreground">System Dashboard</p>
          </div>
        </div>
      </div>

      {/* Coins Display */}
      <div className="px-4 py-4">
        <div className="bg-primary/10 rounded-lg p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Coins className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Available Coins</p>
            <p className="font-semibold text-foreground">{coins.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn("sidebar-item", isActive && "active")
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
