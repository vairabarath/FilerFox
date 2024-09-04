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
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import {
  ArchiveRestore,
  Download,
  EllipsisVertical,
  HeartCrackIcon,
  HeartIcon,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { useMutation, useQueries, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Protect } from "@clerk/nextjs";

export function FileCardAction({
  file,
  isFavorited,
}: {
  file: Doc<"files"> & { _id: Id<"files"> } & { url: string | null };
  isFavorited: boolean;
}) {
  const deleteFile = useMutation(api.files.deleteFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);
  const RestoreFile = useMutation(api.files.RestoreFile);
  const personal = useQuery(api.users.getMe);

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
          <Protect
            condition={(check) => {
              return (
                check({
                  role: "org:admin",
                }) || file.userId === personal?._id
              );
            }}
          >
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
