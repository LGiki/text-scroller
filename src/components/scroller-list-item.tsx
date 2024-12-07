import { Check, Pencil, Play, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export default function ScollerListItem(props: {
  title: string;
  children?: React.ReactNode;
  onPlayClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  className?: string;
}) {
  const { t } = useTranslation();

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
            title={t("play")}
            aria-label={t("play")}
          >
            <Play />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={props.onEditClick}
            title={t("edit")}
            aria-label={t("edit")}
          >
            <Pencil />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="destructive"
                className="h-8 w-8"
                title={t("delete")}
                aria-label={t("delete")}
              >
                <Trash2 />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] p-2.5">
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={props.onDeleteClick}
                title={t("confirmDelete")}
                aria-label={t("confirmDelete")}
              >
                <Check />
                {t("confirm")}
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
