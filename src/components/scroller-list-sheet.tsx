import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollersState } from "@/stores/createScrollersStore";
import React, { useState } from "react";
import ScollerListItem from "@/components/scroller-list-item";
import TextScrollerCanvas from "@/components/text-scroller-canvas";
import { Button } from "@/components/ui/button";
import { Cat, Trash2 } from "lucide-react";
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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function ScrollerListSheet(props: {
  open: boolean;
  onOpenChange: (isVisible: boolean) => void;
  scrollersStore: ScrollersState;
  children?: React.ReactNode;
  onDeleteItemClick?: (itemId: string) => void;
  onDeleteAllClick?: () => void;
}) {
  const [isDeleteAllConfirmDialogVisible, setIsDeleteAllConfirmDialogVisible] =
    useState<boolean>(false);

  return (
    <>
      <Sheet open={props.open} onOpenChange={props.onOpenChange}>
        <SheetContent
          side="left"
          className="flex flex-col gap-2 h-full bg-[#faf9f8]"
        >
          <SheetHeader>
            <SheetTitle>{props.children}</SheetTitle>
            <VisuallyHidden>
              <SheetDescription />
            </VisuallyHidden>
          </SheetHeader>
          <div className="flex flex-col flex-1 gap-4 h-0 overflow-y-auto">
            {props.scrollersStore.scrollers.length !== 0 ? (
              props.scrollersStore.scrollers.map((scroller) => (
                <ScollerListItem
                  title={scroller.scrollerConfig.scrollerText}
                  key={scroller.id}
                  className="flex-shrink-0"
                  onDeleteClick={() => props.onDeleteItemClick?.(scroller.id)}
                >
                  <TextScrollerCanvas
                    scrollerConfig={scroller.scrollerConfig}
                  />
                </ScollerListItem>
              ))
            ) : (
              <div className="flex flex-col text-slate-500 items-center justify-center flex-1 h-0 gap-1">
                <Cat className="h-6 w-6" />
                <span>No Data</span>
              </div>
            )}
          </div>
          {props.scrollersStore.scrollers.length !== 0 &&
            props.onDeleteAllClick && (
              <SheetFooter>
                <Button
                  className="w-full"
                  variant="destructive"
                  onClick={() => setIsDeleteAllConfirmDialogVisible(true)}
                >
                  <Trash2 />
                  Delete All
                </Button>
              </SheetFooter>
            )}
        </SheetContent>
      </Sheet>
      <AlertDialog
        open={isDeleteAllConfirmDialogVisible}
        onOpenChange={setIsDeleteAllConfirmDialogVisible}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all
              data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={props.onDeleteAllClick}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
