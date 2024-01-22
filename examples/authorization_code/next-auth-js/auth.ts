import NextAuth from "next-auth"

enum ProviderType {
  oauth = "oauth",
}

enum ProviderChecks {
  pkce = "pkce",
  state = "state",
}

export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    {
      id: "deid",
      name: "de[id]",
      type: ProviderType.oauth,
      authorization: {
        url: "https://client-m8zn-feat-oauth.zeet-dust-labs.zeet.app/oauth/authorize",
        params: { scope: "wallets:read collections:read dust:read socials:read" }
      },
      checks: [ProviderChecks.pkce, ProviderChecks.state],
      token: "https://oauth-2wdo.dl-staging.zeet.app/oauth/token",
      userinfo: "https://oauth-2wdo.dl-staging.zeet.app/profile/",
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
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
