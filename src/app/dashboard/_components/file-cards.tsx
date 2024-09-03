import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Doc } from "../../../../convex/_generated/dataModel";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import {
  ArchiveRestore,
  Download,
  EllipsisVertical,
  FileText,
  GanttChartIcon,
  HeartCrackIcon,
  HeartIcon,
  ImageIcon,
  Trash,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { useMutation, useQueries, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Protect } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function FileCardAction({
  file,
  isFavorited,
}: {
  file: Doc<"files"> & { url: string | null };
  isFavorited: boolean;
}) {
  const deleteFile = useMutation(api.files.deleteFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);
  const RestoreFile = useMutation(api.files.RestoreFile);

  const { toast } = useToast();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This file is not deleted permanently. It will be added to trash.
              You can restore it later if you want!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteFile({
                  fileId: file._id,
                });
                toast({
                  variant: "success",
                  title: "File Deleted",
                  description: "Your file is added to trash.",
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              toggleFavorite({
                fileId: file._id,
              });
            }}
            className="flex  cursor-pointer gap-2 items-center"
          >
            {isFavorited ? (
              <div className="flex gap-2 items-center">
                <HeartCrackIcon className="w-4 h-4" /> Unfavorite
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <HeartIcon className="w-4 h-4" /> Favorite
              </div>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <Protect role="org:admin">
            <DropdownMenuItem
              onClick={() => {
                if (file.shouldBeDeleted) {
                  RestoreFile({
                    fileId: file._id,
                  });
                } else {
                  setIsConfirmOpen(true);
                }
              }}
              className="flex  cursor-pointer gap-1 items-center"
            >
              {file.shouldBeDeleted ? (
                <div className="flex gap-2 text-green-600 ">
                  <ArchiveRestore className="w-4 h-4" />
                  Restore
                </div>
              ) : (
                <div className="flex gap-2 text-red-600">
                  <Trash className="w-4 h-4" />
                  Delete
                </div>
              )}
            </DropdownMenuItem>
          </Protect>
          <DropdownMenuItem
            onClick={() => {
              if (!file.url) return;
              window.open(file.url, "_blank");
            }}
          >
            <div className="flex gap-2">
              <Download className="h-4 w-4" /> Download
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export function FileCard({
  file,
  favorites,
}: {
  file: Doc<"files"> & { url: string | null };
  favorites: Doc<"favorites">[];
}) {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  });
  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileText />,
    csv: <GanttChartIcon />,
  } as Record<Doc<"files">["type"], ReactNode>;

  const isFavorited = favorites.some(
    (favorite) => favorite.fileId === file._id
  );

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2 items-center text-base font-normal">
          <p>{typeIcons[file.type]}</p>
          {file.name}
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardAction isFavorited={isFavorited} file={file} />
        </div>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent className="flex justify-center items-center h-[200px] mb-6">
        {file.type === "image" && file.url && (
          <Image alt={file.name} width={200} height={200} src={file.url} />
        )}

        {file.type === "pdf" && <FileText className="w-20 h-20" />}
        {file.type === "csv" && <GanttChartIcon className="w-20 h-20" />}
      </CardContent>
      <CardFooter className="flex justify-between ">
        <div className="flex gap-2 items-center text-blue-600 text-sm w-40">
          {" "}
          <Avatar className="w-7 h-7">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {userProfile?.name}
        </div>
        <div className="text-xs">
          Uploaded on {formatRelative(new Date(file._creationTime), new Date())}
        </div>
      </CardFooter>
    </Card>
  );
}
