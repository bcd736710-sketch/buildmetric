import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { loginIpHash, verifyAdminPassword, verifyAdminUsername } from "@/lib/auth/credentials";
import { clearLoginAttempts, isLoginAllowed, recordFailedLogin } from "@/lib/auth/login-attempts";

const sessionMaxAge = 8 * 60 * 60;

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt", maxAge: sessionMaxAge },
  jwt: { maxAge: sessionMaxAge },
  pages: { signIn: "/admin/login" },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-authjs.session-token" : "authjs.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: sessionMaxAge,
      },
    },
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        const username = typeof credentials?.username === "string" ? credentials.username.slice(0, 256) : "";
        const password = typeof credentials?.password === "string" ? credentials.password.slice(0, 1024) : "";

        try {
          const ipHash = loginIpHash(request);
          if (!await isLoginAllowed(ipHash)) return null;

          const [usernameMatches, passwordMatches] = await Promise.all([
            Promise.resolve(verifyAdminUsername(username)),
            verifyAdminPassword(password),
          ]);
          if (!usernameMatches || !passwordMatches) {
            await recordFailedLogin(ipHash);
            return null;
          }

          await clearLoginAttempts(ipHash);
          return { id: "admin", name: username };
        } catch {
          return null;
        }
      },
    }),
  ],
});
