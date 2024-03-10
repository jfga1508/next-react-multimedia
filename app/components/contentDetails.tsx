'use client';

import { Videos } from 'app/interfaces/videos';
import { useQuery } from 'react-query';
import youtubeID from 'app/hooks/youtubeID';
import axios from 'axios';
import { LoaderHTML } from '../utils/loader';

export const ContentDetails = ({ videoid }: { videoid: Number }) => {
    const { isFetching, error, data } = useQuery(
        'details',
        () =>
            axios
                .get(`/api/videos/details?videoid=${videoid}`)
                .then((response) => response.data.response.rows),
        { enabled: true }
    );

    if (isFetching) return <LoaderHTML />;
    if (error) return 'An error has occurred: ' + error;

    return (
        <div className='grid grid-cols-4 grid-rows-3 gap-5 w-full'>
            {data &&
                data.map((video: Videos, index: number) => {
                    const videoId = youtubeID(video.url);
                    const url = `//www.youtube.com/embed/${videoId}`;

                    return (
                        <>
                            <div
                                className='col-span-4 row-span-4 md:col-span-3 md:row-span-3'
                                key={index}
                            >
                                <iframe
                                    className='h-[400px] lg:h-[500px] xl:h-[600px]'
                                    width='100%'
                                    src={url}
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className='col-start-1 md:col-start-4 col-span-4 md:col-span-1'>
                                <h1 className='font-bold mb-2 lg:text-2xl xl:text-3xl'>
                                    {video.title}
                                </h1>
                                <p className='mb-1'>
                                    URL:{' '}
                                    <a href={video.url} target='_blank'>
                                        {video.url}
                                    </a>
                                </p>
                                <p className='mb-1'>Description: Coming soon</p>
                            </div>
                        </>
                    );
                })}
        </div>
    );
};
