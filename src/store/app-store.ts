import { create } from "zustand";
import { demoUsers, type DemoUser } from "@/data/users";

interface AppState {
  selectedUserId: string | null;
  users: DemoUser[];
  selectUser: (id: string) => void;
  updateUser: (id: string, patch: Partial<DemoUser>) => void;
  getSelected: () => DemoUser | null;
}

export const useAppStore = create<AppState>((set, get) => ({
  selectedUserId: null,
  users: demoUsers,
  selectUser: (id) => set({ selectedUserId: id }),
  updateUser: (id, patch) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...patch } : u)),
    })),
  getSelected: () => {
    const { users, selectedUserId } = get();
    return users.find((u) => u.id === selectedUserId) ?? null;
  },
}));

export function useSelectedUser(): DemoUser | null {
  const users = useAppStore((s) => s.users);
  const id = useAppStore((s) => s.selectedUserId);
  return users.find((u) => u.id === id) ?? null;
}
