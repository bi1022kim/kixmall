import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // API 경로에 대해서만 인증 체크
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const token = request.headers.get('authorization')?.split(' ')[1]

    // 인증이 필요없는 경로들
    const publicPaths = [
      '/api/auth/login',
      '/api/auth/register',
      '/api/auth/forgot-password'
    ]

    if (publicPaths.includes(request.nextUrl.pathname)) {
      return NextResponse.next()
    }

    if (!token) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      )
    }

    try {
      // JWT 검증은 각 API 라우트에서 처리
      return NextResponse.next()
    } catch (error) {
      return NextResponse.json(
        { error: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

// 미들웨어가 실행될 경로 지정
export const config = {
  matcher: [
    '/api/:path*',  // API 라우트에만 적용
  ]
} 