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
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code,
        redirect_uri: `${process.env.NEXT_PUBLIC_URL}/api/auth/github/callback`,
      }),
    })

    const tokens = await tokenResponse.json()

    if (tokens.error) {
      throw new Error(tokens.error_description || 'Failed to exchange code for token')
    }

    // Get user info
    const userInfoResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        'Accept': 'application/json',
      },
    })

    const userInfo = await userInfoResponse.json()

    // Get user email if not public
    const emailResponse = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        'Accept': 'application/json',
      },
    })

    const emails = await emailResponse.json()
    const primaryEmail = emails.find((email: any) => email.primary)?.email || userInfo.email

    // Here you would:
    // 1. Check if user exists in your database
    // 2. Create new user if doesn't exist
    // 3. Create session/JWT token
    // 4. Set secure cookie

    console.log('GitHub User Info:', { ...userInfo, email: primaryEmail })

    // For now, redirect to home with success
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/?auth=success&provider=github`)
    
  } catch (error) {
    console.error('GitHub OAuth Error:', error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login?error=auth_failed`)
  }
}
