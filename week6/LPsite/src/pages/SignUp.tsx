
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema, type TSignUpSchema } from '../lib/types';
import { signUp } from '../api/auth';
import { type SignUpPayload } from '../lib/types';
import FormField from '../components/FormField';

const EyeOpenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639l4.43-4.43a1.012 1.012 0 0 1 1.414 0l4.43 4.43a1.012 1.012 0 0 1 0 .639l-4.43 4.43a1.012 1.012 0 0 1-1.414 0l-4.43-4.43Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 12.322a1.012 1.012 0 0 1 0-.639l4.43-4.43a1.012 1.012 0 0 1 1.414 0l4.43 4.43a1.012 1.012 0 0 1 0 .639l-4.43 4.43a1.012 1.012 0 0 1-1.414 0l-4.43-4.43Z" />
    </svg>
);

const EyeClosedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243-4.243-4.243" />
    </svg>
);

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onChange',
  });

  const handleNextStep = async (field: keyof TSignUpSchema | (keyof TSignUpSchema)[]) => {
    const isValid = await trigger(field);
    if (isValid) {
      setStep(step + 1);
    }
  };

  const onSubmit: SubmitHandler<TSignUpSchema> = async (data) => {
    try {
      const payload: SignUpPayload = {
        name: data.nickname,
        email: data.email,
        password: data.password,
      };
      await signUp(payload);
      alert('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      navigate('/signin');
    } catch (error) {
      console.error('Sign-up failed:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="relative flex items-center justify-center">
          <button 
            onClick={() => navigate(-1)} 
            className="absolute left-0 flex items-center justify-center w-8 h-8 text-2xl font-bold text-gray-500 hover:text-gray-700"
            aria-label="Go back"
          >
            &lt;
          </button>
          <h2 className="text-2xl font-bold text-center text-gray-900">회원가입</h2>
        </div>

        {step === 1 && (
          <fieldset className="space-y-4">
            <legend className="text-sm text-gray-600">1/3: 이메일 인증</legend>
            <FormField
              id="email"
              label="이메일 주소"
              type="email"
              placeholder="이메일 주소"
              register={register('email')}
              error={errors.email}
            />
            <button type="button" onClick={() => handleNextStep('email')} disabled={!!errors.email} className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded disabled:bg-gray-400">다음</button>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className="space-y-4">
            <legend className="text-sm text-gray-600">2/3: 비밀번호 설정</legend>
            <p className="font-semibold">{getValues('email')}</p>
            <FormField
              id="password"
              label="비밀번호"
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호 (6자 이상)"
              register={register('password')}
              error={errors.password}
            >
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 text-gray-600">
                {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
              </button>
            </FormField>
            <FormField
              id="confirmPassword"
              label="비밀번호 재확인"
              type="password"
              placeholder="비밀번호 재확인"
              register={register('confirmPassword')}
              error={errors.confirmPassword}
            />
            <button type="button" onClick={() => handleNextStep(['password', 'confirmPassword'])} disabled={!!errors.password || !!errors.confirmPassword} className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded disabled:bg-gray-400">다음</button>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className="space-y-4">
            <legend className="text-sm text-gray-600">3/3: 닉네임 및 프로필</legend>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">UI Only</div>
              <div className="w-full">
                <FormField
                  id="nickname"
                  label="닉네임"
                  type="text"
                  placeholder="닉네임"
                  register={register('nickname')}
                  error={errors.nickname}
                />
              </div>
            </div>
            <button type="submit" disabled={!isValid} className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded disabled:bg-gray-400">회원가입 완료</button>
          </fieldset>
        )}
      </form>
    </main>
  );
};

export default SignUp;
