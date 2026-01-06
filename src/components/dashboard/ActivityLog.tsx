import { Clock, Shield, AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogEntry {
  id: string;
  type: "whitelist" | "access" | "warning" | "success";
  message: string;
  timestamp: string;
}

interface ActivityLogProps {
  logs: LogEntry[];
}

const ActivityLog = ({ logs }: ActivityLogProps) => {
  const getIcon = (type: LogEntry["type"]) => {
    switch (type) {
      case "whitelist":
        return Shield;
      case "access":
        return Clock;
      case "warning":
        return AlertCircle;
      case "success":
        return CheckCircle;
    }
  };

  const getIconStyles = (type: LogEntry["type"]) => {
    switch (type) {
      case "whitelist":
        return "bg-primary/10 text-primary";
      case "access":
        return "bg-muted text-muted-foreground";
      case "warning":
        return "bg-warning/10 text-warning";
      case "success":
        return "bg-success/10 text-success";
    }
  };

  return (
    <div className="card-stats">
      <h3 className="font-semibold text-foreground mb-4">Activity Log</h3>
      <div className="space-y-3">
        {logs.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
        ) : (
          logs.map((log, index) => {
            const Icon = getIcon(log.type);
            return (
              <div
                key={log.id}
                className="flex items-start gap-3 animate-slide-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", getIconStyles(log.type))}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{log.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{log.timestamp}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
