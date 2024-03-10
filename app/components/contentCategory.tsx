'use client';

import { useQuery } from 'react-query';
import { LoaderHTML } from '../utils/loader';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ContentDetails } from './contentDetails';
import { Videos } from 'app/interfaces/videos';
import { Categories } from 'app/interfaces/categories';
import categories from '../data/categories.json';
import youtubeID from 'app/hooks/youtubeID';

export default function ContentCategory() {
    const [categoryID, setcategoryID] = useState<Number | null>();
    const [detailsID, setdetailsID] = useState<Number | null>();
    const { isFetching, error, data, refetch } = useQuery(
        'videos',
        () =>
            axios
                .get(`/api/videos/list?categoryid=${categoryID}`)
                .then((response) => response.data.response.rows),
        { enabled: false }
    );

    useEffect(() => {
        if (categoryID) refetch();
    }, [categoryID, refetch]);

    if (isFetching) return <LoaderHTML />;
    if (error) return 'An error has occurred: ' + error;

    const detailsHandleClick = (videoid: Number) => {
        setdetailsID(videoid);
    };

    const categoryHandleClick = (categoryid: Number) => {
        setdetailsID(null);
        setcategoryID(categoryid);
    };

    return (
        <>
            <div className='flex flex-wrap -m-4 text-center mb-5 w-full'>
                {categories &&
                    categories.map((category: Categories) => (
                        <div
                            className='p-4 md:w-1/5 sm:w-1/2 w-full'
                            key={category.categoryid}
                            onClick={() =>
                                categoryHandleClick(category.categoryid)
                            }
                        >
                            <div className='cursor-pointer border-2 border-gray-600 px-3 py-6 rounded-lg transform transition duration-500 hover:scale-110'>
                                <h2 className='title-font font-medium lg:text-2xl xl:text-3xl text-gray-900'>
                                    {category.title}
                                </h2>
                            </div>
                        </div>
                    ))}
            </div>
            {detailsID ? (
                <ContentDetails videoid={detailsID} />
            ) : (
                <div className='flex flex-wrap gap-5'>
                    {data &&
                        data.map((video: Videos, index: Number) => {
                            const videoId = youtubeID(video.url);
                            const url = `//www.youtube.com/embed/${videoId}`;

                            return (
                                <div key={video.videoid}>
                                    <iframe
                                        width='400'
                                        height='300'
                                        src={url}
                                        allowFullScreen
                                    ></iframe>
                                    <h3
                                        className='gap-2 py-2 cursor-pointer font-bold flex justify-between text-2x1'
                                        onClick={() =>
                                            detailsHandleClick(video.videoid)
                                        }
                                    >
                                        <span>{video.title}</span>
                                        <span>View details &raquo;</span>
                                    </h3>
                                </div>
                            );
                        })}
                </div>
            )}
        </>
    );
}
