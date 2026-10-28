"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "./api";

/** Fetch JSON with optional polling. */
export function useApi<T = any>(path: string | null, opts: { poll?: number } = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(!!path);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    if (!path) return;
    try {
      const d = await api<T>(path);
      if (mounted.current) {
        setData(d);
        setError(null);
      }
    } catch (e: any) {
      if (mounted.current) setError(e.message);
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, [path]);

  useEffect(() => {
    mounted.current = true;
    setLoading(!!path);
    load();
    let t: ReturnType<typeof setInterval> | undefined;
    if (opts.poll) t = setInterval(load, opts.poll);
    return () => {
      mounted.current = false;
      if (t) clearInterval(t);
    };
  }, [load, opts.poll, path]);

  return { data, error, loading, reload: load, setData };
}
