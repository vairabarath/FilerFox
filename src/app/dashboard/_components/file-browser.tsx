"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { UploadButton } from "./upload-button";
import { FileCard } from "./file-cards";
import Image from "next/image";
import { FileIcon, HeartIcon, Loader2 } from "lucide-react";
import { Search } from "./serach-bar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Placeholder() {
  return (
    <div className="flex flex-col gap-3 w-full items-center mt-24 ">
      <Image
        alt="An image for an empty page"
        width="200"
        height="200"
        src="/empty.svg"
      />
      <div className="text-2xl font-bold">
        You have no files, upload one now
      </div>
      <UploadButton />
    </div>
  );
}

export function FileBrowser({ title }: { title: string }) {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");

  //form definition

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }
  const files = useQuery(api.files.getFiles, orgId ? { orgId, query } : "skip");
  const isLoading = files === undefined;

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex flex-col gap-3 w-full items-center mt-24">
          <Loader2 className="h-32 w-32 animate-spin" />
          <div>Loading...</div>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="flex justify-between mb-8">
            <h1 className="text-4xl font-bold">{title}</h1>
            <Search query={query} setQuery={setQuery} />
            <UploadButton />
          </div>

          {files?.length === 0 && <Placeholder />}

          <div className="grid grid-cols-5 gap-4">
            {files?.map((file) => {
              return <FileCard key={file._id} file={file} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}
