import { NextResponse } from 'next/server';
import { mockCategories } from '@/lib/mock-data';

export async function GET() {
  try {
    return NextResponse.json({
      data: mockCategories,
      status: 'success',
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
