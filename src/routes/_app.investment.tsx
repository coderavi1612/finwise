import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Card, RiskBadge } from "@/components/AppLayout";
import { useSelectedUser } from "@/store/app-store";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export const Route = createFileRoute("/_app/investment")({
  head: () => ({
    meta: [
      { title: "Investment Recommendation — FinWise AI" },
      {
        name: "description",
        content: "Category-level investment allocation recommended for your risk profile.",
      },
      { property: "og:title", content: "Investment Recommendation — FinWise AI" },
      {
        property: "og:description",
        content: "Diversified investment categories, not individual stocks.",
      },
    ],
  }),
  component: InvestmentPage,
});

const colors = ["#111827", "#4b5563", "#9ca3af", "#d1d5db"];

function InvestmentPage() {
  const user = useSelectedUser()!;
  return (
    <div>
      <PageHeader
        title="Investment Recommendation"
        description="A diversified, category-level plan calibrated to your risk profile and cash flow. Individual stocks are never recommended."
      />

      <div className="flex items-center gap-3 mb-4">
        <RiskBadge risk={user.risk} />
        <span className="text-sm text-neutral-500">
          Recommended allocation for {user.risk.toLowerCase()}-risk profiles
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={user.allocation}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {user.allocation.map((_, i) => (
                    <Cell key={i} fill={colors[i % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <div className="text-sm font-medium">Allocation breakdown</div>
          <ul className="mt-3 space-y-3">
            {user.allocation.map((a, i) => (
              <li key={a.name} className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: colors[i % colors.length] }}
                />
                <span className="text-sm flex-1">{a.name}</span>
                <span className="text-sm font-medium">{a.value}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="text-sm font-medium">Why this allocation</div>
        <p className="mt-2 text-sm text-neutral-600">{user.allocationReason}</p>
      </Card>

      <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-xs text-yellow-800">
        This recommendation is for educational purposes only and does not constitute regulated
        financial advice. FinWise AI never recommends individual stocks — only diversified
        investment categories.
      </div>

      <div className="mt-6">
        <Link
          to="/growth"
          className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
        >
          See growth projection
        </Link>
      </div>
    </div>
  );
}
