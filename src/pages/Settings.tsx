import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Sun, Moon, Shield, Key, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Settings = () => {
  const [coins] = useState(2500);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const usageLimits = {
    uidsUsed: 2,
    maxUids: 5,
    percentUsed: 40,
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <DashboardLayout coins={coins}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences</p>
        </div>

        {/* Theme Toggle */}
        <div className="card-stats">
          <h3 className="font-semibold text-foreground mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                isDarkMode ? "bg-primary/10" : "bg-warning/10"
              )}>
                {isDarkMode ? (
                  <Moon className="w-5 h-5 text-primary" />
                ) : (
                  <Sun className="w-5 h-5 text-warning" />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground">Theme</p>
                <p className="text-sm text-muted-foreground">
                  {isDarkMode ? "Dark mode enabled" : "Light mode enabled"}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={cn(
                "relative w-14 h-7 rounded-full transition-colors",
                isDarkMode ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform",
                  isDarkMode ? "translate-x-7" : "translate-x-1"
                )}
              />
            </button>
          </div>
        </div>

        {/* Usage Limits */}
        <div className="card-stats">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Plan & Usage</h3>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">FREE PLAN</span>
          </div>
          
          <div className="space-y-6">
            {/* UID Limit */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">UIDs Whitelisted</p>
                <p className="text-sm font-medium text-foreground">
                  {usageLimits.uidsUsed} / {usageLimits.maxUids}
                </p>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill"
                  style={{ width: `${usageLimits.percentUsed}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                1 UID whitelist lasts for 24 hours
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Max UIDs</p>
                <p className="text-2xl font-semibold text-foreground mt-1">{usageLimits.maxUids}</p>
              </div>
              <div className="border border-border rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Daily Limit</p>
                <p className="text-2xl font-semibold text-foreground mt-1">10</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="card-stats">
          <h3 className="font-semibold text-foreground mb-4">Account</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Key className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Reset Password</p>
                  <p className="text-sm text-muted-foreground">Send a password reset email</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-md hover:bg-muted transition-colors">
                Reset
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-destructive/30 rounded-lg bg-destructive/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="font-medium text-destructive">Delete Account</p>
                  <p className="text-sm text-muted-foreground">Permanently remove your account</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-destructive border border-destructive/30 rounded-md hover:bg-destructive/10 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
