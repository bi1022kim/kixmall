import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: '상품 목록을 가져오는데 실패했습니다.' },
      { status: 500 }
    )
  }
} 