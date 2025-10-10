import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login?error=${error}`)
  }

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login?error=no_code`)
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${process.env.NEXT_PUBLIC_URL}/api/auth/google/callback`,
        grant_type: 'authorization_code',
      }),
    })

    const tokens = await tokenResponse.json()

    if (!tokenResponse.ok) {
      throw new Error(tokens.error || 'Failed to exchange code for tokens')
    }

    // Get user info
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    })

    const userInfo = await userInfoResponse.json()

    // Here you would:
    // 1. Check if user exists in your database
    // 2. Create new user if doesn't exist
    // 3. Create session/JWT token
    // 4. Set secure cookie

    console.log('Google User Info:', userInfo)

    // For now, redirect to home with success
    // In production, set session cookie here
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/?auth=success&provider=google`)
    
  } catch (error) {
    console.error('Google OAuth Error:', error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login?error=auth_failed`)
  }
}
