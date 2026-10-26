'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/language-context';
import { signIn } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

enum VerificationStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export default function VerifyEmail() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<VerificationStatus>(VerificationStatus.LOADING);
  const [message, setMessage] = useState<string>(t('verifying'));
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const verificationAttempted = useRef(false);
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    async function verifyToken() {
      // 避免重复验证
      if (verificationAttempted.current) {
        return;
      }
      
      if (!token) {
        setStatus(VerificationStatus.ERROR);
        setMessage(t('invalidVerificationLink'));
        return;
      }
      
      try {
        // 标记已尝试验证
        verificationAttempted.current = true;
        console.log('验证邮箱 token:', token.substring(0, 10) + '...');
        
        // 确保令牌编码正确
        const encodedToken = encodeURIComponent(token);
        const response = await fetch(`/api/auth/verify-email?token=${encodedToken}`);
        const data = await response.json();
        
        console.log('验证响应:', data);

        if (response.ok && data.success) {
          setStatus(VerificationStatus.SUCCESS);
          setMessage(t('verificationSuccessful'));
          if (data.email) setVerifiedEmail(data.email);
          
          // 存储验证状态到 sessionStorage 避免刷新后重复验证
          sessionStorage.setItem('email_verification_status', 'success');
          sessionStorage.setItem('email_verification_message', t('verificationSuccessful'));
        } else {
          setStatus(VerificationStatus.ERROR);
          setMessage(data.error || t('verificationFailed'));
          
          // 存储验证状态到 sessionStorage 避免刷新后重复验证
          sessionStorage.setItem('email_verification_status', 'error');
          sessionStorage.setItem('email_verification_message', data.error || t('verificationFailed'));
        }
      } catch (error) {
        console.error('验证过程发生错误:', error);
        setStatus(VerificationStatus.ERROR);
        setMessage(t('verificationError'));
        
        // 存储验证状态到 sessionStorage 避免刷新后重复验证
        sessionStorage.setItem('email_verification_status', 'error');
        sessionStorage.setItem('email_verification_message', t('verificationError'));
      }
    }

    // 检查是否有存储的验证状态
    if (typeof window !== 'undefined') {
      const storedStatus = sessionStorage.getItem('email_verification_status');
      const storedMessage = sessionStorage.getItem('email_verification_message');
      
      if (storedStatus === 'success') {
        setStatus(VerificationStatus.SUCCESS);
        setMessage(storedMessage || t('verificationSuccessful'));
        verificationAttempted.current = true;
      } else if (storedStatus === 'error') {
        setStatus(VerificationStatus.ERROR);
        setMessage(storedMessage || t('verificationFailed'));
        verificationAttempted.current = true;
      } else {
        verifyToken();
      }
    } else {
      verifyToken();
    }
  }, [token, t]);

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t('emailVerification')}</CardTitle>
          <CardDescription>
            {status === VerificationStatus.LOADING && t('verifyingYourEmail')}
            {status === VerificationStatus.SUCCESS && t('verificationSuccess')}
            {status === VerificationStatus.ERROR && t('verificationFailed')}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center p-6">
          {status === VerificationStatus.LOADING && (
            <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
          )}
          {status === VerificationStatus.SUCCESS && (
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
          )}
          {status === VerificationStatus.ERROR && (
            <XCircle className="h-16 w-16 text-red-500 mb-4" />
          )}
          <p className="text-center text-muted-foreground mb-4">{message}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          {status === VerificationStatus.SUCCESS && (
            <div className="w-full space-y-4">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (loginLoading) return;
                  setLoginLoading(true);
                  const result = await signIn('credentials', {
                    redirect: false,
                    email: verifiedEmail,
                    password: loginPassword,
                  });
                  setLoginLoading(false);
                  if (result?.error) {
                    alert(result.error === 'EMAIL_NOT_VERIFIED' ? 'Please verify first (click the email link again).' : result.error);
                    return;
                  }
                  router.push('/app?welcome=1');
                }}
                className="w-full space-y-3 text-left"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="ve-email" className="text-sm">Email</Label>
                  <Input id="ve-email" type="email" value={verifiedEmail} readOnly className="bg-muted/50" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="ve-password" className="text-sm">Password</Label>
                  <Input
                    id="ve-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Your password"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loginLoading || !loginPassword}
                  className="w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 hover:from-cyan-600 hover:via-teal-600 hover:to-cyan-600 transition-all duration-300"
                >
                  {loginLoading ? 'Signing in…' : 'Log in & Start Creating'}
                </Button>
              </form>
              <Button
                variant="ghost"
                onClick={() => router.push('/')}
                className="w-full text-muted-foreground"
              >
                {t('goToHomepage')}
              </Button>
            </div>
          )}
          {status === VerificationStatus.ERROR && (
            <div className="flex flex-col gap-2 w-full">
              <Button 
                asChild
                className="bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500 hover:from-cyan-600 hover:via-teal-600 hover:to-cyan-600 transition-all duration-300"
              >
                <Link href="/">
                  {t('goToHomepage')}
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline"
                className="border-primary/20 hover:bg-primary/5"
              >
                <Link href="/auth/resend-verification">
                  {t('resendVerificationEmail')}
                </Link>
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
} 