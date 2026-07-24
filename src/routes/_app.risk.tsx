import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, Card, RiskBadge } from "@/components/AppLayout";
import { useSelectedUser } from "@/store/app-store";
import { useState } from "react";
import { RotateCcw, Send } from "lucide-react";

export const Route = createFileRoute("/_app/risk")({
  head: () => ({
    meta: [
      { title: "Risk Assessment — FinWise AI" },
      {
        name: "description",
        content: "A short conversational assessment to categorise your investment risk tolerance.",
      },
      { property: "og:title", content: "Risk Assessment — FinWise AI" },
      {
        property: "og:description",
        content: "Chat-based risk profiling.",
      },
    ],
  }),
  component: RiskPage,
});

type Q = {
  key: string;
  prompt: string;
  options: { label: string; score: number }[];
};

const questions: Q[] = [
  {
    key: "age",
    prompt: "What is your age group?",
    options: [
      { label: "Under 25", score: 3 },
      { label: "25–40", score: 2 },
      { label: "40–55", score: 1 },
      { label: "55+", score: 0 },
    ],
  },
  {
    key: "income",
    prompt: "How would you describe your monthly income?",
    options: [
      { label: "Unstable", score: 0 },
      { label: "Modest but stable", score: 1 },
      { label: "Comfortable", score: 2 },
      { label: "High", score: 3 },
    ],
  },
  {
    key: "goal",
    prompt: "What is your primary investment goal?",
    options: [
      { label: "Preserve capital", score: 0 },
      { label: "Steady income", score: 1 },
      { label: "Balanced growth", score: 2 },
      { label: "Aggressive growth", score: 3 },
    ],
  },
  {
    key: "duration",
    prompt: "How long can you stay invested?",
    options: [
      { label: "< 1 year", score: 0 },
      { label: "1–3 years", score: 1 },
      { label: "3–7 years", score: 2 },
      { label: "7+ years", score: 3 },
    ],
  },
  {
    key: "loss",
    prompt: "If your portfolio dropped 20%, you would…",
    options: [
      { label: "Sell everything", score: 0 },
      { label: "Sell some", score: 1 },
      { label: "Hold steady", score: 2 },
      { label: "Invest more", score: 3 },
    ],
  },
  {
    key: "monthly",
    prompt: "How much can you invest monthly?",
    options: [
      { label: "₹500", score: 0 },
      { label: "₹1,000–2,000", score: 1 },
      { label: "₹2,000–5,000", score: 2 },
      { label: "₹5,000+", score: 3 },
    ],
  },
  {
    key: "responsibilities",
    prompt: "How many financial dependents do you have?",
    options: [
      { label: "Many", score: 0 },
      { label: "A few", score: 1 },
      { label: "One or two", score: 2 },
      { label: "None", score: 3 },
    ],
  },
  {
    key: "emergency",
    prompt: "Do you have an emergency fund?",
    options: [
      { label: "None", score: 0 },
      { label: "Less than 1 month", score: 1 },
      { label: "1–3 months", score: 2 },
      { label: "3+ months", score: 3 },
    ],
  },
];

type Turn = { role: "bot"; text: string } | { role: "user"; text: string; score: number };

function RiskPage() {
  const user = useSelectedUser()!;
  const [step, setStep] = useState(0);
  const [turns, setTurns] = useState<Turn[]>([
    {
      role: "bot",
      text: `Hi ${user.name.split(" ")[0]}, I'll ask you 8 quick questions to size up your risk tolerance.`,
    },
    { role: "bot", text: questions[0].prompt },
  ]);
  const [totalScore, setTotalScore] = useState(0);
  const done = step >= questions.length;

  const answer = (label: string, score: number) => {
    const next = step + 1;
    const newTurns: Turn[] = [...turns, { role: "user", text: label, score }];
    setTotalScore((s) => s + score);
    if (next < questions.length) {
      newTurns.push({ role: "bot", text: questions[next].prompt });
    } else {
      const total = totalScore + score;
      const cat = total < 8 ? "Low" : total < 16 ? "Medium" : "High";
      newTurns.push({
        role: "bot",
        text: `Thanks! Based on your answers your risk tolerance is ${cat}. ${
          cat === "Low"
            ? "You prefer capital preservation — safety-tilted portfolios suit you."
            : cat === "Medium"
              ? "You are comfortable with moderate ups and downs for balanced growth."
              : "You can weather volatility in exchange for higher long-term returns."
        }`,
      });
    }
    setTurns(newTurns);
    setStep(next);
  };

  const restart = () => {
    setStep(0);
    setTotalScore(0);
    setTurns([
      {
        role: "bot",
        text: `Hi ${user.name.split(" ")[0]}, I'll ask you 8 quick questions to size up your risk tolerance.`,
      },
      { role: "bot", text: questions[0].prompt },
    ]);
  };

  const cat: "Low" | "Medium" | "High" =
    totalScore < 8 ? "Low" : totalScore < 16 ? "Medium" : "High";

  return (
    <div>
      <PageHeader
        title="Risk Assessment"
        description="A short conversational check to categorise your investment risk profile."
      />

      <Card>
        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
          {turns.map((t, i) => (
            <div key={i} className={`flex ${t.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  t.role === "user" ? "bg-black text-white" : "bg-neutral-100 text-black"
                }`}
              >
                {t.text}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t border-neutral-200 pt-4">
          {!done ? (
            <div className="flex flex-wrap gap-2">
              {questions[step].options.map((o) => (
                <button
                  key={o.label}
                  onClick={() => answer(o.label, o.score)}
                  className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-3 py-1.5 text-xs hover:bg-neutral-50 transition-colors"
                >
                  <Send className="h-3 w-3" /> {o.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <RiskBadge risk={cat} />
              <button
                onClick={restart}
                className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs hover:bg-neutral-50"
              >
                <RotateCcw className="h-3 w-3" /> Restart
              </button>
              <Link
                to="/investment"
                className="inline-flex items-center rounded-lg bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800"
              >
                See investment plan
              </Link>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
