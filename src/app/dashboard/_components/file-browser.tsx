"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { UploadButton } from "./upload-button";
import { FileCard } from "./file-cards";
import Image from "next/image";
import { GridIcon, Loader2, RowsIcon } from "lucide-react";
import { Search } from "./search-bar";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { columns } from "./columns";
import { DataTable } from "./file-table";
import { Doc } from "convex/_generated/dataModel";
import { Label } from "@/components/ui/label";

function Placeholder() {
  return (
    <div className="flex flex-col gap-3 w-full items-center mt-24 animate-slideUp px-4">
      <Image
        alt="An image for an empty page"
        width="200"
        height="200"
        src="/empty.svg"
      />
      <div className="text-2xl font-bold text-center">
        You have no files, upload one now
      </div>
      <UploadButton />
    </div>
  );
}

export function FileBrowser({
  title,
  favoritesOnly,
  deletedOnly,
}: {
  title: string;
  favoritesOnly?: boolean;
  deletedOnly?: boolean;
}) {
  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");
  const [type, setType] = useState<Doc<"files">["type"] | "all">("all");
  const [activeTab, setActiveTab] = useState("grid");

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  );

  const files = useQuery(
    api.files.getFiles,
    orgId
      ? {
          orgId,
          type: type === "all" ? undefined : type,
          query,
          favorites: favoritesOnly,
          deletedOnly,
        }
      : "skip"
  );

  const isLoading = files === undefined;

  const modifiedFiles =
    files?.map((file) => ({
      ...file,
      isFavorited: (favorites ?? []).some(
        (favorite) => favorite.fileId === file._id
      ),
    })) ?? [];

  return (
    <div className="px-4 md:px-8">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
          {title}
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Search query={query} setQuery={setQuery} />
          <UploadButton />
        </div>
      </div>

      <Tabs defaultValue="grid" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <TabsList className="mb-2 md:mb-0">
            <TabsTrigger
              value="grid"
              className="flex gap-2 items-center"
              onClick={() => setActiveTab("grid")}
            >
              <GridIcon
                className={` ${activeTab === "grid" ? "text-blue-500" : ""}`}
              />
              Grid
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="flex gap-2 items-center"
              onClick={() => setActiveTab("list")}
            >
              <RowsIcon
                className={` ${activeTab === "list" ? "text-blue-500" : ""}`}
              />{" "}
              List
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2 items-center">
            <Label htmlFor="type-select">Type Filter</Label>
            <Select
              value={type}
              onValueChange={(newType) => {
                setType(newType as any);
              }}
            >
              <SelectTrigger
                id="type-select"
                className="w-[150px] md:w-[180px]"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading && (
          <div className="flex flex-col gap-8 w-full items-center mt-24">
            <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
            <div className="text-2xl">Loading...</div>
          </div>
        )}

        <TabsContent value="grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {modifiedFiles?.map((file) => {
              return <FileCard key={file._id} file={file} />;
            })}
          </div>
        </TabsContent>

        <TabsContent value="list">
          {files?.length !== 0 && (
            <DataTable columns={columns} data={modifiedFiles} />
          )}
        </TabsContent>
      </Tabs>

      {files?.length === 0 && <Placeholder />}
    </div>
  );
}
