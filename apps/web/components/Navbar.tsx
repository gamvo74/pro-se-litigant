"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">
      <Link href="/dashboard" className="flex items-center space-x-3">
        <Image
          src="/logo.png"
          alt="Pro Se Litigant Logo"
          width={60}
          height={60}
          priority
        />
        <span className="text-xl font-semibold">
          Pro Se Litigant
        </span>
      </Link>

      <div className="space-x-4">
        <Link href="/matters">Matters</Link>
        <Link href="/research">Research</Link>
        <Link href="/transcribe">Transcribe</Link>
      </div>
    </nav>
  );
}
