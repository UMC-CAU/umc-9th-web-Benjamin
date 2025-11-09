import { useState, useEffect } from 'react';

// 1. Lp 인터페이스에 thumbnail 필드 추가 (필수)
interface Lp {
  id: number;
  title: string;
  content: string;
  author?: { name: string };
  thumbnail: string; // <-- 썸네일 이미지 URL 필드
}

// 상세 정보 인터페이스 (Lp를 상속하므로 thumbnail 자동 포함)
interface LpDetail extends Lp {
  // tracklist는 백엔드에 없으므로 제거
}

const apiUrl = import.meta.env.VITE_API_URL;

const Home = () => {
  const [lps, setLps] = useState<Lp[]>([]);
  const [selectedLpId, setSelectedLpId] = useState<number | null>(null);
  const [lpDetail, setLpDetail] = useState<LpDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!apiUrl) {
      console.error('VITE_API_URL is not defined. Please check your .env file.');
      setError('API URL이 설정되지 않았습니다. .env 파일을 확인해주세요.');
      setLoading(false);
      return;
    }

    const fetchLps = async () => {
      try {
        const response = await fetch(`${apiUrl}/v1/lps`);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const responseData = await response.json();
        setLps(responseData.data.data);
      } catch (error) {
        setError('데이터를 불러오는 데 실패했습니다.');
        console.error('Error fetching LPs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLps();
  }, []);

  useEffect(() => {
    if (selectedLpId === null) {
      setLpDetail(null);
      return;
    }

    const fetchLpDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}/v1/lps/${selectedLpId}`);
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const responseData = await response.json();
        setLpDetail(responseData.data);
      } catch (error) {
        setError('상세 정보를 불러오는 데 실패했습니다.');
        console.error('Error fetching LP detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLpDetail();
  }, [selectedLpId]);

  if (loading && !lpDetail) {
    return <p className="text-center mt-12">로딩 중...</p>;
  }

  if (error) {
    return <p className="text-center mt-12 text-red-500">{error}</p>;
  }

  return (
    // 2. 전체 레이아웃을 스크린샷과 유사하게 수정
    // (참고: 헤더, 사이드바는 별도 컴포넌트이므로 여기서는 메인 콘텐츠 영역만 구현)
    <section className="mt-4 px-4">
      {lpDetail ? (
        // --- 상세 뷰 (이전과 동일) ---
        <div>
          <button
            onClick={() => setSelectedLpId(null)}
            className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            뒤로 가기
          </button>
          
          {/* 상세 뷰에도 썸네일 이미지를 크게 표시할 수 있습니다. */}
          <img
            src={lpDetail.thumbnail}
            alt={lpDetail.title}
            className="w-full max-w-sm h-auto object-cover rounded-lg mb-4 shadow-lg"
          />
          <h1 className="text-3xl font-bold">{lpDetail.title}</h1>
          <h2 className="text-xl text-gray-600 mb-4">{lpDetail.author?.name}</h2>
          <p className="mb-4">{lpDetail.content}</p>
        </div>
      ) : (
        
        // --- 목록 뷰 (스크린샷처럼 변경된 부분) ---

        // 3. 'LP 목록' h1 태그 제거 (스크린샷에 없음)
        
        // 4. ul을 그리드로 변경 (스크린샷은 5열이므로 lg:grid-cols-5 적용)
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {lps.map((lp) => (
            <li
              key={lp.id}
              onClick={() => setSelectedLpId(lp.id)}
              // 5. li 스타일 변경: 카드 스타일 제거, 호버 그룹 설정
              className="overflow-hidden rounded-md cursor-pointer group"
            >
              {/* 6. 텍스트(title, content) 제거, <img>만 남김 */}
              <img
                src={lp.thumbnail}
                alt={lp.title}
                // 7. 이미지 스타일: 정사각형, object-cover, 호버 시 확대 효과
                className="w-full h-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Home;