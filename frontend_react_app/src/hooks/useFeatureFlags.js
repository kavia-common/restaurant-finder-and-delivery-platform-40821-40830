import { useMemo } from "react";
import { getFeatureFlags } from "../utils/env";

// PUBLIC_INTERFACE
export function useFeatureFlags() {
  /** Hook returning a Set of enabled feature flags. */
  return useMemo(() => new Set(getFeatureFlags()), []);
}
