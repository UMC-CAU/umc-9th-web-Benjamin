import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css';

// --- 가상 API 함수 ---
// 실제 서버 API를 흉내 내는 비동기 함수입니다.
// 1.5초의 지연 시간을 가지며, 50% 확률로 데이터 요청에 성공하거나 실패합니다.
const fetchData = async (): Promise<{ message: string }> => {
  // 콘솔에 로그를 남겨 함수 호출 시점을 명확히 보여줍니다.
  console.log('데이터를 가져오는 중...');
  // 1.5초 동안 기다려 실제 네트워크 지연을 시뮬레이션합니다.
  await new Promise(resolve => setTimeout(resolve, 1500));

  // 50% 확률로 성공 또는 실패를 결정합니다.
  if (Math.random() > 0.5) {
    console.log('데이터 가져오기 성공!');
    // 성공 시, 현재 시각이 포함된 메시지를 반환합니다.
    return { message: `성공! 새로운 데이터가 도착했습니다. (시각: ${new Date().toLocaleTimeString()})` };
  } else {
    console.error('데이터 가져오기 실패!');
    // 실패 시, 에러를 발생시켜 useQuery의 에러 처리 로직을 테스트합니다.
    throw new Error('서버에서 데이터를 가져오는 데 실패했습니다.');
  }
};

function App() {
  // queryClient 인스턴스를 가져옵니다. 캐시 무효화 등 다양한 작업을 수행할 수 있습니다.
  const queryClient = useQueryClient();

  // --- useQuery 훅 사용 ---
  // 데이터를 가져오고, 캐싱하며, 상태를 관리하는 핵심 훅입니다.
  const { 
    data,       // 쿼리 성공 시 가져온 데이터
    error,      // 쿼리 실패 시 발생한 에러 객체
    isLoading,  // 첫 데이터 로딩 상태 (캐시가 없을 때 true)
    isError,    // 쿼리가 에러 상태일 때 true
    isFetching, // 데이터 가져오는 중인 상태 (백그라운드 포함 모든 경우에 true)
    refetch,    // 쿼리를 수동으로 다시 실행하는 함수
  } = useQuery({
    // [쿼리 키] (queryKey)
    // - 데이터를 식별하는 고유한 키입니다.
    // - 이 키를 기준으로 데이터를 캐싱합니다.
    // - 배열 형태로 작성하며, 직렬화가 가능해야 합니다.
    queryKey: ['mockData'],

    // [쿼리 함수] (queryFn)
    // - 데이터를 가져오는 비동기 함수입니다. (Promise를 반환해야 함)
    // - 위에서 정의한 fetchData 함수를 사용합니다.
    queryFn: fetchData,

    // [재시도] (retry)
    // - 쿼리 함수가 실패했을 때 자동으로 재시도하는 횟수입니다.
    // - `retry: 2`는 최초 1번 + 재시도 2번 = 총 3번 시도함을 의미합니다.
    retry: 2,

    // [재시도 지연] (retryDelay)
    // - 재시도 간의 시간 간격을 설정합니다.
    // - 함수를 사용하면 재시도 횟수(attemptIndex)에 따라 지연 시간을 동적으로 설정할 수 있습니다.
    // - 여기서는 1초, 2초 간격으로 재시도합니다.
    retryDelay: (attemptIndex) => (attemptIndex + 1) * 1000,

    // [데이터 신선도] (staleTime)
    // - 데이터가 '신선한(fresh)' 상태로 유지되는 시간입니다. (기본값: 0)
    // - 이 시간 동안에는 데이터가 있어도 네트워크 요청을 다시 보내지 않습니다.
    // - 10초로 설정했으므로, 10초 내에는 컴포넌트가 다시 렌더링되어도 캐시된 데이터를 즉시 보여줍니다.
    staleTime: 10 * 1000,

    // [가비지 컬렉션] (gcTime)
    // - 쿼리가 비활성(inactive) 상태일 때 캐시에서 데이터가 유지되는 시간입니다. (기본값: 5분)
    // - 화면에 사용되지 않는 쿼리는 비활성 상태가 되며, gcTime이 지나면 캐시에서 제거됩니다.
    // - staleTime보다 항상 길게 설정해야 합니다.
    gcTime: 60 * 1000, // 1분
  });

  return (
    <>
      <h1>useQuery 핵심 기능 실습</h1>
      <div className="card">
        <div className="status">
          {/* [로딩 상태 UI] */}
          {/* isLoading: 캐시된 데이터 없이 첫 로딩 중일 때만 true가 됩니다. */}
          {isLoading && <p>데이터를 불러오는 중입니다... (초기 로딩)</p>}
          
          {/* [백그라운드 패칭 UI] */}
          {/* isFetching: isLoading과 달리, 백그라운드에서 데이터를 가져올 때도 true가 됩니다. */}
          {/* staleTime이 지난 후 포커싱, 재연결 등으로 데이터를 다시 가져올 때 이 상태를 볼 수 있습니다. */}
          {isFetching && !isLoading && <p>새로운 데이터를 가져오는 중... (백그라운드 업데이트)</p>}

          {/* [에러 상태 UI] */}
          {/* isError: 쿼리가 최종적으로 실패 상태가 되었을 때 true가 됩니다. */}
          {isError && <p>오류 발생: {error.message}</p>}

          {/* [성공 상태 UI] */}
          {/* data: 쿼리가 성공하면 여기에 데이터가 담깁니다. */}
          {data && (
            <div>
              <h3>✅ 성공적으로 가져온 데이터:</h3>
              <p>{data.message}</p>
            </div>
          )}
        </div>
        
        <div className="buttons">
          {/* [수동 리패치] */}
          {/* refetch 함수를 호출하여 사용자가 원할 때 데이터를 다시 가져올 수 있습니다. */}
          <button onClick={() => refetch()} disabled={isFetching}>
            {isFetching ? '가져오는 중...' : '데이터 다시 가져오기'}
          </button>

          {/* [캐시 무효화] */}
          {/* invalidateQueries: 특정 쿼리 키의 캐시를 'stale' 상태로 만듭니다. */}
          {/* 이렇게 하면 해당 쿼리가 다시 필요해질 때 (예: 화면에 다시 보일 때) 무조건 데이터를 새로 가져옵니다. */}
          <button onClick={() => queryClient.invalidateQueries({ queryKey: ['mockData'] })}>
            캐시 무효화
          </button>
        </div>
      </div>
      {/* React Query Devtools: 캐시 상태, 데이터, 쿼리 상태를 시각적으로 보여주는 개발 도구입니다. */}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
