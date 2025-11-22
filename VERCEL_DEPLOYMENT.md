# Vercel Deployment Checklist

## Required Environment Variables

Make sure all these environment variables are set in your Vercel project settings:

### Database
- `DATABASE_URL` - Your PostgreSQL database connection string (e.g., Neon database URL)

### Authentication
- `AUTH_SECRET` - A random secret string (generate with: `openssl rand -base64 32`)

### OAuth Providers (Optional but recommended)
- `GOOGLE_CLIENT_ID` - From Google Cloud Console
- `GOOGLE_CLIENT_SECRET` - From Google Cloud Console
- `GITHUB_CLIENT_ID` - From GitHub OAuth App settings
- `GITHUB_CLIENT_SECRET` - From GitHub OAuth App settings

### Email Service
- `RESEND_API_KEY` - From Resend.com

## Steps to Fix Common Issues

### 1. Prisma Client Generation
The `postinstall` script in `package.json` should automatically run `prisma generate` after installation. If you're still getting PrismaClient errors:

1. Check that `DATABASE_URL` is set correctly in Vercel
2. Ensure the database is accessible from Vercel's IP addresses
3. Run database migrations: `npx prisma migrate deploy` (or set up automatic migrations)

### 2. OAuth Configuration Error
The "Configuration" error usually means:
- Missing `AUTH_SECRET` environment variable
- Missing or incorrect OAuth client IDs/secrets
- Incorrect callback URLs in OAuth provider settings

**Fix:**
1. Generate `AUTH_SECRET`: `openssl rand -base64 32`
2. Add it to Vercel environment variables
3. Update OAuth provider callback URLs:
   - Google: `https://your-domain.vercel.app/api/auth/callback/google`
   - GitHub: `https://your-domain.vercel.app/api/auth/callback/github`

### 3. Database Connection Issues
If you see PrismaClient errors or "email does not exist" errors:

1. Verify `DATABASE_URL` is correct
2. Check database connection pooling (for serverless):
   - Neon: Use connection pooling URL (ends with `?sslmode=require&pgbouncer=true`)
   - Other providers: May need `directUrl` for migrations

3. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

### 4. Build Configuration
Ensure your `package.json` has:
```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

### 5. Check Vercel Logs
1. Go to your Vercel project dashboard
2. Click on "Deployments"
3. Click on the latest deployment
4. Check "Function Logs" for specific error messages

## Testing After Deployment

1. Test sign up with email/password
2. Test login with email/password
3. Test OAuth login (if configured)
4. Check that database operations work

## Common Error Messages

- **"Configuration" error**: Missing `AUTH_SECRET` or OAuth credentials
- **"Email does not exist"**: Database connection issue or user not in database
- **PrismaClient errors**: Database connection or Prisma client not generated
- **Unhandled rejection**: Missing error handling (now fixed in code)

