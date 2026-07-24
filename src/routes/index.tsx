import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, LineChart, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FinWise AI — Transparent Credit & Investment Insights" },
      {
        name: "description",
        content:
          "FinWise AI helps underserved users understand their financial health, credit score, and investment readiness with transparent AI insights.",
      },
      { property: "og:title", content: "FinWise AI — Transparent Credit & Investment Insights" },
      {
        property: "og:description",
        content:
          "FinWise AI helps underserved users understand their financial health, credit score, and investment readiness with transparent AI insights.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
        <div className="font-semibold tracking-tight">
          FinWise <span className="text-neutral-400">AI</span>
        </div>
        <Link to="/demo" className="text-sm text-neutral-600 hover:text-black transition-colors">
          Try demo →
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-16 md:pt-28 pb-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600">
          <Sparkles className="h-3 w-3" /> Hackathon MVP · Synthetic data
        </div>
        <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
          FinWise AI
        </h1>
        <p className="mt-5 text-base md:text-lg text-neutral-500 max-w-2xl mx-auto">
          Helping underserved users understand their financial health and investment readiness.
          Transparent credit insights and AI-powered micro investment guidance.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            Start Demo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          {[
            {
              icon: ShieldCheck,
              title: "Transparent Credit Score",
              desc: "See exactly what pushes your score up or down, based on real behavioural signals.",
            },
            {
              icon: LineChart,
              title: "Micro Investment Guidance",
              desc: "Category-level recommendations calibrated to your risk profile and cash flow.",
            },
            {
              icon: Sparkles,
              title: "Personalised Growth Plan",
              desc: "Project how small, steady contributions grow across conservative to optimistic scenarios.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-neutral-200 p-5">
              <f.icon className="h-5 w-5 text-neutral-700" />
              <div className="mt-3 font-medium">{f.title}</div>
              <div className="mt-1 text-sm text-neutral-500">{f.desc}</div>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-400">
        For educational purposes only. Not regulated financial advice.
      </footer>
    </div>
  );
}
