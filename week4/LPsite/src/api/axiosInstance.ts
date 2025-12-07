import axios from "axios";

const axiosInstance = axios.create({
  // 필요에 따라 v1을 포함하셔도 됩니다
  baseURL: "https://umc-web.kyeoungwoon.kr/",  //서버 배포 주소
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
