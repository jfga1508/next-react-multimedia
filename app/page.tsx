import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import Index from './home';

export default async function IndexPage() {
    const session = await getServerSession();

    if (!session) {
        redirect('/login');
    }

    return <Index />;
}
