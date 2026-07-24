import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Card, RiskBadge } from "@/components/AppLayout";
import { useSelectedUser } from "@/store/app-store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Check, X } from "lucide-react";

export const Route = createFileRoute("/_app/credit")({
  head: () => ({
    meta: [
      { title: "Credit Score — FinWise AI" },
      {
        name: "description",
        content:
          "Transparent view of your credit score, positive and negative drivers, and history trend.",
      },
      { property: "og:title", content: "Credit Score — FinWise AI" },
      {
        property: "og:description",
        content: "Transparent breakdown of your credit score.",
      },
    ],
  }),
  component: CreditPage,
});

function ScoreGauge({ score }: { score: number }) {
  const min = 550;
  const max = 850;
  const pct = Math.min(100, Math.max(0, ((score - min) / (max - min)) * 100));
  const angle = -90 + (pct / 100) * 180;
  return (
    <div className="relative w-full max-w-xs mx-auto">
      <svg viewBox="0 0 200 120" className="w-full">
        <path
          d="M 20 110 A 80 80 0 0 1 180 110"
          fill="none"
          stroke="#e5e5e5"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 20 110 A 80 80 0 0 1 180 110"
          fill="none"
          stroke="#000"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * 251} 251`}
        />
        <line
          x1="100"
          y1="110"
          x2={100 + 70 * Math.cos((angle * Math.PI) / 180)}
          y2={110 + 70 * Math.sin((angle * Math.PI) / 180)}
          stroke="#000"
          strokeWidth="2"
        />
        <circle cx="100" cy="110" r="4" fill="#000" />
      </svg>
      <div className="text-center -mt-2">
        <div className="text-5xl font-semibold">{score}</div>
      </div>
    </div>
  );
}

function CreditPage() {
  const user = useSelectedUser()!;
  return (
    <div>
      <PageHeader
        title="Credit Score Analysis"
        description="A transparent view of your current score, the factors driving it, and how it's trending."
      />

      <Card>
        <ScoreGauge score={user.creditScore} />
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="text-sm text-neutral-500">
            Bucket: <span className="text-black font-medium">{user.creditLabel}</span>
          </span>
          <RiskBadge risk={user.risk} />
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="text-sm font-medium">Top positive factors</div>
          <ul className="mt-3 space-y-2 text-sm">
            {user.positives.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="text-sm font-medium">Top negative factors</div>
          <ul className="mt-3 space-y-2 text-sm">
            {user.negatives.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <X className="h-4 w-4 text-red-600 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="text-sm font-medium">Credit history</div>
        <div className="mt-4 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={user.history}>
              <CartesianGrid stroke="#f1f1f1" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="#999"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#999"
                fontSize={12}
                domain={["dataMin - 20", "dataMax + 20"]}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#000"
                strokeWidth={2}
                dot={{ r: 3, fill: "#000" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl border border-neutral-200 p-3">
            <div className="text-xs text-neutral-500">Previous month</div>
            <div className="text-lg font-semibold">{user.previousScore}</div>
          </div>
          <div className="rounded-xl border border-neutral-200 p-3">
            <div className="text-xs text-neutral-500">Current</div>
            <div className="text-lg font-semibold">{user.creditScore}</div>
          </div>
          <div className="rounded-xl border border-neutral-200 p-3">
            <div className="text-xs text-neutral-500">Estimated next</div>
            <div className="text-lg font-semibold text-green-700">{user.estimatedNextScore}</div>
          </div>
        </div>
      </Card>

      <div className="mt-6">
        <Link
          to="/improve"
          className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
        >
          Improve my score
        </Link>
      </div>
    </div>
  );
}
