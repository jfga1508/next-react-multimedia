import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare, hash } from 'bcrypt';
import { sql } from '@vercel/postgres';

const handler = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, req) {
                const response = await sql`
                    SELECT * FROM users WHERE email = ${credentials?.email}
                    `;
                const user = response.rows[0];

                const passwordCompare = await compare(
                    credentials?.password || '',
                    user.password
                );

                if (passwordCompare) {
                    return { id: user.id, email: user.email };
                } else {
                    return null;
                }
            },
        }),
    ],
});
export { handler as GET, handler as POST };
