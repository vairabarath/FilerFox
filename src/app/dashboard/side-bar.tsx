"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { FileIcon, HeartIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SideBar() {
  const pathname = usePathname();

  return (
    <div className="text-2xl w-40 flex justify-start flex-col gap-4">
      <Link href={"/dashboard/files"}>
        <Button
          variant={"link"}
          className={clsx(
            "flex gap-2",
            pathname.includes("/dashboard/files") && "text-blue-600"
          )}
        >
          <HeartIcon />
          Files
        </Button>
      </Link>

      <Link href={"/dashboard/favorites"}>
        <Button
          variant={"link"}
          className={clsx(
            "flex gap-2",
            pathname.includes("/dashboard/favorites") && "text-blue-600"
          )}
        >
          <FileIcon />
          Favorites
        </Button>
      </Link>
    </div>
  );
}
