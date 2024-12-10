import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export async function POST(req: Request) {
  try {
    const { email, password, name }: RegisterData = await req.json()
    
    // 이메일 중복 체크
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: '이미 존재하는 이메일입니다.' },
        { status: 400 }
      )
    }

    const hashedPassword = await hash(password, 10)
    
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    })

    return NextResponse.json(
      { message: '회원가입이 완료되었습니다.', user: { id: user.id, email: user.email, name: user.name } },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: '회원가입 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
} 