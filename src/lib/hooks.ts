"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "./api";

type LoadMode = "replace" | "soft";

/** Fetch JSON with optional polling.
 *  - First load / empty → full `loading` skeleton
 *  - Path/filter change with existing data → `refreshing` (keep rows, show Updating…)
 *  - `reload()` → soft refresh
 *  - Poll → soft (silent-ish) refresh
 */
export function useApi<T = any>(path: string | null, opts: { poll?: number } = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(!!path);
  const [refreshing, setRefreshing] = useState(false);
  const mounted = useRef(true);
  const pathRef = useRef<string | null | undefined>(undefined);
  const dataRef = useRef<T | null>(null);
  dataRef.current = data;

  const load = useCallback(async (mode: LoadMode = "replace") => {
    if (!path) return;
    if (mode === "soft") setRefreshing(true);
    else {
      setLoading(true);
      setRefreshing(false);
    }
    try {
      const d = await api<T>(path);
      if (mounted.current) {
        setData(d);
        setError(null);
      }
    } catch (e: any) {
      if (mounted.current) setError(e.message);
    } finally {
      if (mounted.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, [path]);

  useEffect(() => {
    mounted.current = true;
    if (!path) {
      setData(null);
      setLoading(false);
      setRefreshing(false);
      setError(null);
      pathRef.current = path;
      return;
    }

    const prev = pathRef.current;
    pathRef.current = path;
    const changed = prev !== path;
    const hasData = dataRef.current != null;

    if (changed && hasData) {
      // Tab / filter switch — keep previous content, show Updating…
      load("soft");
    } else {
      if (changed) {
        setData(null);
        setError(null);
      }
      load("replace");
    }

    let t: ReturnType<typeof setInterval> | undefined;
    if (opts.poll) t = setInterval(() => load("soft"), opts.poll);
    return () => {
      mounted.current = false;
      if (t) clearInterval(t);
    };
  }, [load, opts.poll, path]);

  const reload = useCallback(() => load("soft"), [load]);

  return { data, error, loading, refreshing, reload, setData };
}
