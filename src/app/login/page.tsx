'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMedVault } from '@/lib/context';
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileText,
  TrendingUp,
  Utensils,
  Sparkles
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useMedVault();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your email and password.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 4) {
      setErrorMessage('Password must be at least 4 characters.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      login(email.trim());
      setIsLoading(false);
      router.push('/');
    }, 800);
  };

  const handleDemoLogin = () => {
    setEmail('ramesh.sharma@example.com');
    setPassword('••••••••');
    setIsLoading(true);
    setTimeout(() => {
      login('ramesh.sharma@example.com');
      setIsLoading(false);
      router.push('/');
    }, 500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login('google.user@example.com');
      setIsLoading(false);
      router.push('/');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#FDF8F9] dark:bg-[#0F1117] flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl rounded-3xl border border-pink-100/90 bg-white shadow-2xl shadow-pink-950/5 dark:border-slate-800 dark:bg-slate-900 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Hero & Clinical Reassurance */}
        <div className="lg:col-span-5 bg-gradient-to-br from-pink-50/80 via-rose-50/40 to-white p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-pink-100/80 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
          <div>
            {/* Brand Logo */}
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-rose-500 to-pink-600 text-white shadow-md shadow-pink-500/25 group-hover:scale-105 transition-transform">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  MedVault
                </span>
                <span className="ml-2 rounded-full bg-pink-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700 dark:bg-pink-950 dark:text-pink-300 border border-pink-200">
                  DPDP Ready
                </span>
              </div>
            </Link>

            <div className="mt-8">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Your Family's Medical History, Protected in One Vault.
              </h1>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Organize paper lab reports, extract blood metrics with smart OCR, track health trends over time, and receive tailored Indian nutritional plans.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="mt-6 space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-100/80 text-rose-700 dark:bg-pink-950 dark:text-pink-300 shrink-0 mt-0.5">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white font-semibold">Zero Paper Hunt:</strong> Upload PDF, PNG, or camera photos of diagnostic reports.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-100/80 text-rose-700 dark:bg-pink-950 dark:text-pink-300 shrink-0 mt-0.5">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white font-semibold">Smart Trend Tracking:</strong> Visual graphs for HbA1c, Lipids, TSH, and Vitals with shaded normal zones.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-100/80 text-rose-700 dark:bg-pink-950 dark:text-pink-300 shrink-0 mt-0.5">
                  <Utensils className="h-4 w-4" />
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white font-semibold">Indian Diet Advisory:</strong> Personalized 7-day meal plans tied directly to your lab biomarkers.
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Guarantee Footer */}
          <div className="mt-8 pt-6 border-t border-pink-100/80 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 dark:text-pink-400">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>India DPDP Act 2023 & HIPAA Compliant</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              End-to-end AES-256 encrypted storage. We never sell your health data to advertisers.
            </p>
          </div>
        </div>

        {/* Right Column: Authentication Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 bg-white dark:bg-slate-900 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-6">
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Sign in to your Health Locker
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Access your family profiles, test results, and personalized diet charts.
              </p>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="mb-4 flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200 animate-in fade-in"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email-input"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1"
                >
                  Email Address or Phone Number
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    id="email-input"
                    type="text"
                    autoComplete="email"
                    required
                    aria-invalid={!!errorMessage}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com or +91 98765 43210"
                    className="w-full rounded-2xl border border-pink-200 bg-[#FDF8F9] pl-10 pr-3.5 py-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-rose-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="password-input"
                    className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    Password
                  </label>
                  <a
                    href="#forgot"
                    onClick={e => {
                      e.preventDefault();
                      alert('Password reset instructions will be sent to your registered phone or email.');
                    }}
                    className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 dark:text-pink-400"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    id="password-input"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    aria-invalid={!!errorMessage}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-pink-200 bg-[#FDF8F9] pl-10 pr-10 py-2.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-rose-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-pink-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    Remember this device for 30 days
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-2xl bg-rose-600 py-3 text-xs font-bold text-white shadow-md shadow-pink-500/25 hover:bg-rose-700 active:scale-95 disabled:opacity-60 transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Vault</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-pink-100 dark:border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-[11px] uppercase">
                <span className="bg-white dark:bg-slate-900 px-3 text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Alternative Auth Buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-2.5 rounded-2xl border border-pink-200/90 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-pink-50/50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors shadow-xs"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-pink-50 py-2.5 text-xs font-semibold text-rose-700 hover:bg-pink-100/80 dark:bg-pink-950/60 dark:text-pink-300 border border-pink-200/80 transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5 text-rose-600" />
                <span>1-Click Demo Login (Ramesh Sharma Family Data)</span>
              </button>
            </div>

            {/* Bottom Link */}
            <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
              New to MedVault?{' '}
              <Link
                href="/"
                className="font-bold text-rose-600 hover:text-rose-700 hover:underline dark:text-pink-400"
              >
                Create your Free Family Locker
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
