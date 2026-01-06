import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  coins: number;
}

const DashboardLayout = ({ children, coins }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar coins={coins} />
      <main className="ml-64 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
