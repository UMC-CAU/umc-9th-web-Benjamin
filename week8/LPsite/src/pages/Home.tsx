import { useState, useEffect, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchLps } from '../api/lps';
import { useThrottle } from '../hooks/useThrottle';
import { type Lp } from '../lib/types';
import LPPostModal from '../components/LPPostModal';

const Home = () => {
  const [selectedLp, setSelectedLp] = useState<Lp | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const LPs_PER_PAGE = 10;

  // 1. Throttle 훅과 스크롤 State 추가
  const [scrollY, setScrollY] = useState(0);
  const throttledScrollY = useThrottle(scrollY, 1000);

  // 2. useQuery -> useInfiniteQuery로 변경
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['lps', {}], // 홈 화면의 LP 목록을 위한 고유 키
    queryFn: ({ pageParam: cursor }) => fetchLps({ cursor, limit: LPs_PER_PAGE }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: Lp[]) => {
      if (lastPage.length < LPs_PER_PAGE) return undefined;
      const lastItem = lastPage[lastPage.length - 1];
      return lastItem?.id;
    },
    staleTime: 1000 * 60,
  });

  // 3. 스크롤 이벤트 리스너 등록/해제
  useEffect(() => {
    // 상세 보기 중에는 스크롤 이벤트 무시
    if (selectedLp) return;

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedLp]);

  // 4. 스크롤 위치에 따라 다음 페이지 로드
  useEffect(() => {
    if (selectedLp) return; // 상세 보기 중에는 실행 안함

    const isAtBottom = window.innerHeight + throttledScrollY >= document.documentElement.scrollHeight - 100;
    if (isAtBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [throttledScrollY, hasNextPage, isFetchingNextPage, fetchNextPage, selectedLp]);

  const lps = useMemo(() => data?.pages.flatMap((page) => page) ?? [], [data]);

  // 5. 상세보기 로직 최적화 (별도 fetch 제거)
  const handleLpClick = (lpId: number) => {
    const foundLp = lps.find(lp => lp.id === lpId);
    if (foundLp) {
      setSelectedLp(foundLp);
    }
  };

  if (isLoading) {
    return <p className="text-center mt-12">로딩 중...</p>;
  }

  if (error) {
    return <p className="text-center mt-12 text-red-500">{error.message}</p>;
  }

  return (
    <section className="mt-4 px-4 pb-12">
      {selectedLp ? (
        <div>
          <button
            onClick={() => setSelectedLp(null)}
            className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            뒤로 가기
          </button>
          <>
            <img
              src={selectedLp.thumbnail}
              alt={selectedLp.title}
              className="w-full max-w-sm h-auto object-cover rounded-lg mb-4 shadow-lg"
            />
            <h1 className="text-3xl font-bold">{selectedLp.title}</h1>
            <h2 className="text-xl text-gray-600 mb-4">{selectedLp.author?.name}</h2>
            <p className="mb-4">{selectedLp.content}</p>
          </>
        </div>
      ) : (
        <>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {lps.map((lp) => (
              <li
                key={lp.id}
                onClick={() => handleLpClick(lp.id)}
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
          <div className="text-center py-6">
            {isFetchingNextPage && (
              <p className="text-blue-500">Loading more...</p>
            )}
            {!hasNextPage && lps.length > 0 && (
              <p className="text-gray-500">모든 결과를 불러왔습니다.</p>
            )}
          </div>
        </>
      )}

      <button
        className="fixed bottom-8 right-8 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg hover:bg-blue-600 transition-colors duration-300"
        onClick={() => setIsModalOpen(true)}
      >
        +
      </button>

      <LPPostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Home;