import '@/styles/global.css';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Logout from './utils/logout';

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();
    return (
        <html lang='en'>
            <body className='flex flex-col min-h-screen'>
                <nav>
                    {!!session && (
                        <>
                            <Logout />
                            <Link
                                className='ml-3 inline-block btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                href={`/`}
                            >
                                Categories
                            </Link>
                        </>
                    )}
                    {!session && (
                        <>
                            <Link
                                className='inline-block btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                                href={`/login`}
                            >
                                Login
                            </Link>
                            <Link
                                className='ml-3 inline-block btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                href={`/register`}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
                {children}
            </body>
        </html>
    );
}
