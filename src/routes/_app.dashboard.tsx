import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Card, StatCard, RiskBadge } from "@/components/AppLayout";
import { useSelectedUser } from "@/store/app-store";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — FinWise AI" },
      {
        name: "description",
        content:
          "Your financial health snapshot: credit score, risk profile, and monthly investment capacity.",
      },
      { property: "og:title", content: "Dashboard — FinWise AI" },
      {
        property: "og:description",
        content: "Financial health snapshot with credit and investment.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const user = useSelectedUser()!;
  const capacity = Math.max(500, Math.round((user.income - user.expenses) * 0.4));
  const health = Math.min(100, Math.round(((user.creditScore - 550) / 300) * 100));

  return (
    <div>
      <PageHeader
        title={`Welcome, ${user.name.split(" ")[0]}`}
        description="Here's your financial health snapshot based on your synthetic profile. All values update when you switch demo user."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Health Score"
          value={`${health}/100`}
          hint="Composite of behaviour signals"
        />
        <StatCard label="Credit Score" value={user.creditScore} hint={user.creditLabel} />
        <StatCard label="Risk Level" value={<RiskBadge risk={user.risk} />} />
        <StatCard
          label="Investment Capacity"
          value={`₹${capacity.toLocaleString("en-IN")}`}
          hint="Suggested per month"
        />
      </div>

      <Card className="mt-6">
        <div className="text-sm font-medium">Quick summary</div>
        <ul className="mt-3 space-y-2 text-sm text-neutral-600">
          {user.positives.slice(0, 3).map((p) => (
            <li key={p} className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
              {p}
            </li>
          ))}
        </ul>
      </Card>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuickLink
          to="/credit"
          title="Credit Score"
          desc={`${user.creditScore} · ${user.creditLabel}`}
        />
        <QuickLink to="/risk" title="Risk Profile" desc={`${user.risk} risk tolerance`} />
        <QuickLink
          to="/investment"
          title="Suggested Investment"
          desc={`${user.allocation.length}-part diversified plan`}
        />
        <QuickLink
          to="/growth"
          title="Projected Growth"
          desc="See conservative to optimistic outcomes"
        />
      </div>

      <Card className="mt-6">
        <div className="text-sm font-medium">Recent recommendations</div>
        <ul className="mt-3 space-y-2 text-sm text-neutral-600 list-disc list-inside">
          <li>Increase monthly savings by ₹500 to gain ~18 points</li>
          <li>Pay every utility bill before its due date</li>
          <li>Start a small SIP in an index fund category</li>
        </ul>
        <Link
          to="/improve"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline"
        >
          Open improvement plan <ArrowRight className="h-3 w-3" />
        </Link>
      </Card>
    </div>
  );
}

function QuickLink({
  to,
  title,
  desc,
}: {
  to: "/credit" | "/risk" | "/investment" | "/growth";
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-neutral-200 p-5 hover:bg-neutral-50 transition-colors flex items-center justify-between"
    >
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-xs text-neutral-500 mt-1">{desc}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-neutral-400" />
    </Link>
  );
}
