import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { FileText, GanttChartIcon, ImageIcon, UploadIcon } from "lucide-react";
import { ReactNode } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileCardAction } from "./file-actions";
import { Doc } from "convex/_generated/dataModel";

export function FileCard({
  file,
}: {
  file: Doc<"files"> & { isFavorited: boolean } & { url: string | null };
}) {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  });
  const typeIcons = {
    image: <ImageIcon />,
    pdf: <FileText />,
    csv: <GanttChartIcon />,
  } as Record<Doc<"files">["type"], ReactNode>;

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex gap-2 items-center text-base font-normal">
          <p>{typeIcons[file.type]}</p>
          {file.name}
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardAction isFavorited={file.isFavorited} file={file} />
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
          {formatRelative(new Date(file._creationTime), new Date())}
        </div>
      </CardFooter>
    </Card>
  );
}
