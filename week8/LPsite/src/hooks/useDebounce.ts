import { useState, useEffect } from 'react';

/**
 * 사용자 입력이 끝난 후 일정 시간이 지나면 값을 반환하는 디바운스 훅
 * @param value 디바운스할 값
 * @param delay 지연 시간 (밀리초)
 * @returns 디바운스된 값
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 값이 변경된 후 delay 만큼의 시간이 지나면 debouncedValue를 업데이트
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 다음 effect가 실행되기 전에 이전 타이머를 정리
    // 컴포넌트가 unmount될 때도 타이머가 정리됨
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // value나 delay가 변경될 때만 effect를 다시 실행

  return debouncedValue;
}
