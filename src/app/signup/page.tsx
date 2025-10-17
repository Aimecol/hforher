import { Metadata } from 'next';
import { SignUpPageClient } from '@/components/auth/signup-page-client';

export const metadata: Metadata = {
  title: 'Create Account - H for Her',
  description: 'Create your H for Her account and start shopping',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignUpPage() {
  return <SignUpPageClient />;
}
