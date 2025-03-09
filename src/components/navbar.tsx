import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { UserCircle } from "lucide-react";
import UserProfile from "./user-profile";
import { ThemeSwitcher } from "./theme-switcher";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" prefetch className="text-xl font-bold">
          QuizGenius AI
        </Link>
        <div className="hidden md:flex gap-6 items-center">
          <Link
            href="/#features"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Pricing
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <ThemeSwitcher />
          {user ? (
            <>
              <Link href="/dashboard">
                <Button>Dashboard</Button>
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link href="/sign-up">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
