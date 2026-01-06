// API Configuration and Helper Functions

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9046';

export interface WhitelistEntry {
  uid: string;
  region: string;
  expiry: number;
  status: 'active' | 'expired';
  time_remaining: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Add UID to whitelist
export async function addToWhitelist(uid: string, region: string, hours: number = 24): Promise<ApiResponse<WhitelistEntry>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/whitelist/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, region, hours }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to add to whitelist' };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

// Remove UID from whitelist
export async function removeFromWhitelist(uid: string, region: string): Promise<ApiResponse<void>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/whitelist/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, region }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to remove from whitelist' };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

// List all whitelisted UIDs
export async function listWhitelist(): Promise<ApiResponse<WhitelistEntry[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/whitelist/list`);
    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to fetch whitelist' };
    }

    return { success: true, data: data.entries };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

// List whitelisted UIDs for a specific region
export async function listWhitelistByRegion(region: string): Promise<ApiResponse<WhitelistEntry[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/whitelist/list/${region}`);
    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to fetch whitelist' };
    }

    return { success: true, data: data.entries };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

// Check if UID is whitelisted
export async function checkWhitelist(uid: string, region?: string): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/whitelist/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, region }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to check whitelist' };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

// Get all supported regions
export async function getRegions(): Promise<ApiResponse<string[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/regions`);
    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to fetch regions' };
    }

    return { success: true, data: data.regions };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

// Helper function to format time remaining
export function formatTimeRemaining(seconds: number): string {
  if (seconds <= 0) return '0h 0m';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${hours}h ${minutes}m`;
}

// Helper function to format expiry date
export function formatExpiryDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Coin System API Functions

// Get user's coin balance
export async function getCoinBalance(): Promise<ApiResponse<{ coins: number }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/coins/balance`);
    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to fetch coin balance' };
    }

    return { success: true, data: { coins: data.coins } };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

// Add coins to user account (called after ad completion)
export async function addCoins(amount: number, reason: string = 'ad_view'): Promise<ApiResponse<{ coins: number; added: number }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/coins/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, reason }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to add coins' };
    }

    return { success: true, data: { coins: data.coins, added: data.added } };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

// Get coin transaction history
export async function getCoinHistory(): Promise<ApiResponse<any[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/coins/history`);
    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to fetch coin history' };
    }

    return { success: true, data: data.history };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

// Get overall statistics
export async function getStats(): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stats`);
    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to fetch stats' };
    }

    return { success: true, data: data.stats };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

