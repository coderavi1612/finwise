import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAppStore } from "@/store/app-store";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Choose a demo user — FinWise AI" },
      {
        name: "description",
        content: "Pick one of ten synthetic user profiles to explore the FinWise AI experience.",
      },
      { property: "og:title", content: "Choose a demo user — FinWise AI" },
      {
        property: "og:description",
        content: "Ten synthetic profiles to explore FinWise AI.",
      },
    ],
  }),
  component: DemoPage,
});

function DemoPage() {
  const users = useAppStore((s) => s.users);
  const selectUser = useAppStore((s) => s.selectUser);
  const navigate = useNavigate();

  const pick = (id: string) => {
    selectUser(id);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-black"
        >
          <ArrowLeft className="h-3 w-3" /> Back
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Choose a demo user</h1>
        <p className="mt-2 text-sm text-neutral-500 max-w-2xl">
          Each profile carries realistic synthetic data across income, spending, and digital
          behaviour. Every screen in the app updates based on your selection.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((u) => (
            <div key={u.id} className="rounded-2xl border border-neutral-200 p-5 flex flex-col">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-medium">
                  {u.avatar}
                </div>
                <div>
                  <div className="font-medium">{u.name}</div>
                  <div className="text-xs text-neutral-500">
                    {u.occupation} · Age {u.age}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-xs text-neutral-500">Monthly income</div>
              <div className="text-lg font-semibold">₹{u.income.toLocaleString("en-IN")}</div>
              <button
                onClick={() => pick(u.id)}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-black px-3 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
              >
                Select User <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
