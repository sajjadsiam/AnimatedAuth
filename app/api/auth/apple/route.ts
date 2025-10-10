import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Apple OAuth Configuration
  const APPLE_CLIENT_ID = process.env.APPLE_CLIENT_ID
  const REDIRECT_URI = process.env.NEXT_PUBLIC_URL + '/api/auth/apple/callback'
  
  if (!APPLE_CLIENT_ID) {
    return NextResponse.json({ error: 'Apple OAuth not configured' }, { status: 500 })
  }

  // Build Apple OAuth URL
  const appleAuthUrl = new URL('https://appleid.apple.com/auth/authorize')
  appleAuthUrl.searchParams.append('client_id', APPLE_CLIENT_ID)
  appleAuthUrl.searchParams.append('redirect_uri', REDIRECT_URI)
  appleAuthUrl.searchParams.append('response_type', 'code')
  appleAuthUrl.searchParams.append('scope', 'name email')
  appleAuthUrl.searchParams.append('response_mode', 'form_post')
  appleAuthUrl.searchParams.append('state', crypto.randomUUID()) // CSRF protection

  return NextResponse.redirect(appleAuthUrl.toString())
}
