const readEnv = (name: string): string => {
  const value = import.meta?.env?.[name];
  return typeof value === "string" ? value.trim() : "";
};

export const ENV_JA_OAUTH_CLIENT_ID: string = readEnv("VITE_JA_OAUTH_CLIENT_ID");
export const ENV_JA_OAUTH_REDIRECT_URL: string = readEnv("VITE_JA_OAUTH_REDIRECT_URL");
