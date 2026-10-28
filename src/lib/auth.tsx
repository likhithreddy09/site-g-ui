"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api, storage } from "./api";

export type WorkspaceRef = { id: string; name: string; role: "owner" | "admin" | "member" | "client"; plan: string };
export type User = { id: string; email: string; name?: string };

type AuthState = {
  ready: boolean;
  user: User | null;
  workspaces: WorkspaceRef[];
  workspace: WorkspaceRef | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; name: string; workspace_name: string }) => Promise<void>;
  logout: () => void;
  switchWorkspace: (id: string) => void;
  refresh: () => Promise<void>;
  can: (role: "member" | "admin" | "owner") => boolean;
};

const Ctx = createContext<AuthState | null>(null);
const RANK = { client: 0, member: 1, admin: 2, owner: 3 };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [workspaces, setWorkspaces] = useState<WorkspaceRef[]>([]);
  const [wsId, setWsId] = useState<string | null>(null);

  const apply = useCallback((u: User, list: WorkspaceRef[]) => {
    setUser(u);
    setWorkspaces(list);
    const current = list.find((w) => w.id === storage.workspace) ? storage.workspace : list[0]?.id ?? null;
    storage.workspace = current;
    setWsId(current);
  }, []);

  const refresh = useCallback(async () => {
    if (!storage.token) {
      setReady(true);
      return;
    }
    try {
      const me = await api<{ user: User; workspaces: WorkspaceRef[] }>("/api/auth/me");
      apply(me.user, me.workspaces);
    } catch {
      storage.token = null;
    } finally {
      setReady(true);
    }
  }, [apply]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = async (email: string, password: string) => {
    const s = await api<any>("/api/auth/login", { method: "POST", body: { email, password }, auth: false });
    storage.token = s.token;
    apply(s.user, s.workspaces);
  };

  const register = async (data: { email: string; password: string; name: string; workspace_name: string }) => {
    const s = await api<any>("/api/auth/register", { method: "POST", body: data, auth: false });
    storage.token = s.token;
    apply(s.user, s.workspaces);
  };

  const logout = () => {
    storage.token = null;
    storage.workspace = null;
    setUser(null);
    setWorkspaces([]);
    location.href = "/login";
  };

  const switchWorkspace = (id: string) => {
    storage.workspace = id;
    setWsId(id);
    location.href = "/app";
  };

  const workspace = workspaces.find((w) => w.id === wsId) || null;
  const can = (role: "member" | "admin" | "owner") => !!workspace && RANK[workspace.role] >= RANK[role];

  return (
    <Ctx.Provider value={{ ready, user, workspaces, workspace, login, register, logout, switchWorkspace, refresh, can }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth outside AuthProvider");
  return c;
}
