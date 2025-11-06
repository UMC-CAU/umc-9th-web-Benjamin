
import { useContext } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { SignInSchema, type TSignInSchema } from '../lib/types';
import { signIn } from '../api/auth';
import { AuthContext } from '../context/AuthContext';

import FormField from '../components/FormField';

const SignIn = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TSignInSchema>({
    resolver: zodResolver(SignInSchema),
    mode: 'onChange', // 입력값이 변경될 때마다 유효성 검사
  });

  const onSubmit: SubmitHandler<TSignInSchema> = async (data) => {
    try {
      const response = await signIn(data);
      auth?.login(response.data.accessToken, response.data.refreshToken);
      alert('로그인 성공!');
      navigate('/');
    } catch (error) {
      console.error('Sign-in failed:', error);
      alert('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <section className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="relative flex items-center justify-center">
          <button 
            onClick={() => navigate(-1)} 
            className="absolute left-0 flex items-center justify-center w-8 h-8 text-2xl font-bold text-gray-500 hover:text-gray-700"
            aria-label="Go back"
          >
            &lt;
          </button>
          <h2 className="text-2xl font-bold text-center text-gray-900">로그인</h2>
        </div>
        
        <a href={`${import.meta.env.VITE_API_BASE_URL}/v1/auth/google/login`} className="w-full block text-center px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 no-underline">
          Google 계정으로 로그인
        </a>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white">또는</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
          <FormField 
            id="email"
            label="이메일 주소"
            type="email"
            placeholder="이메일 주소"
            register={register('email')}
            error={errors.email}
          />

          <FormField
            id="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호"
            register={register('password')}
            error={errors.password}
          />

          <button 
            type="submit" 
            disabled={!isValid}
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            로그인
          </button>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
