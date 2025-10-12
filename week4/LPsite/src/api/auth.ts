import axiosInstance from "./axiosInstance";
import { type SignInPayload, type SignInResponse, type SignUpPayload, type SignUpResponse } from "../lib/types";

export const signUp = async (payload: SignUpPayload): Promise<SignUpResponse> => {
  const response = await axiosInstance.post<SignUpResponse>("/v1/auth/signup", payload);
  return response.data;
};

export const signIn = async (payload: SignInPayload): Promise<SignInResponse> => {
  const response = await axiosInstance.post<SignInResponse>("/v1/auth/signin", payload);
  return response.data;
};
