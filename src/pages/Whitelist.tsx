import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Plus, Globe, Clock, Trash2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { addToWhitelist, removeFromWhitelist, listWhitelist, formatTimeRemaining, formatExpiryDate, getCoinBalance } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface WhitelistEntry {
  uid: string;
  region: string;
  expiry: number;
  status: "active" | "expired";
  time_remaining: number;
}

const Whitelist = () => {
  const [coins, setCoins] = useState(0);
  const [uid, setUid] = useState("");
  const [region, setRegion] = useState("");
  const [hours, setHours] = useState(24);
  const [entries, setEntries] = useState<WhitelistEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const COIN_COST = 100; // Cost per whitelist

  const regions = [
    { value: "BD", label: "Bangladesh" },
    { value: "IND", label: "India" },
    { value: "PK", label: "Pakistan" },
    { value: "ID", label: "Indonesia" },
    { value: "VN", label: "Vietnam" },
    { value: "TH", label: "Thailand" },
    { value: "ME", label: "Middle East" },
    { value: "EU", label: "Europe" },
    { value: "NA", label: "North America" },
    { value: "BR", label: "Brazil" },
    { value: "TW", label: "Taiwan" },
    { value: "CIS", label: "CIS/Russia" },
    { value: "SAC", label: "South America" },
  ];

  // Load whitelist and coin balance on mount
  useEffect(() => {
    loadWhitelist();
    loadCoinBalance();
  }, []);

  const loadCoinBalance = async () => {
    const response = await getCoinBalance();
    if (response.success && response.data) {
      setCoins(response.data.coins);
    }
  };

  const loadWhitelist = async () => {
    setIsRefreshing(true);
    const response = await listWhitelist();
    setIsRefreshing(false);

    if (response.success && response.data) {
      setEntries(response.data);
    } else {
      toast({
        title: "Error",
        description: response.error || "Failed to load whitelist",
        variant: "destructive",
      });
    }
  };

  const handleAddUid = async () => {
    if (!uid.trim() || !region) {
      toast({
        title: "Validation Error",
        description: "Please enter both UID and select a region",
        variant: "destructive",
      });
      return;
    }

    // Check if user has enough coins
    if (coins < COIN_COST) {
      toast({
        title: "Insufficient Coins",
        description: `You need ${COIN_COST} coins to whitelist a UID. You have ${coins} coins. Visit the Get Access page to earn more!`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const response = await addToWhitelist(uid.trim(), region, hours);
    setLoading(false);

    if (response.success) {
      toast({
        title: "Success",
        description: `UID ${uid} added to ${region} whitelist for ${hours} hours. ${COIN_COST} coins deducted.`,
      });
      setUid("");
      setRegion("");
      setHours(24);
      loadWhitelist(); // Reload the list
      loadCoinBalance(); // Refresh coin balance
    } else {
      toast({
        title: "Error",
        description: response.error || "Failed to add UID to whitelist",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (entry: WhitelistEntry) => {
    setLoading(true);
    const response = await removeFromWhitelist(entry.uid, entry.region);
    setLoading(false);

    if (response.success) {
      toast({
        title: "Success",
        description: `UID ${entry.uid} removed from whitelist`,
      });
      loadWhitelist(); // Reload the list
    } else {
      toast({
        title: "Error",
        description: response.error || "Failed to remove UID from whitelist",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout coins={coins}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Whitelist</h1>
            <p className="text-muted-foreground mt-1">Manage your whitelisted UIDs</p>
          </div>
          <button
            onClick={loadWhitelist}
            disabled={isRefreshing}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md font-medium text-sm flex items-center gap-2 hover:bg-secondary/90 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
            Refresh
          </button>
        </div>

        {/* Add UID Form */}
        <div className="card-stats">
          <h3 className="font-semibold text-foreground mb-4">Add New UID</h3>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex-1">
                <label className="text-sm text-muted-foreground mb-1.5 block">UID</label>
                <input
                  type="text"
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  placeholder="Enter UID (e.g., 1234567890)"
                  className="input-field"
                  disabled={loading}
                />
              </div>
              <div className="w-full">
                <label className="text-sm text-muted-foreground mb-1.5 block">Region</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="input-field appearance-none cursor-pointer"
                  disabled={loading}
                >
                  <option value="">Select Region</option>
                  {regions.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full">
                <label className="text-sm text-muted-foreground mb-1.5 block">Duration (Hours)</label>
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value) || 24)}
                  min="1"
                  max="720"
                  className="input-field"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Cost: <span className="font-semibold text-primary">{COIN_COST} coins</span> •
                Available: <span className={cn("font-semibold", coins >= COIN_COST ? "text-success" : "text-destructive")}>
                  {coins} coins
                </span>
              </p>
              <button
                onClick={handleAddUid}
                disabled={!uid.trim() || !region || loading}
                className="h-10 px-6 bg-primary text-primary-foreground rounded-md font-medium text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
                {loading ? "Adding..." : "Add UID"}
              </button>
            </div>
          </div>
        </div>

        {/* Whitelist Table */}
        <div className="card-stats overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">
              Active Whitelists ({entries.length})
            </h3>
          </div>

          <div className="overflow-x-auto -mx-5">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="table-header text-left px-5 pb-3">UID</th>
                  <th className="table-header text-left pb-3">Region</th>
                  <th className="table-header text-left pb-3">Time Remaining</th>
                  <th className="table-header text-left pb-3">Status</th>
                  <th className="table-header text-left pb-3">Expires</th>
                  <th className="table-header text-right px-5 pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {entries.map((entry, index) => (
                  <tr
                    key={`${entry.uid}-${entry.region}`}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="table-cell px-5">
                      <code className="text-sm font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {entry.uid}
                      </code>
                    </td>
                    <td className="table-cell">
                      <span className="badge-region">
                        <Globe className="w-3 h-3 inline mr-1" />
                        {entry.region}
                      </span>
                    </td>
                    <td className="table-cell">
                      <span className={cn(
                        "flex items-center gap-1.5",
                        entry.status === "expired" ? "text-destructive" : "text-success"
                      )}>
                        <Clock className="w-4 h-4" />
                        {formatTimeRemaining(entry.time_remaining)}
                      </span>
                    </td>
                    <td className="table-cell">
                      <span className={cn(
                        "badge-status",
                        entry.status === "active" && "badge-active",
                        entry.status === "expired" && "badge-expired"
                      )}>
                        {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                      </span>
                    </td>
                    <td className="table-cell text-muted-foreground text-sm">
                      {formatExpiryDate(entry.expiry)}
                    </td>
                    <td className="table-cell px-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDelete(entry)}
                          disabled={loading}
                          className="p-1.5 rounded hover:bg-destructive/10 text-destructive transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {entries.length === 0 && !isRefreshing && (
            <div className="text-center py-8 text-muted-foreground">
              No whitelisted UIDs found. Add one above to get started.
            </div>
          )}

          {isRefreshing && (
            <div className="text-center py-8 text-muted-foreground">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
              Loading whitelist...
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Whitelist;
