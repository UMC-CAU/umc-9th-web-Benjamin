import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLps } from '../api/lps';
import { type Lp, type LpDetail } from '../lib/types';
import LPPostModal from '../components/LPPostModal';

const apiUrl = import.meta.env.VITE_API_URL;

const Home = () => {
  const [selectedLpId, setSelectedLpId] = useState<number | null>(null);
  const [lpDetail, setLpDetail] = useState<LpDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Refactor to useQuery for fetching the list of LPs
  const { data: lps = [], error, isLoading } = useQuery<Lp[], Error>({
    queryKey: ['lps'],
    queryFn: fetchLps,
  });

  useEffect(() => {
    if (selectedLpId === null) {
      setLpDetail(null);
      return;
    }

    const fetchLpDetail = async () => {
      setLoadingDetail(true);
      try {
        // Note: Using fetch here directly as it was, but could be refactored to useQuery as well
        const response = await fetch(`${apiUrl}/v1/lps/${selectedLpId}`);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const responseData = await response.json();
        setLpDetail(responseData.data);
      } catch (error) {
        setDetailError('상세 정보를 불러오는 데 실패했습니다.');
        console.error('Error fetching LP detail:', error);
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchLpDetail();
  }, [selectedLpId]);

  if (isLoading) {
    return <p className="text-center mt-12">로딩 중...</p>;
  }

  if (error) {
    return <p className="text-center mt-12 text-red-500">{error.message}</p>;
  }

  return (
    <section className="mt-4 px-4">
      {lpDetail ? (
        <div>
          <button
            onClick={() => setSelectedLpId(null)}
            className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            뒤로 가기
          </button>
          {loadingDetail && <p>상세 정보 로딩 중...</p>}
          {detailError && <p className="text-red-500">{detailError}</p>}
          {lpDetail && (
            <>
              <img
                src={lpDetail.thumbnail}
                alt={lpDetail.title}
                className="w-full max-w-sm h-auto object-cover rounded-lg mb-4 shadow-lg"
              />
              <h1 className="text-3xl font-bold">{lpDetail.title}</h1>
              <h2 className="text-xl text-gray-600 mb-4">{lpDetail.author?.name}</h2>
              <p className="mb-4">{lpDetail.content}</p>
            </>
          )}
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {lps.map((lp) => (
            <li
              key={lp.id}
              onClick={() => setSelectedLpId(lp.id)}
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