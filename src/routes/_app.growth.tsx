import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card } from "@/components/AppLayout";
import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const Route = createFileRoute("/_app/growth")({
  head: () => ({
    meta: [
      { title: "Growth Projection — FinWise AI" },
      {
        name: "description",
        content:
          "Project how a monthly SIP grows across conservative, expected, and optimistic scenarios.",
      },
      { property: "og:title", content: "Growth Projection — FinWise AI" },
      {
        property: "og:description",
        content: "Explore SIP growth scenarios.",
      },
    ],
  }),
  component: GrowthPage,
});

function project(monthly: number, years: number, annualRate: number) {
  const r = annualRate / 12;
  const n = years * 12;
  const points: { month: string; value: number }[] = [];
  let bal = 0;
  for (let i = 1; i <= n; i++) {
    bal = (bal + monthly) * (1 + r);
    if (i % 3 === 0 || i === n) {
      points.push({ month: `M${i}`, value: Math.round(bal) });
    }
  }
  return points;
}

function GrowthPage() {
  const [monthly, setMonthly] = useState(2000);
  const [years, setYears] = useState<1 | 3 | 5>(3);

  const { data, maturity } = useMemo(() => {
    const cons = project(monthly, years, 0.06);
    const exp = project(monthly, years, 0.1);
    const opt = project(monthly, years, 0.14);
    const merged = cons.map((c, i) => ({
      month: c.month,
      Conservative: c.value,
      Expected: exp[i].value,
      Optimistic: opt[i].value,
    }));
    return {
      data: merged,
      maturity: {
        cons: cons[cons.length - 1]?.value ?? 0,
        exp: exp[exp.length - 1]?.value ?? 0,
        opt: opt[opt.length - 1]?.value ?? 0,
      },
    };
  }, [monthly, years]);

  return (
    <div>
      <PageHeader
        title="Growth Projection"
        description="Adjust your monthly contribution and horizon to see how disciplined investing compounds over time."
      />

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs uppercase tracking-wide text-neutral-500">
              Monthly investment: ₹{monthly.toLocaleString("en-IN")}
            </label>
            <input
              type="range"
              min={500}
              max={5000}
              step={100}
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))}
              className="w-full mt-3 accent-black"
            />
            <div className="flex justify-between text-xs text-neutral-500 mt-1">
              <span>₹500</span>
              <span>₹5,000</span>
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-neutral-500">Duration</label>
            <div className="mt-3 flex gap-2">
              {[1, 3, 5].map((y) => (
                <button
                  key={y}
                  onClick={() => setYears(y as 1 | 3 | 5)}
                  className={`rounded-lg border px-4 py-2 text-sm ${
                    years === y
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-neutral-200 hover:bg-neutral-50"
                  }`}
                >
                  {y} year{y > 1 ? "s" : ""}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="#f1f1f1" vertical={false} />
              <XAxis dataKey="month" stroke="#999" fontSize={11} />
              <YAxis
                stroke="#999"
                fontSize={11}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip formatter={(v: number) => `₹${v.toLocaleString("en-IN")}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="Conservative"
                stroke="#9ca3af"
                strokeWidth={2}
                dot={false}
              />
              <Line type="monotone" dataKey="Expected" stroke="#000" strokeWidth={2} dot={false} />
              <Line
                type="monotone"
                dataKey="Optimistic"
                stroke="#16a34a"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-xs uppercase text-neutral-500">Conservative</div>
          <div className="text-2xl font-semibold mt-2">
            ₹{maturity.cons.toLocaleString("en-IN")}
          </div>
          <div className="text-xs text-neutral-500 mt-1">at 6% p.a.</div>
        </Card>
        <Card>
          <div className="text-xs uppercase text-neutral-500">Expected</div>
          <div className="text-2xl font-semibold mt-2">₹{maturity.exp.toLocaleString("en-IN")}</div>
          <div className="text-xs text-neutral-500 mt-1">at 10% p.a.</div>
        </Card>
        <Card>
          <div className="text-xs uppercase text-neutral-500">Optimistic</div>
          <div className="text-2xl font-semibold mt-2 text-green-700">
            ₹{maturity.opt.toLocaleString("en-IN")}
          </div>
          <div className="text-xs text-neutral-500 mt-1">at 14% p.a.</div>
        </Card>
      </div>
    </div>
  );
}
