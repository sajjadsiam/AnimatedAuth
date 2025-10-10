# OAuth Authentication Setup Guide

This guide will help you set up Google, GitHub, and Apple authentication for your Next.js app.

## 🔧 Prerequisites

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update `NEXT_PUBLIC_URL` in `.env.local` to your app's URL:
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`

---

## 🔴 Google OAuth Setup

### Step 1: Create Google OAuth App

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Configure OAuth consent screen if prompted:
   - User Type: External
   - Add app name, user support email, developer email
   - Add scopes: `email`, `profile`, `openid`
6. Application type: **Web application**
7. Add authorized redirect URIs:
   - Development: `http://localhost:3000/api/auth/google/callback`
   - Production: `https://yourdomain.com/api/auth/google/callback`

### Step 2: Get Credentials

1. Copy **Client ID** and **Client Secret**
2. Add to `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   ```

---

## ⚫ GitHub OAuth Setup

### Step 1: Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in the details:
   - **Application name**: Your App Name
   - **Homepage URL**: `http://localhost:3000` (dev) or `https://yourdomain.com` (prod)
   - **Authorization callback URL**: 
     - Development: `http://localhost:3000/api/auth/github/callback`
     - Production: `https://yourdomain.com/api/auth/github/callback`
4. Click **Register application**

### Step 2: Get Credentials

1. Copy **Client ID**
2. Click **Generate a new client secret** and copy it
3. Add to `.env.local`:
   ```env
   GITHUB_CLIENT_ID=your_client_id_here
   GITHUB_CLIENT_SECRET=your_client_secret_here
   ```

---

## 🍎 Apple Sign In Setup

### Step 1: Create Apple Service ID

1. Go to [Apple Developer Portal](https://developer.apple.com/account/)
2. Navigate to **Certificates, Identifiers & Profiles**
3. Click **Identifiers** → **+** button
4. Select **Services IDs** → Continue
5. Fill in:
   - **Description**: Your App Name
   - **Identifier**: `com.yourcompany.yourapp` (this is your Client ID)
6. Enable **Sign In with Apple**
7. Click **Configure**:
   - Primary App ID: Select your app's App ID
   - Domains and Subdomains: Add your domain (e.g., `yourdomain.com`)
   - Return URLs: Add `https://yourdomain.com/api/auth/apple/callback`

### Step 2: Create Private Key

1. Go to **Keys** → **+** button
2. Enter key name
3. Enable **Sign In with Apple**
4. Click **Configure** → Select your Primary App ID
5. Click **Continue** → **Register**
6. **Download the key** (.p8 file) - you can only download once!
7. Note the **Key ID**

### Step 3: Get Credentials

1. Find your **Team ID**: Apple Developer Account → Membership
2. Add to `.env.local`:
   ```env
   APPLE_CLIENT_ID=com.yourcompany.yourapp
   APPLE_TEAM_ID=your_team_id_here
   APPLE_KEY_ID=your_key_id_here
   APPLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
   [paste your private key content here]
   -----END PRIVATE KEY-----"
   ```

**Note**: Apple Sign In is more complex and requires generating JWT tokens. Consider using a library like `apple-signin-auth` for production.

---

## 🔄 Update Login & Signup Pages

Update the `handleSocialLogin` and `handleSocialSignup` functions to redirect to API routes:

```typescript
const handleSocialLogin = (provider: string) => {
  window.location.href = `/api/auth/${provider.toLowerCase()}`
}
```

Replace in both `app/login/page.tsx` and `app/signup/page.tsx`.

---

## 🗄️ Database Integration

After OAuth callback, you need to:

1. **Check if user exists** in your database
2. **Create new user** if doesn't exist
3. **Create session** (JWT or session cookie)
4. **Redirect to dashboard**

Example user schema:
```typescript
interface User {
  id: string
  email: string
  name: string
  avatar?: string
  provider: 'google' | 'github' | 'apple' | 'email'
  providerId: string
  createdAt: Date
  updatedAt: Date
}
```

---

## 🔒 Security Considerations

1. **Always use HTTPS in production**
2. **Validate state parameter** for CSRF protection
3. **Store secrets securely** (never commit `.env.local`)
4. **Use secure session cookies**:
   ```typescript
   httpOnly: true,
   secure: process.env.NODE_ENV === 'production',
   sameSite: 'lax',
   maxAge: 7 * 24 * 60 * 60 // 7 days
   ```
5. **Implement rate limiting** on auth endpoints
6. **Validate and sanitize** all user input

---

## 🧪 Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/login`

3. Click each social login button to test

4. Check browser console and terminal for any errors

---

## 📚 Additional Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps)
- [Apple Sign In Documentation](https://developer.apple.com/sign-in-with-apple/)
- [NextAuth.js](https://next-auth.js.org/) - Consider using for production

---

## 🚀 Production Deployment

Before deploying:

1. ✅ Update all OAuth redirect URIs to production URL
2. ✅ Set all environment variables in your hosting platform
3. ✅ Enable HTTPS
4. ✅ Set up proper session management
5. ✅ Implement database integration
6. ✅ Add error handling and logging
7. ✅ Test all authentication flows

---

## 💡 Recommended: Use NextAuth.js

For production applications, consider using [NextAuth.js](https://next-auth.js.org/):

```bash
npm install next-auth
```

NextAuth.js provides:
- Built-in OAuth providers (Google, GitHub, Apple, and 50+ more)
- Session management
- Database adapters
- Security best practices
- Easy configuration

This would simplify your OAuth implementation significantly!
