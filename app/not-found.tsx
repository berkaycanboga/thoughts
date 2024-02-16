import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white text-gray-800 rounded-lg shadow-md">
      <div className="flex items-center justify-center mb-6">
        <h2 className="text-3xl font-semibold text-cyan-600">Not Found</h2>
        <div className="w-px h-10 bg-gray-400 mx-4"></div>
        <Image
          src="/logo.svg"
          alt="Logo"
          width={150}
          height={60}
          priority={true}
          className="inline-block"
        />
      </div>
      <p className="text-center">
        {" "}
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <div className="mt-4 flex justify-center">
        <Link href="/dashboard" className="hover:underline text-cyan-600">
          Return to Dashboard
        </Link>
        <div className="w-px h-6 bg-gray-400 mx-4"></div>
        <Link href="/signin" className="hover:underline text-cyan-600">
          Sign In
        </Link>
        <div className="w-px h-6 bg-gray-400 mx-4"></div>
        <Link href="/signup" className="hover:underline text-cyan-600">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
