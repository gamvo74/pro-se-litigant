import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50">
      <Image
        src="/logo.png"
        alt="Pro Se Litigant Logo"
        width={180}
        height={180}
        priority
      />

      <h1 className="text-4xl font-bold mt-6">
        Pro Se Litigant
      </h1>

      <p className="mt-4 text-gray-600 max-w-xl">
        Your AI Legal Partner for Smarter Drafting, Research, and Case Preparation.
      </p>
    </div>
  );
}
