import { useState, useEffect, useRef } from 'react';

/**
 * 지정된 delay 시간 동안 값의 업데이트를 제한하는 Throttle 훅.
 * delay 간격으로 값이 변경될 때만 업데이트된 값을 반환합니다.
 * @param value 쓰로틀을 적용할 값
 * @param delay 지연 시간 (밀리초). 기본값 1000ms.
 * @returns 쓰로틀이 적용된 값
 */
export function useThrottle<T>(value: T, delay: number = 1000): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastUpdated = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      const now = Date.now();
      // delay 시간이 지났는지 확인하고 값을 업데이트
      if (now - lastUpdated.current >= delay) {
        lastUpdated.current = now;
        setThrottledValue(value);
      }
    }, delay - (Date.now() - lastUpdated.current)); // 남은 시간만큼 타이머 설정

    // 컴포넌트 언마운트 또는 값 변경 시 타이머 정리
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return throttledValue;
}
