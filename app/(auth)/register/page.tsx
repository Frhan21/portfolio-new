import { redirect } from 'next/navigation';

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const RegisterPage = () => {
  redirect('/login');
};

export default RegisterPage;
