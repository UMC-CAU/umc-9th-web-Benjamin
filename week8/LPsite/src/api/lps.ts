import axiosInstance from './axiosInstance';
import { type Lp, type SearchRequestParams } from '../lib/types';

export interface LpCreationData {
  title: string;
  content: string;
  tags: string[];
}

/**
 * LP 목록 조회 및 검색 API (커서 기반 페이지네이션)
 * @param params.search 검색어
 * @param params.cursor 이전 페이지의 마지막 아이템 ID
 * @param params.limit 한 번에 불러올 개수
 * @param params.order 정렬 순서
 */
export const fetchLps = async (params: SearchRequestParams): Promise<Lp[]> => {
  const response = await axiosInstance.get('/lps', {
    params,
  });
  // NOTE: Based on previous analysis, API data is deeply nested.
  // This might need adjustment if the new endpoint has a different structure.
  return response.data.data.data;
};

// LP 생성 API
export const createLp = async (lpData: LpCreationData): Promise<Lp> => {
  const response = await axiosInstance.post('/lps', lpData);
  return response.data.data;
};
