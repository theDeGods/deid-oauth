import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"


export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    {
      id: "deid",
      name: "de[id]",
      type: "oauth",
      authorization: {
        url: "https://de.xyz/oauth/authorize",
        params: { scope: "wallets:read collections:read dust:read socials:read" }
      },
      checks: ["pkce", "state"],
      token: "https://api.oauth.dustlabs.com/oauth/token",
      userinfo: "https://api.oauth.dustlabs.com/profile",
      client: {
        token_endpoint_auth_method: "client_secret_post"
      },
      clientId: process.env.DEID_CLIENT_ID as string,
      clientSecret: process.env.DEID_CLIENT_SECRET as string,
      profile(response: any) {
        return {
          id: response.profile.id,
          name: response.profile.name,
          image: response.profile.imageUrl,
        }
      },
    }
  ],
  callbacks: {
    authorized({ request, auth }: { request: any; auth: any}) {
      const { pathname } = request.nextUrl
      if (pathname === "/middleware-example") return !!auth
      return true
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
