"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const userSession = await getSession();
      setSession(userSession);
      setLoading(false);
      if (userSession) {
        router.push("/dashboard");
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      {loading ? null : (
        <>
          {session ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="max-w-md mx-auto p-8 bg-white text-gray-800 rounded-lg shadow-md">
                <p>
                  You&apos;re already signed in. Redirecting to dashboard...
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100">
              <div className="flex-1 flex items-center justify-center p-8 bg-white">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-6xl font-extrabold text-cyan-800 mb-4">
                    Welcome to{" "}
                    <Image
                      src="/logo.svg"
                      alt="Logo"
                      width={180}
                      height={70}
                      priority={true}
                      className="inline-block"
                    />
                  </h2>
                  <p className="text-gray-700 text-lg">
                    Connect with minds, share unique insights, and explore
                    diverse ideas.
                  </p>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-r from-cyan-700 to-cyan-500">
                <div className="max-w-md text-center text-white">
                  <h3 className="text-2xl sm:text-4xl font-extrabold mb-4">
                    Join the Conversation!
                  </h3>
                  <p className="text-lg mb-6">
                    Engage, express, and stay informed. Sign up to be part of
                    insightful discussions and share your perspective.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Link
                      href="/signup"
                      className="bg-white text-cyan-700 px-6 sm:px-10 py-3 sm:py-4 rounded-full hover:bg-gray-200 hover:text-cyan-700 transition duration-300"
                    >
                      Sign Up
                    </Link>
                  </div>
                  <p className="mt-8 text-sm opacity-70">
                    Already a member?{" "}
                    <Link href="/signin" className="text-white underline">
                      Sign In here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
