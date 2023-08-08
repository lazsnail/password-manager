import Link from "next/link";

export default function Error() {
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <h1 className="text-white text-2xl mb-5">
        Uh oh. There&apos;s been an error
      </h1>
      <Link
        href="/login"
        className="flex items-center bg-white text-violet-600 font-bold rounded p-4"
      >
        Return to Login
      </Link>
    </div>
  );
}
