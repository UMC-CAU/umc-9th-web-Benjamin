


import { z } from 'zod';





export const SignInSchema = z.object({

  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: '유효하지 않은 이메일 형식입니다.' }),

  password: z.string().min(6, { message: '비밀번호는 최소 6자 이상이어야 합니다.' }),

});



export type TSignInSchema = z.infer<typeof SignInSchema>;





export const SignUpSchema = z.object({

    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: '올바른 이메일 형식을 입력해주세요.' }),

    password: z.string().min(6, { message: '비밀번호는 6자 이상이어야 합니다.' }),

    confirmPassword: z.string(),

    nickname: z.string().min(2, { message: '닉네임은 2자 이상이어야 합니다.' })

})

.refine((data) => data.password === data.confirmPassword, {

    message: "비밀번호가 일치하지 않습니다.",

    path: ["confirmPassword"],

});



export type TSignUpSchema = z.infer<typeof SignUpSchema>;



// API-related types

export interface SignUpPayload {

  name: string;

  email: string;

  bio?: string;

  avatar?: string;

  password: string;

}



export interface User {

  id: number;

  name: string;

  email: string;

  bio: string | null;

  avatar: string | null;

  createdAt: string;

  updatedAt: string;

}



export interface SignUpResponse {

  status: boolean;

  statusCode: number;

  message: string;

  data: User;

}



export interface SignInPayload {

  email: string;

  password: string;

}



export interface SignInResponse {

  status: boolean;

  statusCode: number;

  message: string;

  data: {

    id: number;

    name: string;

    accessToken: string;

    refreshToken: string;

  };

}



export interface Lp {

  id: number;

  title: string;

  content: string;

  author?: { name: string };

  thumbnail: string;

}



export type LpDetail = Lp;

export interface SearchRequestParams {
  search?: string;
  cursor?: number;
  limit?: number;
  order?: 'asc' | 'desc';
}







