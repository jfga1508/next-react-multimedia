import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
    try {
        const videoid = `${
            request.nextUrl.searchParams.get('videoid') as string
        }`;

        const response = await sql`SELECT * FROM videos 
            WHERE videoid = ${videoid}`;
        return NextResponse.json({ message: 'success', response });
    } catch (error) {
        return NextResponse.json({ error });
    }
}
