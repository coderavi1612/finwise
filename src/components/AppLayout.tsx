import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Gauge,
  TrendingUp,
  MessageSquare,
  PieChart,
  LineChart,
  User,
  ArrowLeft,
} from "lucide-react";
import type { ReactNode } from "react";
import { useSelectedUser, useAppStore } from "@/store/app-store";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/credit", label: "Credit Score", icon: Gauge },
  { to: "/improve", label: "Improve Score", icon: TrendingUp },
  { to: "/risk", label: "Risk Assessment", icon: MessageSquare },
  { to: "/investment", label: "Investment Plan", icon: PieChart },
  { to: "/growth", label: "Growth Projection", icon: LineChart },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppLayout({ children }: { children: ReactNode }) {
  const user = useSelectedUser();
  const users = useAppStore((s) => s.users);
  const selectUser = useAppStore((s) => s.selectUser);
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const navigate = useNavigate();

  if (!user) {
    // Guard: redirect via effect-less approach — render a prompt
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold">Select a demo user</h1>
          <p className="mt-2 text-sm text-neutral-500">
            Please choose a synthetic user profile to continue.
          </p>
          <button
            onClick={() => navigate({ to: "/demo" })}
            className="mt-6 inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            Choose Demo User
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white text-black">
      <aside className="hidden md:flex w-64 flex-col border-r border-neutral-200 sticky top-0 h-screen">
        <div className="px-6 py-5 border-b border-neutral-200">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            FinWise <span className="text-neutral-400">AI</span>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-neutral-100 text-black font-medium"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-black"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-neutral-200">
          <label className="block text-xs text-neutral-500 mb-1 px-1">Demo user</label>
          <select
            value={user.id}
            onChange={(e) => selectUser(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} — {u.occupation}
              </option>
            ))}
          </select>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-neutral-200 sticky top-0 bg-white z-10">
          <Link to="/" className="font-semibold">
            FinWise AI
          </Link>
          <select
            value={user.id}
            onChange={(e) => selectUser(e.target.value)}
            className="rounded-lg border border-neutral-200 px-2 py-1 text-xs"
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </header>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-neutral-200 flex overflow-x-auto">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex-1 min-w-16 flex flex-col items-center gap-0.5 py-2 text-[10px] ${
                  active ? "text-black" : "text-neutral-500"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label.split(" ")[0]}
              </Link>
            );
          })}
        </nav>

        <div className="max-w-6xl mx-auto px-6 py-8 pb-24 md:pb-8">{children}</div>
      </main>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  back,
}: {
  title: string;
  description?: string;
  back?: string;
}) {
  return (
    <div className="mb-8">
      {back && (
        <Link
          to={back}
          className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-black mb-3"
        >
          <ArrowLeft className="h-3 w-3" /> Back
        </Link>
      )}
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h1>
      {description && <p className="mt-2 text-sm text-neutral-500 max-w-2xl">{description}</p>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-neutral-200 bg-white p-5 ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <Card>
      <div className="text-xs uppercase tracking-wide text-neutral-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold">{value}</div>
      {hint && <div className="mt-1 text-xs text-neutral-500">{hint}</div>}
    </Card>
  );
}

export function RiskBadge({ risk }: { risk: "Low" | "Medium" | "High" }) {
  const cls =
    risk === "Low"
      ? "bg-green-50 text-green-700 border-green-200"
      : risk === "Medium"
        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
        : "bg-red-50 text-red-700 border-red-200";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${cls}`}
    >
      {risk} Risk
    </span>
  );
}
