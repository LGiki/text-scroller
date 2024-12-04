import { Check, Pencil, Play, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function ScollerListItem(props: {
  title: string;
  children?: React.ReactNode;
  onPlayClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col h-[200px] w-full gap-2 border rounded-xl shadow-sm p-3 bg-white",
        props.className
      )}
    >
      <div className="flex gap-4 justify-between items-center">
        <span
          title={props.title}
          className="font-bold whitespace-pre-line line-clamp-1 break-all"
        >
          {props.title}
        </span>
        <div className="flex gap-2 items-center flex-shrink-0">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={props.onPlayClick}
          >
            <Play />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={props.onEditClick}
          >
            <Pencil />
          </Button>
          <Popover>
            <PopoverTrigger>
              <Button size="icon" variant="destructive" className="h-8 w-8">
                <Trash2 />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] p-2.5">
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={props.onDeleteClick}
              >
                <Check />
                Confirm
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="h-0 flex-1 rounded-lg overflow-hidden">
        {props.children}
      </div>
    </div>
  );
}
