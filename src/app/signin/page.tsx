import { Metadata } from 'next';
import { SignInPageClient } from '@/components/auth/signin-page-client';

export const metadata: Metadata = {
  title: 'Sign In - H for Her',
  description: 'Sign in to your H for Her account',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignInPage() {
  return <SignInPageClient />;
}
