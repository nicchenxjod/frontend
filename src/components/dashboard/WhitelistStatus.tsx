import { Clock, Globe } from "lucide-react";

interface WhitelistEntry {
  id: string;
  uid: string;
  region: string;
  timeRemaining: string;
  percentRemaining: number;
  status: "active" | "expired" | "pending";
}

interface WhitelistStatusProps {
  entries: WhitelistEntry[];
}

const WhitelistStatus = ({ entries }: WhitelistStatusProps) => {
  return (
    <div className="card-stats">
      <h3 className="font-semibold text-foreground mb-4">Active Whitelists</h3>
      <div className="space-y-4">
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No active whitelists</p>
        ) : (
          entries.map((entry, index) => (
            <div
              key={entry.id}
              className="border border-border rounded-lg p-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {entry.uid}
                  </code>
                  <span className="badge-region">
                    <Globe className="w-3 h-3 inline mr-1" />
                    {entry.region}
                  </span>
                </div>
                <span className={`badge-status ${entry.status === "active" ? "badge-active" : entry.status === "expired" ? "badge-expired" : "badge-pending"}`}>
                  {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="w-4 h-4" />
                <span>Time remaining: {entry.timeRemaining}</span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${entry.percentRemaining}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WhitelistStatus;
