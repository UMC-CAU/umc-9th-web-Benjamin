import { useContext, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const GoogleRedirectHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');

    if (accessToken && refreshToken && auth) {
      auth.login(accessToken, refreshToken);
      navigate('/mypage', { replace: true }); // 로그인 후 마이페이지로 이동
    } else {
      // 토큰이 없거나 에러가 발생한 경우
      alert('Google 로그인에 실패했습니다. 다시 시도해주세요.');
      navigate('/signin', { replace: true });
    }
  }, [searchParams, navigate, auth]);

  return (
    <main className="flex items-center justify-center min-h-screen">
      <p>로그인 처리 중입니다...</p>
    </main>
  );
};

export default GoogleRedirectHandler;
