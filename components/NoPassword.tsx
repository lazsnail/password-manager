import Link from "next/link";

export default function NoPassword() {
  return (
    <Link
      href="/new"
      className="text-center p-3 mt-3 block rounded w-full font-bold bg-violet-600"
    >
      Add a new password to get started
    </Link>
  );
}
