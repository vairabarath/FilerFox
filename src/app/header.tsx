import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";

export function Header() {
  return (
    <div className="border-b py-5 bg-gray-50">
      <div className="items-center container mx-auto flex justify-between">
        <div className="text-2xl font-bold  ">
          <Image src="/Logo.png" width="100" height="100" alt="FilerFox Logo" />
        </div>
        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
