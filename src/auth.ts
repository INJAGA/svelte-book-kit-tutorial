import { SvelteKitAuth, type DefaultSession } from '@auth/sveltekit';
import Auth0 from '@auth/sveltekit/providers/auth0';

declare module '@auth/sveltekit' {
	interface Session {
		accessToken: string;
		idToken: string;
		user: {
			uid: string;
		} & DefaultSession['user'];
	}
}

export const { handle } = SvelteKitAuth({
	providers: [Auth0],
	callbacks: {
		jwt({ token, account, profile, user }) {
			if (account) {
				token.accessToken = account.access_token;
				token.idToken = account.id_token;
			}
			if (profile) {
				token.uid = profile.sub;
			}
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		session({ session, token }) {
			session.accessToken = token.accessToken as string;
			session.idToken = token.idToken as string;
			session.user.id = token.id as string;
			session.user.uid = token.uid as string;
			return session;
		}
	}
});
