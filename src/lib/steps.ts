const NOUN: Record<string, string> = { input: "field", select: "dropdown", checkbox: "checkbox", link: "link", button: "button" };

function target(s: any): string {
  if (s.label) return `the “${s.label}” ${NOUN[s.kind] || "element"}`;
  const sel: string = s.selector || "";
  const m = sel.match(/name="([^"]+)"/) || sel.match(/text="?([^"]+)"?/) || sel.match(/placeholder="([^"]+)"/);
  if (m) return `“${m[1]}”`;
  return sel ? `\`${sel}\`` : "the page";
}

/** Plain-language sentence for a journey step, used wherever steps are shown. */
export function describeStep(s: any): string {
  if (s.description) return s.description;
  const v = s.value;
  switch (s.action) {
    case "goto": return `Go to ${s.url || v}`;
    case "click": return `Click ${target(s)}`;
    case "fill": return `Type ${s.secret ? "the secret value" : v === "{{email}}" ? "a unique test email" : `“${v}”`} into ${target(s)}`;
    case "select": return `Choose “${v}” in ${target(s)}`;
    case "check": return `Tick ${target(s)}`;
    case "press": return `Press ${v || "Enter"}`;
    case "wait_for": return `Wait until ${target(s)} appears`;
    case "wait": return `Wait ${Math.round((Number(v) || 1000) / 100) / 10} seconds`;
    case "assert_visible": return `Check ${target(s)} is shown`;
    case "assert_not_visible": return `Check ${target(s)} is gone`;
    case "assert_text": return `Check the page shows “${v}”`;
    case "assert_url": return `Check the web address contains “${v}”`;
    case "screenshot": return "Take a screenshot";
    default: return s.action;
  }
}

export const isCheckStep = (s: any) => String(s.action).startsWith("assert");
