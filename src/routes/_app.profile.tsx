import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card } from "@/components/AppLayout";
import { useAppStore, useSelectedUser } from "@/store/app-store";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({
    meta: [
      { title: "Profile — FinWise AI" },
      {
        name: "description",
        content: "View and edit your demo user profile details.",
      },
      { property: "og:title", content: "Profile — FinWise AI" },
      {
        property: "og:description",
        content: "Edit synthetic profile details.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const user = useSelectedUser()!;
  const updateUser = useAppStore((s) => s.updateUser);
  const [form, setForm] = useState(user);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(user);
  }, [user.id]);

  const bind = <K extends keyof typeof form>(key: K) => ({
    value: form[key] as string | number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      const num =
        typeof user[key] === "number" ? Number(v.replace(/[^0-9]/g, "")) || 0 : v;
      setForm((f) => ({ ...f, [key]: num }) as typeof form);
      setSaved(false);
    },
  });

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(user.id, form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <PageHeader
        title="Profile"
        description="Edit synthetic profile details. Changes update this session's state."
      />

      <form onSubmit={save} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="text-sm font-medium mb-4">Personal</div>
          <Field label="Name" {...bind("name")} />
          <Field label="Occupation" {...bind("occupation")} />
          <Field label="Age" type="number" {...bind("age")} />
        </Card>

        <Card>
          <div className="text-sm font-medium mb-4">Finances</div>
          <Field label="Monthly income (₹)" type="number" {...bind("income")} />
          <Field label="Monthly expenses (₹)" type="number" {...bind("expenses")} />
          <Field label="Monthly savings (₹)" type="number" {...bind("savings")} />
        </Card>

        <Card className="md:col-span-2">
          <div className="text-sm font-medium mb-4">Behaviour</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <Field label="Recharge history" {...bind("rechargeHistory")} />
            <Field label="Utility payments" {...bind("utilityPayments")} />
            <Field label="Shopping frequency" {...bind("shoppingFrequency")} />
            <Field label="UPI usage" {...bind("upiUsage")} />
            <Field
              label="Existing investments"
              {...bind("existingInvestments")}
            />
          </div>
        </Card>

        <div className="md:col-span-2 flex items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            Save changes
          </button>
          {saved && (
            <span className="inline-flex items-center gap-1 text-sm text-green-700">
              <Check className="h-4 w-4" /> Saved
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <label className="block mb-3">
      <span className="block text-xs text-neutral-500 mb-1">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
      />
    </label>
  );
}
