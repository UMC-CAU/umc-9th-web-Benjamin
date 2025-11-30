import { useState, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchLps } from '../api/lps';
import { useDebounce } from '../hooks/useDebounce';
import { type Lp } from '../lib/types';

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 500);
  const LPs_PER_PAGE = 10;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['lps', { search: debouncedSearch }],
    queryFn: ({ pageParam: cursor }) => fetchLps({
      search: debouncedSearch,
      cursor,
      limit: LPs_PER_PAGE,
    }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: Lp[]) => {
      if (lastPage.length < LPs_PER_PAGE) return undefined;
      const lastItem = lastPage[lastPage.length - 1];
      return lastItem?.id;
    },
    enabled: debouncedSearch.length >= 2,
    staleTime: 1000 * 60, // 1분
  });

  const lps = useMemo(() => data?.pages.flatMap((page) => page) ?? [], [data]);

  return (
    <section className="mt-4 px-4">
      <div className="mb-8">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="검색어를 입력하세요..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {isFetching && !isFetchingNextPage && (
        <p className="text-center mt-12">검색 중...</p>
      )}

      {error && (
        <p className="text-center mt-12 text-red-500">
          오류가 발생했습니다: {error.message}
        </p>
      )}

      {!isFetching && debouncedSearch.length > 0 && lps.length === 0 && (
        <p className="text-center mt-12 text-gray-500">검색 결과가 없습니다.</p>
      )}

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {lps.map((lp: Lp) => (
          <li
            key={lp.id}
            className="overflow-hidden rounded-md cursor-pointer group"
          >
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full h-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {isFetchingNextPage ? '불러오는 중...' : '더 보기'}
          </button>
        </div>
      )}
    </section>
  );
};

export default SearchPage;