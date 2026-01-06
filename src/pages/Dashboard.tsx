import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import ActivityLog from "@/components/dashboard/ActivityLog";
import WhitelistStatus from "@/components/dashboard/WhitelistStatus";
import { Shield, Clock, Wallet, Users } from "lucide-react";

const Dashboard = () => {
  const [coins] = useState(2500);

  const whitelistEntries = [
    {
      id: "1",
      uid: "1234567890",
      region: "BD",
      timeRemaining: "18h 32m",
      percentRemaining: 77,
      status: "active" as const,
    },
    {
      id: "2",
      uid: "9876543210",
      region: "IN",
      timeRemaining: "5h 15m",
      percentRemaining: 22,
      status: "active" as const,
    },
  ];

  const activityLogs = [
    {
      id: "1",
      type: "whitelist" as const,
      message: "UID 1234567890 added to whitelist",
      timestamp: "2 minutes ago",
    },
    {
      id: "2",
      type: "success" as const,
      message: "Successfully bypassed UID verification",
      timestamp: "15 minutes ago",
    },
    {
      id: "3",
      type: "access" as const,
      message: "Access token refreshed",
      timestamp: "1 hour ago",
    },
    {
      id: "4",
      type: "warning" as const,
      message: "UID 5555555555 whitelist expired",
      timestamp: "3 hours ago",
    },
    {
      id: "5",
      type: "whitelist" as const,
      message: "UID 9876543210 added to whitelist",
      timestamp: "5 hours ago",
    },
  ];

  return (
    <DashboardLayout coins={coins}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Monitor your UID bypass system activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Whitelists"
            value={whitelistEntries.filter(e => e.status === "active").length}
            icon={Shield}
            variant="primary"
            trend="2 UIDs currently active"
          />
          <StatCard
            title="Time Until Expiry"
            value="5h 15m"
            icon={Clock}
            variant="warning"
            trend="Next expiration"
          />
          <StatCard
            title="Current Balance"
            value={`${coins.toLocaleString()} coins`}
            icon={Wallet}
            variant="success"
          />
          <StatCard
            title="Total Bypasses"
            value="127"
            icon={Users}
            trend="This month"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WhitelistStatus entries={whitelistEntries} />
          <ActivityLog logs={activityLogs} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
