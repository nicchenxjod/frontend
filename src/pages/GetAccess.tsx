import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Gift, ExternalLink, Coins, Clock, Play } from "lucide-react";
import { getCoinBalance, addCoins, getCoinHistory } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const GetAccess = () => {
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadCoinBalance();
    loadCoinHistory();
  }, []);

  const loadCoinBalance = async () => {
    const response = await getCoinBalance();
    if (response.success && response.data) {
      setCoins(response.data.coins);
    }
  };

  const loadCoinHistory = async () => {
    const response = await getCoinHistory();
    if (response.success && response.data) {
      // Get last 5 transactions
      setHistory(response.data.slice(-5).reverse());
    }
  };

  const handleWatchAd = async (adType: string, rewardAmount: number) => {
    setLoading(true);

    // Simulate ad watching (in production, integrate with real ad network)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await addCoins(rewardAmount, adType);
    setLoading(false);

    if (response.success && response.data) {
      setCoins(response.data.coins);
      toast({
        title: "Coins Earned!",
        description: `You earned ${rewardAmount} coins! New balance: ${response.data.coins}`,
      });
      loadCoinHistory();
    } else {
      toast({
        title: "Error",
        description: response.error || "Failed to add coins",
        variant: "destructive",
      });
    }
  };

  const formatTime = (timestamp: number) => {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  return (
    <DashboardLayout coins={coins}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Get Access</h1>
          <p className="text-muted-foreground mt-1">Earn coins by watching ads and completing offers</p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card-stats">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Coins className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">1 UID Whitelist</p>
                <p className="font-semibold text-foreground">100 Coins</p>
              </div>
            </div>
          </div>
          <div className="card-stats">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Per Ad View</p>
                <p className="font-semibold text-foreground">10 Coins</p>
              </div>
            </div>
          </div>
          <div className="card-stats">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Whitelist Duration</p>
                <p className="font-semibold text-foreground">24 Hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Earn Coins Section */}
        <div className="card-stats">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-foreground">Earn Free Coins</h3>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">Demo Mode</span>
          </div>

          {/* Ad Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => handleWatchAd("video_ad", 10)}
              disabled={loading}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">Watch Video Ad</p>
                  <p className="text-sm text-muted-foreground">30 seconds</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-success font-semibold">
                <Coins className="w-4 h-4" />
                +10
              </div>
            </button>

            <button
              onClick={() => handleWatchAd("banner_ad", 5)}
              disabled={loading}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-success" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">View Banner Ad</p>
                  <p className="text-sm text-muted-foreground">Click to view</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-success font-semibold">
                <Coins className="w-4 h-4" />
                +5
              </div>
            </button>

            <button
              onClick={() => handleWatchAd("survey", 50)}
              disabled={loading}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Gift className="w-6 h-6 text-warning" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">Complete Survey</p>
                  <p className="text-sm text-muted-foreground">2-3 minutes</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-success font-semibold">
                <Coins className="w-4 h-4" />
                +50
              </div>
            </button>

            <button
              onClick={() => handleWatchAd("offer", 100)}
              disabled={loading}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <ExternalLink className="w-6 h-6 text-destructive" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground">Special Offer</p>
                  <p className="text-sm text-muted-foreground">Complete task</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-success font-semibold">
                <Coins className="w-4 h-4" />
                +100
              </div>
            </button>
          </div>

          {loading && (
            <div className="text-center py-4">
              <div className="inline-flex items-center gap-2 text-primary">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> This is a demo version. In production, real ad networks (Google AdSense, etc.) will be integrated. Click the buttons above to simulate earning coins!
            </p>
          </div>
        </div>

        {/* Recent Rewards */}
        <div className="card-stats">
          <h3 className="font-semibold text-foreground mb-4">Recent Rewards</h3>
          <div className="space-y-3">
            {history.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No reward history yet. Start earning coins above!
              </div>
            ) : (
              history.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                      <Coins className="w-4 h-4 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground capitalize">
                        {item.action === "coins_add" ? item.reason.replace("_", " ") : item.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatTime(item.timestamp)}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-success">
                    +{item.amount || 0} coins
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GetAccess;
