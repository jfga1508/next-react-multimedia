'use client';
import { QueryClient, QueryClientProvider } from 'react-query';
import ContentCategory from './components/contentCategory';

const queryClient = new QueryClient();

export default function Index() {
    return (
        <QueryClientProvider client={queryClient}>
            <Home />
        </QueryClientProvider>
    );
}

export const Home = (params: any) => {
    return (
        <main className='flex min-h-full flex-col items-center p-24'>
            <ContentCategory />
        </main>
    );
};
