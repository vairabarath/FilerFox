"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { FileIcon, HeartIcon, Trash2Icon } from "lucide-react";
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
          <FileIcon />
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
          <HeartIcon />
          Favorites
        </Button>
      </Link>

      <Link href={"/dashboard/trash"}>
        <Button
          variant={"link"}
          className={clsx(
            "flex gap-2",
            pathname.includes("/dashboard/trash") && "text-blue-600"
          )}
        >
          <Trash2Icon />
          Trash
        </Button>
      </Link>
    </div>
  );
}
