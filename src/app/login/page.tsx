"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-[70vh] items-center justify-center px-4 py-16"
    >
      <div className="w-full max-w-md">
        <h1 className="section-title mb-2 text-center">Login</h1>
        <p className="mb-8 text-center text-[14px] text-neutral-600">
          Sign in to your Luxury Crystal account
        </p>

        {submitted ? (
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6 text-center">
            <p className="text-[14px] text-neutral-700">
              This is a demo. In production, you would be signed in here.
            </p>
            <Link href="/" className="mt-4 inline-block">
              <Button variant="outline">Back to home</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <p className="text-center text-[13px] text-neutral-500">
              Don&apos;t have an account?{" "}
              <Link href="/collections/new-in" className="underline hover:text-neutral-700">
                Join the Club
              </Link>
            </p>
          </form>
        )}
      </div>
    </motion.div>
  );
}
