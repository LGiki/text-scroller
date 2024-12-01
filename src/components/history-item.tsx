import { Check, Pencil, Play, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TextScrollerConfig } from "@/types/text-scroller";

export default function HistoryItem(props: {
  scrollerConfig: TextScrollerConfig;
  children?: React.ReactNode;
  onPlayClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}) {
  return (
    <div className="flex flex-col h-[200px] w-full gap-2 border rounded-lg p-3">
      <div className="flex gap-4 justify-between items-center">
        <span
          title={props.scrollerConfig.scrollerText}
          className="font-bold whitespace-pre-wrap line-clamp-1"
        >
          {props.scrollerConfig.scrollerText}
        </span>
        <div className="flex gap-2 items-center flex-shrink-0">
          <Button size="icon" variant="outline" onClick={props.onPlayClick}>
            <Play />
          </Button>
          <Button size="icon" variant="outline" onClick={props.onEditClick}>
            <Pencil />
          </Button>
          <Popover>
            <PopoverTrigger>
              <Button size="icon" variant="destructive">
                <Trash2 />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
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
      {props.children}
    </div>
  );
}
