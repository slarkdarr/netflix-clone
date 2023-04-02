import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import useMovie from '@/hooks/useMovie';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);

  return (
    <>
      <Head>
        <title>Watching: {data?.title}</title>
        <meta
          name="description"
          content="Nflix Clone Web App (for personal project purpose)"
        />
      </Head>
      <div className="h-screen w-screen bg-black">
        <nav
          className="
          fixed
          w-full
          p-4
          z-10
          flex
          flex-row
          items-center
          gap-8
          bg-black
          bg-opacity-70
        "
        >
          <AiOutlineArrowLeft
            className="text-white text-xl md:text-2xl lg:text-3xl cursor-pointer"
            onClick={() => router.push('/')}
          />
          <p className="text-white text-xl md:text-3xl font-bold">
            <span className="font-light">Watching: </span>
            {data?.title}
          </p>
        </nav>
        <video
          autoPlay
          controls
          className="h-full w-full"
          src={data?.videoUrl}
        ></video>
      </div>
    </>
  );
};

export default Watch;
