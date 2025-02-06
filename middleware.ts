import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')
  
  // Only redirect if specifically coming from the Netlify subdomain
  if (hostname === '3mmar1.netlify.app') {
    const url = request.nextUrl.clone()
    url.protocol = 'https'
    url.host = '3mmar.info'
    return NextResponse.redirect(url, 301)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}