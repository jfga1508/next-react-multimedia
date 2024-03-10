import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
    try {
        const categoryid = `${
            request.nextUrl.searchParams.get('categoryid') as string
        }`;

        const response = await sql`SELECT * FROM videos 
            WHERE categoryid = ${categoryid}`;
        return NextResponse.json({ message: 'success', response });
    } catch (error) {
        return NextResponse.json({ error });
    }
}
