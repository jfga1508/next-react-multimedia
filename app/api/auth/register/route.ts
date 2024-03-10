import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        const hashedPassword = await hash(password, 10);

        const response = await sql`
        INSERT INTO users (email,password)
        VALUES (${email}, ${hashedPassword})
        `;
        return NextResponse.json({ message: 'success' });
    } catch (error) {
        return NextResponse.json({ error });
    }
}
