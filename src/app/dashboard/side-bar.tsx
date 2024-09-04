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
            "flex gap-2 text-black",
            pathname.includes("/dashboard/files") && "text-primary"
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
            "flex gap-2  text-black",
            pathname.includes("/dashboard/favorites") && "text-primary"
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
            "flex gap-2  text-black",
            pathname.includes("/dashboard/trash") && "text-primary"
          )}
        >
          <Trash2Icon />
          Trash
        </Button>
      </Link>
    </div>
  );
}
