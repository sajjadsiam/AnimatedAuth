import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // Google OAuth Configuration
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
  const REDIRECT_URI = process.env.NEXT_PUBLIC_URL + '/api/auth/google/callback'
  
  if (!GOOGLE_CLIENT_ID) {
    return NextResponse.json({ error: 'Google OAuth not configured' }, { status: 500 })
  }

  // Build Google OAuth URL
  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  googleAuthUrl.searchParams.append('client_id', GOOGLE_CLIENT_ID)
  googleAuthUrl.searchParams.append('redirect_uri', REDIRECT_URI)
  googleAuthUrl.searchParams.append('response_type', 'code')
  googleAuthUrl.searchParams.append('scope', 'openid email profile')
  googleAuthUrl.searchParams.append('access_type', 'offline')
  googleAuthUrl.searchParams.append('prompt', 'consent')

  return NextResponse.redirect(googleAuthUrl.toString())
}
