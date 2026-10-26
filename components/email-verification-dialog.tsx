'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Loader2, MailCheck, RefreshCw, LogIn } from 'lucide-react';

interface EmailVerificationDialogProps {
  open: boolean;
  email: string;
  /** 用户点击「我已验证」后回调（回到登录） */
  onVerified: () => void;
  /** 用户主动关闭（仅右上角 X） */
  onDismiss: () => void;
}

/**
 * 醒目的邮箱验证引导弹窗：注册后 / 未验证登录时弹出。
 * 模态拦截（点遮罩/ESC 不关闭），只有显式按钮能关——杜绝「toast 一闪就没了」的流失。
 */
export function EmailVerificationDialog({ open, email, onVerified, onDismiss }: EmailVerificationDialogProps) {
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [resendError, setResendError] = useState('');

  const handleResend = async () => {
    if (resending || !email) return;
    setResending(true);
    setResendError('');
    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResent(true);
      } else {
        setResendError(data.error || 'Failed to resend. Please try again.');
      }
    } catch {
      setResendError('Network error. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onDismiss(); }}>
      <DialogContent
        className="sm:max-w-md [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="items-center text-center">
          <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/10">
            <MailCheck className="h-9 w-9 text-teal-500" />
          </div>
          <DialogTitle className="text-xl">One more step: verify your email</DialogTitle>
          <DialogDescription className="text-center leading-relaxed">
            We sent a verification link to
            <br />
            <span className="font-semibold text-foreground">{email || 'your inbox'}</span>
            <br />
            Click the link in that email to activate your account — it takes 5 seconds.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {resent ? (
            <div className="rounded-lg border border-teal-500/40 bg-teal-500/5 p-3 text-center text-sm text-teal-600">
              ✓ Verification email resent. Please check your inbox (and spam folder).
            </div>
          ) : (
            <Button className="w-full" onClick={handleResend} disabled={resending || !email}>
              {resending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
              {resending ? 'Resending…' : "Didn't get it? Resend verification email"}
            </Button>
          )}
          {resendError && <p className="text-center text-sm text-red-500">{resendError}</p>}

          <Button variant="outline" className="w-full" onClick={onVerified}>
            <LogIn className="mr-2 h-4 w-4" />
            I&apos;ve verified — take me to login
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Verification keeps your account and purchased credits safe. Your free trial (10,000 characters) unlocks right after verification.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
