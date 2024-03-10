import { getServerSession } from 'next-auth';
import Form from './form';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
    let session = await getServerSession();

    if (session) {
        redirect('/');
    }

    return <Form />;
}
