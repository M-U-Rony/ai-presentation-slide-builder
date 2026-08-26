"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ArrowLeft, Loader2, Mail, Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isPending && session?.user) {
      router.push("/dashboard");
    }
  }, [session, isPending, router]);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please provide both email and password.");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const res = await authClient.signUp.email({
        email: email.trim(),
        password: password,
        name: name.trim() || email.split("@")[0],
        callbackURL: "/dashboard",
      });

      if (res.error) {
        setErrorMsg(res.error.message || "Failed to create account. Please try again.");
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Sign up failed:", err);
      setErrorMsg(err.message || "Failed to create account. Please try again.");
      setLoading(false);
    }
  }

  async function handleGithubSignIn() {
    try {
      setGithubLoading(true);
      setErrorMsg("");
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
      });
    } catch (err: any) {
      console.error("GitHub sign in failed:", err);
      setErrorMsg("Failed to connect to GitHub authentication. Please try again.");
      setGithubLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#fcfaf5] text-[#1a3300] font-sans selection:bg-[#ffe95c] selection:text-[#1a3300] flex flex-col justify-between relative overflow-hidden">
      
      {/* FLOATING TOP HEADER NAVIGATION */}
      <div className="sticky top-4 z-50 max-w-5xl mx-auto w-full px-4 sm:px-6">
        <header className="bg-[#fcfaf5] border border-[#b6b6b6] rounded-[16px] px-4 py-2.5 nav-glow flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-[6px] bg-[#ffe95c] border border-[#1a3300]/20 text-[#1a3300] flex items-center justify-center font-display font-extrabold text-lg shadow-xs group-hover:scale-105 transition-transform">
              lo
            </div>
            <span className="font-bold text-lg tracking-tight text-[#1a3300]">SlideAI</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/signin"
              className="min-h-[36px] px-3.5 py-1.5 rounded-[6px] border border-[#b6b6b6] text-[#1a3300] hover:bg-[#ffe95c] font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              href="/"
              className="min-h-[36px] px-3.5 py-1.5 rounded-[6px] border border-[#b6b6b6] text-[#1a3300] hover:bg-[#ffe95c] font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Home</span>
            </Link>
          </div>
        </header>
      </div>

      {/* MAIN SIGN UP CONTAINER */}
      <main className="flex-1 flex items-center justify-center p-6 z-10 my-4">
        <div className="w-full max-w-md bg-white border border-[#1a3300] p-6 sm:p-8 rounded-[12px] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] space-y-6 relative overflow-hidden">
          
          {/* Header */}
          <div className="space-y-1.5 text-center">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1a3300] tracking-[0.04em]">
              Create an Account
            </h1>
            <p className="text-xs sm:text-sm text-[#1a3300]/70 font-normal leading-relaxed">
              Start creating modern AI presentation decks in seconds.
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="p-3 rounded-[6px] bg-[#cb5521]/10 border border-[#cb5521]/30 text-[#cb5521] text-xs font-semibold text-center animate-in fade-in duration-150">
              {errorMsg}
            </div>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            
            {/* Username / Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono-tag font-bold uppercase tracking-wider text-[#1a3300]/80">
                Username / Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#1a3300]/50 group-focus-within:text-[#1a3300]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#fcfaf5] text-[#1a3300] placeholder-[#1a3300]/40 rounded-[6px] border border-[#b6b6b6] focus:border-[#1a3300] focus:ring-1 focus:ring-[#1a3300] text-sm outline-none transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono-tag font-bold uppercase tracking-wider text-[#1a3300]/80">
                Email Address <span className="text-[#cb5521]">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#1a3300]/50 group-focus-within:text-[#1a3300]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#fcfaf5] text-[#1a3300] placeholder-[#1a3300]/40 rounded-[6px] border border-[#b6b6b6] focus:border-[#1a3300] focus:ring-1 focus:ring-[#1a3300] text-sm outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono-tag font-bold uppercase tracking-wider text-[#1a3300]/80">
                Password <span className="text-[#cb5521]">*</span>
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#1a3300]/50 group-focus-within:text-[#1a3300]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-9 pr-10 py-2.5 bg-[#fcfaf5] text-[#1a3300] placeholder-[#1a3300]/40 rounded-[6px] border border-[#b6b6b6] focus:border-[#1a3300] focus:ring-1 focus:ring-[#1a3300] text-sm outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#1a3300]/50 hover:text-[#1a3300] transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || githubLoading}
              className="w-full min-h-[46px] bg-[#1a3300] hover:bg-[#1a3300]/90 active:scale-[0.99] text-[#fcfaf5] font-semibold text-sm rounded-[6px] transition-all shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#fcfaf5]" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#b6b6b6] w-full" />
            <span className="bg-white px-3 text-[11px] font-mono-tag font-bold uppercase tracking-wider text-[#1a3300]/60 shrink-0">
              or continue with
            </span>
            <div className="border-t border-[#b6b6b6] w-full" />
          </div>

          {/* Social OAuth Button */}
          <button
            type="button"
            onClick={handleGithubSignIn}
            disabled={loading || githubLoading}
            className="w-full min-h-[44px] bg-[#fcfaf5] hover:bg-[#ffe95c] border border-[#1a3300] text-[#1a3300] font-semibold text-xs sm:text-sm rounded-[6px] transition-all shadow-xs flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
          >
            {githubLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#1a3300]" />
                <span>Connecting to GitHub...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>Sign up with GitHub</span>
              </>
            )}
          </button>

          {/* Switch to Sign In */}
          <div className="text-center pt-2 border-t border-[#b6b6b6]/40 text-xs text-[#1a3300]/70">
            <span>Already have an account? </span>
            <Link
              href="/signin"
              className="font-bold text-[#1a3300] hover:underline decoration-[#ffe95c] decoration-2 transition-all ml-1"
            >
              Sign in here
            </Link>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#1a3300]/50 font-mono-tag">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1a3300]" />
            <span>Secure authentication via Better-Auth</span>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-6 text-center text-xs text-[#1a3300]/60 font-mono-tag">
        SlideAI Presentation Studio — SayBriefly Design System
      </footer>
    </div>
  );
}
