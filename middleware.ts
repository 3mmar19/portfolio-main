import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')
  
  // Check if the request is coming from the Netlify domain
  if (hostname?.includes('netlify.app')) {
    return NextResponse.redirect('https://3mmar.info' + request.nextUrl.pathname, 301)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/:path*',
}