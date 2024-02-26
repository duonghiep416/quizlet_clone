import { NextResponse } from 'next/server'
import { checkLogin } from './utils/checkLogin.utils'

export async function middleware(request) {
  const cookieHeader = request.headers.get('cookie')
  let accessToken
  if (cookieHeader) {
    const cookies = cookieHeader.split(';')
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=')
      if (name.trim() === 'accessToken') {
        accessToken = value
      }
    }
  }
  if (!accessToken) {
    if (request.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/landing', request.url))
  }
  const result = await checkLogin(accessToken)
  if (!result) {
    if (request.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/landing', request.url))
  } else if (request.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/profile', '/auth/login', '/auth/signup']
}
