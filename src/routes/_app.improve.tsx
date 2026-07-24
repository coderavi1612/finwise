import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card } from "@/components/AppLayout";
import { useSelectedUser } from "@/store/app-store";
import { useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_app/improve")({
  head: () => ({
    meta: [
      { title: "Improve Your Credit — FinWise AI" },
      {
        name: "description",
        content: "Actionable recommendations and a what-if simulator to boost your credit profile.",
      },
      { property: "og:title", content: "Improve Your Credit — FinWise AI" },
      {
        property: "og:description",
        content: "What-if simulator for your credit score.",
      },
    ],
  }),
  component: ImprovePage,
});

const recommendations = [
  { key: "bills", title: "Pay every utility bill before due date", impact: 25 },
  { key: "savings", title: "Increase monthly savings by ₹500", impact: 18 },
  { key: "shopping", title: "Reduce unnecessary shopping", impact: 10 },
  { key: "sip", title: "Start a ₹500 SIP in an index fund category", impact: 12 },
];

function ImprovePage() {
  const user = useSelectedUser()!;
  const [toggles, setToggles] = useState<Record<string, boolean>>({});

  const projected = useMemo(() => {
    const boost = recommendations.reduce((sum, r) => (toggles[r.key] ? sum + r.impact : sum), 0);
    return Math.min(850, user.creditScore + boost);
  }, [toggles, user.creditScore]);

  return (
    <div>
      <PageHeader
        title="Improve Your Credit Profile"
        description="Small, consistent habits move your score. Toggle actions below to see the estimated impact update instantly."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <div className="text-sm font-medium">Recommended actions</div>
          <div className="mt-4 space-y-3">
            {recommendations.map((r) => {
              const on = !!toggles[r.key];
              return (
                <div
                  key={r.key}
                  className="flex items-center justify-between rounded-xl border border-neutral-200 p-4"
                >
                  <div>
                    <div className="text-sm font-medium">{r.title}</div>
                    <div className="text-xs text-neutral-500 mt-0.5">
                      Estimated impact:{" "}
                      <span className="text-green-700 font-medium">+{r.impact} points</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setToggles((t) => ({ ...t, [r.key]: !t[r.key] }))}
                    className={`h-6 w-11 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 ${
                      on ? "bg-emerald-600" : "bg-neutral-200"
                    } relative`}
                    aria-pressed={on}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                        on ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <div className="text-xs uppercase tracking-wide text-neutral-500">
            What-if projected score
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <div className="text-4xl font-semibold">{projected}</div>
            <div className="text-sm text-green-700">+{projected - user.creditScore}</div>
          </div>
          <div className="text-xs text-neutral-500 mt-1">Current: {user.creditScore}</div>

          <div className="mt-6 rounded-xl bg-neutral-50 p-3 text-xs text-neutral-600 flex gap-2">
            <TrendingUp className="h-4 w-4 mt-0.5" />
            Toggle actions to see how consistent behaviour changes your score over the next quarter.
          </div>
        </Card>
      </div>
    </div>
  );
}
