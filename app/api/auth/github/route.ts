import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // GitHub OAuth Configuration
  const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
  const REDIRECT_URI = process.env.NEXT_PUBLIC_URL + '/api/auth/github/callback'
  
  if (!GITHUB_CLIENT_ID) {
    return NextResponse.json({ error: 'GitHub OAuth not configured' }, { status: 500 })
  }

  // Build GitHub OAuth URL
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize')
  githubAuthUrl.searchParams.append('client_id', GITHUB_CLIENT_ID)
  githubAuthUrl.searchParams.append('redirect_uri', REDIRECT_URI)
  githubAuthUrl.searchParams.append('scope', 'read:user user:email')
  githubAuthUrl.searchParams.append('state', crypto.randomUUID()) // CSRF protection

  return NextResponse.redirect(githubAuthUrl.toString())
}
