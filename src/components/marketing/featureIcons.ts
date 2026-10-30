import { Activity, Bug, FileBarChart, Globe, ListChecks, ScanEye, Search, ShieldCheck, type LucideIcon } from "lucide-react";

export const FEATURE_ICONS: Record<string, LucideIcon> = {
  "uptime-monitoring": Activity,
  "ssl-domain-monitoring": ShieldCheck,
  "visual-regression-testing": ScanEye,
  "form-journey-testing": ListChecks,
  "api-monitoring": Globe,
  "javascript-error-monitoring": Bug,
  "seo-audit": Search,
  "client-reports": FileBarChart,
};
