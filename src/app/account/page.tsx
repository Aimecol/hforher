import { Metadata } from 'next';
import { AccountPageClient } from '@/components/account/account-page-client';

export const metadata: Metadata = {
  title: 'My Account - H for Her',
  description: 'Manage your account settings and preferences',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccountPage() {
  return <AccountPageClient />;
}
