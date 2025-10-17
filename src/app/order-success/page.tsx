import { Metadata } from 'next';
import { OrderSuccessPageClient } from '@/components/order/order-success-page-client';

export const metadata: Metadata = {
  title: 'Order Confirmation - H for Her',
  description: 'Your order has been successfully placed',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrderSuccessPage() {
  return <OrderSuccessPageClient />;
}
