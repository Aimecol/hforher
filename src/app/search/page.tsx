import { Metadata } from 'next';
import { SearchPageClient } from '@/components/search/search-page-client';

export const metadata: Metadata = {
  title: 'Search - Find Your Perfect Style',
  description: 'Search through our collection of fashionable clothing and accessories from China to Rwanda.',
};

interface SearchPageProps {
  searchParams: {
    q?: string;
    category?: string;
    page?: string;
    [key: string]: string | string[] | undefined;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return <SearchPageClient searchParams={searchParams} />;
}
