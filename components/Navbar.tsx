import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth, signOut, signIn } from "@/auth"; // ✅ real auth function
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { author } from "@/sanity/schemaTypes/author";

const Navbar = async () => {
  const session = await auth(); // ✅ now works

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={200}
            height={60}
            className="w-[250px] h-[60px]"
           
          
          />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>

                  <LogOut className="size-6 sm:hidden text-red-500 " />
                </button>
              </form>
              <Link href={`/user/${session.user.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Sign in</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
