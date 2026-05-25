'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { AtSign, Lock, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useLogin } from '../../hooks/use-login';
import { useRegister } from '../../hooks/use-register';
import { Button, Input } from '../form-control';
import AuthLayout from '../layout/auth-layout';
import LoginSchema from './schema/login-scheme';
import { RegisterSchema, RegisterSchemaType } from './schema/register-scheme';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const isLogin = type === 'login';
  const isPending = isLogin
    ? loginMutation.isPending
    : registerMutation.isPending;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<any>({
    resolver: zodResolver(isLogin ? LoginSchema : RegisterSchema),
    defaultValues: isLogin
      ? { email: '', password: '' }
      : { name: '', email: '', password: '', confirmPassword: '' },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (data: any) => {
    if (isLogin) {
      loginMutation.mutate(data, {
        onSuccess: () => {
          toast.success('Login successfully');
          router.push('/dashboard');
        },
        onError: (error) => {
          form.setError('root', {
            message: error.message || 'Invalid email or password',
          });
          toast.error(error.message || 'Invalid email or password');
        },
      });
    } else {
      registerMutation.mutate(data, {
        onSuccess: () => {
          toast.success('Registration successfully');
          router.push('/dashboard');
        },
        onError: (error) => {
          form.setError('root', {
            message: error.message || 'Registration failed',
          });
          toast.error(error.message || 'Registration failed');
        },
      });
    }
  };

  return (
    <AuthLayout title={isLogin ? 'Login' : 'Create Account'}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col pt-8"
      >
        {form.formState.errors.root && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-500 text-sm px-4 py-3 rounded-lg mb-6 text-center font-medium">
            {form.formState.errors.root.message as string}
          </div>
        )}

        {!isLogin && (
          <>
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mb-4 -mt-2">
                {form.formState.errors.name.message as string}
              </p>
            )}
          </>
        )}

        <Input
          icon={AtSign}
          type="email"
          placeholder="Email Address"
          {...form.register('email')}
        />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm mb-4 -mt-2">
            {form.formState.errors.email.message as string}
          </p>
        )}

        <Input
          icon={Lock}
          type="password"
          placeholder="Password"
          {...form.register('password')}
        />
        {form.formState.errors.password && (
          <p className="text-red-500 text-sm mb-4 -mt-2">
            {form.formState.errors.password.message as string}
          </p>
        )}

        {!isLogin && (
          <>
            <Input
              icon={Lock}
              type="password"
              placeholder="Confirm Password"
              {...form.register('confirmPassword')}
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-red-500 text-sm mb-4 -mt-2">
                {form.formState.errors.confirmPassword.message as string}
              </p>
            )}
          </>
        )}

        {isLogin && (
          <div className="flex items-center justify-between mb-6 mt-2">
            <Link
              href="#"
              className="text-sm text-[#FE7743] hover:underline transition-colors duration-300"
            >
              Forgot Password?
            </Link>
          </div>
        )}

        <Button
          type="submit"
          className={clsx(
            `bg-primary px-12 py-3 rounded-lg text-white font-medium transition-colors duration-300 cursor-pointer `,
            {
              'bg-gray-500 cursor-not-allowed italic': isPending,
            }
          )}
          disabled={isPending}
        >
          {isPending
            ? isLogin
              ? 'Signing in...'
              : 'Processing...'
            : isLogin
              ? 'Sign in'
              : 'Sign Up'}
        </Button>
      </form>

      <p className="text-center text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-6 transition-colors duration-300">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <Link
          href={isLogin ? '/register' : '/login'}
          className="font-semibold text-[#FE7743] hover:underline"
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </Link>
      </p>
    </AuthLayout>
  );
};

export default AuthForm;
