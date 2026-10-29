export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://site-g-backend-production.up.railway.app";

export class ApiError extends Error {
  status: number;
  code: string;
  providerCode?: string;
  details?: Record<string, unknown>;
  constructor(message: string, status: number, code: string, extra?: Record<string, unknown>) {
    super(message);
    this.status = status;
    this.code = code;
    this.providerCode = typeof extra?.provider_code === "string" ? extra.provider_code : undefined;
    this.details = extra;
  }

  /** Message + error code for toasts / banners. */
  display() {
    const bits = [this.message];
    if (this.code) bits.push(`Error code: ${this.code}`);
    if (this.providerCode) bits.push(`Provider: ${this.providerCode}`);
    if (this.status) bits.push(`HTTP ${this.status}`);
    return bits.join(" · ");
  }
}


const TOKEN_KEY = "sg_token";
const WS_KEY = "sg_workspace";

export const storage = {
  get token() {
    return typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY);
  },
  set token(v: string | null) {
    if (v) localStorage.setItem(TOKEN_KEY, v);
    else localStorage.removeItem(TOKEN_KEY);
  },
  get workspace() {
    return typeof window === "undefined" ? null : localStorage.getItem(WS_KEY);
  },
  set workspace(v: string | null) {
    if (v) localStorage.setItem(WS_KEY, v);
    else localStorage.removeItem(WS_KEY);
  },
};

type Opts = { method?: string; body?: unknown; auth?: boolean };

export async function api<T = any>(path: string, opts: Opts = {}): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (opts.auth !== false) {
    if (storage.token) headers.Authorization = `Bearer ${storage.token}`;
    if (storage.workspace) headers["X-Workspace-Id"] = storage.workspace;
  }
  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: opts.method || (opts.body ? "POST" : "GET"),
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ApiError("Cannot reach the Watchfront API. Is the backend running?", 0, "network");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 && typeof window !== "undefined" && opts.auth !== false) {
      storage.token = null;
      if (!location.pathname.startsWith("/login")) location.href = "/login?expired=1";
    }
    const { error, code, ...extra } = data || {};
    throw new ApiError(
      error || `Request failed (${res.status})`,
      res.status,
      code || "error",
      extra,
    );
  }
  return data as T;
}

export function formatApiError(e: unknown, fallback = "Something went wrong") {
  if (e instanceof ApiError) return e.display();
  if (e instanceof Error && e.message) return e.message;
  return fallback;
}


export const get = <T = any>(p: string) => api<T>(p);
export const post = <T = any>(p: string, body: unknown = {}) => api<T>(p, { method: "POST", body });
export const patch = <T = any>(p: string, body: unknown = {}) => api<T>(p, { method: "PATCH", body });
export const put = <T = any>(p: string, body: unknown = {}) => api<T>(p, { method: "PUT", body });
export const del = <T = any>(p: string) => api<T>(p, { method: "DELETE" });
