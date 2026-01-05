/**
 * Environment helpers.
 * CRA exposes only variables prefixed with REACT_APP_.
 */

// PUBLIC_INTERFACE
export function getEnv(key, fallback = undefined) {
  /** Get an environment variable value with optional fallback. */
  const value = process.env[key];
  if (value === undefined || value === null || value === "") return fallback;
  return value;
}

// PUBLIC_INTERFACE
export function getApiBaseUrl() {
  /** Returns API base URL from env if present, otherwise null. */
  return getEnv("REACT_APP_API_BASE", getEnv("REACT_APP_BACKEND_URL", null));
}

// PUBLIC_INTERFACE
export function getFeatureFlags() {
  /**
   * Parses REACT_APP_FEATURE_FLAGS as a comma-separated list of flags.
   * Example: "newCheckout,debug"
   */
  const raw = getEnv("REACT_APP_FEATURE_FLAGS", "");
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
