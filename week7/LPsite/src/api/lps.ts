import axiosInstance from './axiosInstance';
import { type Lp } from '../lib/types'; // Assuming you have this type defined

export interface LpCreationData {
  title: string;
  content: string;
  tags: string[];
}

// 1. LP 목록 조회 API
export const fetchLps = async (): Promise<Lp[]> => {
  const response = await axiosInstance.get('/lps');
  // The actual data is nested in response.data.data.data
  return response.data.data.data;
};

// 2. LP 생성 API
export const createLp = async (lpData: LpCreationData): Promise<Lp> => {
  const response = await axiosInstance.post('/lps', lpData);
  return response.data.data;
};
