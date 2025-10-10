import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const code = formData.get('code')
    const error = formData.get('error')
    const user = formData.get('user') // Apple sends user info on first auth

    if (error) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login?error=${error}`)
    }

    if (!code) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login?error=no_code`)
    }

    // Parse user data if available (first time only)
    let userInfo = null
    if (user) {
      userInfo = JSON.parse(user as string)
    }

    // Exchange code for tokens
    // Note: Apple Sign In requires a JWT client secret that needs to be generated
    // using your Apple private key. This is more complex than Google/GitHub.
    
    // Here you would:
    // 1. Generate client_secret JWT using Apple private key
    // 2. Exchange code for tokens
    // 3. Verify id_token
    // 4. Extract user info from id_token
    // 5. Create/update user in database
    // 6. Create session

    console.log('Apple User Info:', userInfo)
    console.log('Apple Auth Code:', code)

    // For now, redirect to home with success
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/?auth=success&provider=apple`)
    
  } catch (error) {
    console.error('Apple OAuth Error:', error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login?error=auth_failed`)
  }
}

// Apple uses POST for callback
export async function GET(request: Request) {
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login`)
}
