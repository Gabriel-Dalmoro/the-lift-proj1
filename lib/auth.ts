// Shared by middleware (edge) and the login route (node): both have Web Crypto.
export const COOKIE_NAME = "lift_access";

export async function accessToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(`the-lift:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
