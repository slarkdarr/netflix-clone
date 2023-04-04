import { SetStateAction, useCallback, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';

import useMovieList from '@/hooks/useMovieList';
import useInfoModal from '@/hooks/useInfoModal';

const SearchInput = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: movies = [] } = useMovieList();
  const { openModal } = useInfoModal();

  const toggleSearchInput = useCallback(() => {
    setShowSearchInput((current) => !current);
  }, []);

  return (
    <div className="flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
      <div className="flex flex-row items-center gap-2">
        <div
          className={`
            ${showSearchInput ? '' : 'hidden'}
            bg-transparent
            shadow-xl
            border-2
            border-transparent
            rounded
            hover:border-white
            focus:bg-zinc-900/90
          `}
        >
          <input
            className="
              text-white
              bg-transparent
              p-1
              hover:bg-zinc-900/50
              focus:bg-zinc-900/90
            "
            placeholder="Search a film/movie..."
            value={searchQuery}
            onChange={(event: { target: { value: SetStateAction<string> } }) =>
              setSearchQuery(event.target.value)
            }
          />
        </div>
        <div
          className="text-gray-200 hover:text-gray-300 cursor-pointer transition"
          onClick={toggleSearchInput}
        >
          <BsSearch className={`${showSearchInput ? 'hidden' : ''}`} />
          <AiOutlineClose
            className={`${showSearchInput ? '' : 'hidden'}`}
            onClick={() => setSearchQuery('')}
          />
        </div>
      </div>
      <div
        className={`${
          searchQuery && showSearchInput ? '' : 'hidden'
        } bg-black w-56 absolute top-10 left-0 py-5 flex-col border-2 border-gray-800 flex`}
      >
        <div className="flex flex-col gap-4">
          {movies
            .filter((movie: { title: string }) => {
              const searchTerm = searchQuery.toLowerCase();
              const title = movie.title.toLowerCase();

              return searchTerm && title.includes(searchTerm);
            })
            .map((movie: { id: string; title: string }) => (
              <div
                key={movie.id}
                className="px-3 text-center text-white hover:underline"
                onClick={() => openModal(movie.id)}
              >
                {movie.title}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
