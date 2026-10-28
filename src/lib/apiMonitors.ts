export const MONITOR_STATUS: Record<string, { label: string; tone: string }> = {
  up: { label: "Working", tone: "up" },
  down: { label: "Failing", tone: "down" },
  degraded: { label: "Slow or flaky", tone: "degraded" },
  unknown: { label: "Waiting for first check", tone: "unknown" },
  paused: { label: "Paused", tone: "paused" },
};

export const monitorStatus = (m: any) => MONITOR_STATUS[m.paused ? "paused" : m.status] || MONITOR_STATUS.unknown;

const OPS: Record<string, string> = { equals: "equals", not_equals: "does not equal", contains: "contains", exists: "exists", gt: "is more than", lt: "is less than" };

export function describeAssertion(a: any): string {
  switch (a.type) {
    case "json_path": return a.op === "exists" ? `Response field “${a.path}” exists` : `Response field “${a.path}” ${OPS[a.op] || a.op} “${a.value}”`;
    case "body_contains": return `Response contains “${a.value}”`;
    case "body_not_contains": return `Response does not contain “${a.value}”`;
    case "header": return a.op === "exists" ? `Header “${a.path}” is present` : `Header “${a.path}” ${OPS[a.op] || a.op} “${a.value}”`;
    case "response_time": return `Responds in under ${a.value} ms`;
    default: return `${a.type} ${a.path || ""} ${a.op || ""} ${a.value || ""}`;
  }
}

export function httpMeaning(code?: number | null): string {
  if (!code) return "No response — the server couldn't be reached";
  if (code < 300) return "OK";
  if (code < 400) return "Redirect";
  if (code === 400) return "Bad request — the data sent was rejected";
  if (code === 401) return "Not logged in — the token or key is missing or expired";
  if (code === 403) return "Forbidden — the key doesn't have permission";
  if (code === 404) return "Not found — the address doesn't exist (anymore)";
  if (code === 405) return "Wrong method for this address";
  if (code === 429) return "Too many requests — rate limited";
  if (code >= 500) return "Server error — the backend crashed or is down";
  return `HTTP ${code}`;
}

export function intervalLabel(sec: number): string {
  if (sec < 3600) return `every ${Math.round(sec / 60)} min`;
  if (sec === 3600) return "every hour";
  return `every ${Math.round(sec / 3600)} hours`;
}

export const SAMPLE_CSV = `name,method,url,expected_status,max_response_ms,check_every_minutes,headers,body,must_contain,website
Health check,GET,https://api.example.com/health,200,1000,5,,,ok,
Product list,GET,https://api.example.com/products?page=1,200,2000,15,Accept: application/json,,,example.com
Create lead (test),POST,https://api.example.com/leads,"200,201",,60,Authorization: Bearer YOUR_TEST_TOKEN; Content-Type: application/json,"{""name"":""SiteGuard test"",""email"":""test@example.com""}",,
`;
